import { getSupabase } from "./supabase";

export type LeadSource = "scraped" | "diagnostic_ia" | "roi_calculator" | "contact_form";

const SOURCE_PRIORITY: Record<string, number> = {
  scraped: 0,
  contact_form: 1,
  roi_calculator: 2,
  diagnostic_ia: 3,
};

interface UpsertWebsiteLeadParams {
  source: LeadSource;
  email: string;
  contact_name?: string;
  company_name?: string;
  sector?: string;
  size?: string;
  qualification_data: Record<string, unknown>;
}

export async function upsertWebsiteLead({
  source,
  email,
  contact_name,
  company_name,
  sector,
  size,
  qualification_data,
}: UpsertWebsiteLeadParams) {
  try {
    const supabase = getSupabase();
    if (!supabase) return; // Supabase not configured — skip silently

    // Check if lead already exists
    const { data: existing } = await supabase
      .from("leads")
      .select("id, source, qualification_data")
      .eq("email", email)
      .single();

    if (existing) {
      // Merge qualification_data + upgrade source if warmer
      const mergedData = {
        ...(existing.qualification_data as Record<string, unknown> | null),
        ...qualification_data,
      };
      const currentPriority = SOURCE_PRIORITY[existing.source as string] ?? 0;
      const newPriority = SOURCE_PRIORITY[source] ?? 0;
      const newSource = newPriority > currentPriority ? source : existing.source;

      const updates: Record<string, unknown> = {
        source: newSource,
        qualification_data: mergedData,
      };

      if (contact_name) updates.contact_name = contact_name;
      if (company_name) updates.company_name = company_name;
      if (sector) updates.sector = sector;
      if (size) updates.size = size;

      await supabase.from("leads").update(updates).eq("id", existing.id);
    } else {
      // Insert new lead
      const score = source === "diagnostic_ia" ? 80 : source === "roi_calculator" ? 65 : 40;

      await supabase.from("leads").insert({
        company_name: company_name || "",
        contact_name: contact_name || "",
        email,
        website: "",
        sector: sector || "",
        size: size || "",
        status: "À contacter",
        source,
        qualification_data,
        score,
        sequence_step: 0,
        follow_up_count: 0,
        email_open_count: 0,
      });
    }
  } catch (err) {
    // Log but don't throw — CRM insert should never break the user-facing flow
    console.error("CRM upsert error:", err);
  }
}
