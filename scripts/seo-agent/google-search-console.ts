import { google } from "googleapis";

const SITE_URL = "https://synapz.be";

export interface SearchRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface PageRow {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

function getAuth() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) return null;

  try {
    const key = JSON.parse(keyJson);
    return new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });
  } catch {
    console.warn("⚠️  GOOGLE_SERVICE_ACCOUNT_KEY invalide (JSON parse error)");
    return null;
  }
}

async function queryGSC(
  auth: InstanceType<typeof google.auth.GoogleAuth>,
  startDate: string,
  endDate: string,
  dimensions: string[],
  rowLimit = 50
): Promise<Record<string, unknown>[]> {
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const res = await searchconsole.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: {
      startDate,
      endDate,
      dimensions,
      rowLimit,
    },
  });

  return (res.data.rows as Record<string, unknown>[]) || [];
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDateRange(daysAgo: number): { start: string; end: string } {
  const end = new Date();
  end.setDate(end.getDate() - 3); // GSC data has 3-day delay
  const start = new Date(end);
  start.setDate(start.getDate() - daysAgo);
  return { start: formatDate(start), end: formatDate(end) };
}

export async function getTopQueries(days = 7, limit = 25): Promise<SearchRow[]> {
  const auth = getAuth();
  if (!auth) return [];

  const { start, end } = getDateRange(days);
  const rows = await queryGSC(auth, start, end, ["query"], limit);

  return rows.map((row) => ({
    query: ((row.keys as string[]) || [""])[0],
    clicks: (row.clicks as number) || 0,
    impressions: (row.impressions as number) || 0,
    ctr: (row.ctr as number) || 0,
    position: (row.position as number) || 0,
  }));
}

export async function getTopPages(days = 7, limit = 15): Promise<PageRow[]> {
  const auth = getAuth();
  if (!auth) return [];

  const { start, end } = getDateRange(days);
  const rows = await queryGSC(auth, start, end, ["page"], limit);

  return rows.map((row) => ({
    page: ((row.keys as string[]) || [""])[0].replace(SITE_URL, ""),
    clicks: (row.clicks as number) || 0,
    impressions: (row.impressions as number) || 0,
    ctr: (row.ctr as number) || 0,
    position: (row.position as number) || 0,
  }));
}

export async function getTargetKeywordRankings(
  targetKeywords: string[],
  days = 7
): Promise<(SearchRow & { tracked: true })[]> {
  const allQueries = await getTopQueries(days, 500);

  return targetKeywords.map((kw) => {
    const match = allQueries.find(
      (q) => q.query.toLowerCase().includes(kw.toLowerCase()) || kw.toLowerCase().includes(q.query.toLowerCase())
    );
    return {
      query: kw,
      clicks: match?.clicks || 0,
      impressions: match?.impressions || 0,
      ctr: match?.ctr || 0,
      position: match?.position || 0,
      tracked: true as const,
    };
  });
}

export async function getWeekOverWeekComparison(): Promise<{
  thisWeek: { clicks: number; impressions: number };
  lastWeek: { clicks: number; impressions: number };
}> {
  const auth = getAuth();
  if (!auth) {
    return {
      thisWeek: { clicks: 0, impressions: 0 },
      lastWeek: { clicks: 0, impressions: 0 },
    };
  }

  const thisRange = getDateRange(7);
  const lastRange = getDateRange(14);

  const searchconsole = google.searchconsole({ version: "v1", auth });

  const [thisWeekRes, lastWeekRes] = await Promise.all([
    searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: { startDate: thisRange.start, endDate: thisRange.end, dimensions: ["query"], rowLimit: 1 },
    }),
    searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: { startDate: lastRange.start, endDate: lastRange.end, dimensions: ["query"], rowLimit: 1 },
    }),
  ]);

  const sumRows = (rows: Record<string, unknown>[] | undefined): { clicks: number; impressions: number } => {
    if (!rows) return { clicks: 0, impressions: 0 };
    return rows.reduce<{ clicks: number; impressions: number }>(
      (acc, r) => ({
        clicks: acc.clicks + ((r.clicks as number) || 0),
        impressions: acc.impressions + ((r.impressions as number) || 0),
      }),
      { clicks: 0, impressions: 0 }
    );
  };

  return {
    thisWeek: sumRows(thisWeekRes.data.rows as Record<string, unknown>[] | undefined),
    lastWeek: sumRows(lastWeekRes.data.rows as Record<string, unknown>[] | undefined),
  };
}

export function isGSCConfigured(): boolean {
  return !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
}
