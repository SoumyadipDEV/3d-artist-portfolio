import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

interface SiteVisitCountRow {
  total_visits: number | null;
}

const getFirstRow = <T>(value: unknown): T | null => {
  if (Array.isArray(value)) {
    return (value[0] as T | undefined) ?? null;
  }

  if (value && typeof value === "object") {
    return value as T;
  }

  return null;
};

export const incrementSiteVisitCount = async (): Promise<number> => {
  if (!isSupabaseConfigured || !supabase) {
    return 0;
  }

  const { data, error } = await supabase.rpc("increment_site_visit_count");

  if (error) throw error;

  const row = getFirstRow<SiteVisitCountRow>(data);

  return Number(row?.total_visits ?? 0);
};
