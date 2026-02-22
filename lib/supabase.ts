import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("SUPABASE_URL or SUPABASE_ANON_KEY missing — CRM sync disabled");
    return null;
  }

  _supabase = createClient(url, key);
  return _supabase;
}
