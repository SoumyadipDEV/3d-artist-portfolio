import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export interface VideoInteractionStats {
  playCount: number;
  likeCount: number;
}

export interface SubmitVideoLikeInput {
  projectId: string;
  visitorName: string;
  visitorEmail: string;
}

export interface SubmitVideoLikeResult {
  likeCount: number;
  created: boolean;
}

interface StatsRow {
  play_count: number | null;
  like_count: number | null;
}

interface LikeResultRow {
  like_count: number | null;
  created: boolean | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getFirstRow = <T>(value: unknown): T | null => {
  if (Array.isArray(value)) {
    return (value[0] as T | undefined) ?? null;
  }

  if (value && typeof value === "object") {
    return value as T;
  }

  return null;
};

const toStats = (row: StatsRow | null | undefined): VideoInteractionStats => ({
  playCount: Number(row?.play_count ?? 0),
  likeCount: Number(row?.like_count ?? 0),
});

export const getVideoInteractionStats = async (projectId: string): Promise<VideoInteractionStats> => {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId || !isSupabaseConfigured || !supabase) {
    return { playCount: 0, likeCount: 0 };
  }

  const { data, error } = await supabase
    .from("video_stats")
    .select("play_count, like_count")
    .eq("project_id", normalizedProjectId)
    .maybeSingle();

  if (error) throw error;

  return toStats(data as StatsRow | null);
};

export const incrementVideoPlayCount = async (projectId: string): Promise<VideoInteractionStats> => {
  const normalizedProjectId = projectId.trim();

  if (!normalizedProjectId || !isSupabaseConfigured || !supabase) {
    return { playCount: 0, likeCount: 0 };
  }

  const { data, error } = await supabase.rpc("increment_video_play_count", {
    p_project_id: normalizedProjectId,
  });

  if (error) throw error;

  return toStats(getFirstRow<StatsRow>(data));
};

export const submitVideoLike = async ({
  projectId,
  visitorName,
  visitorEmail,
}: SubmitVideoLikeInput): Promise<SubmitVideoLikeResult> => {
  const normalizedProjectId = projectId.trim();
  const normalizedName = visitorName.trim();
  const normalizedEmail = visitorEmail.trim().toLowerCase();

  if (!normalizedProjectId) {
    throw new Error("Project id is required.");
  }

  if (normalizedName.length < 2) {
    throw new Error("Please enter your full name.");
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.rpc("submit_video_like", {
    p_project_id: normalizedProjectId,
    p_visitor_name: normalizedName,
    p_visitor_email: normalizedEmail,
  });

  if (error) throw error;

  const row = getFirstRow<LikeResultRow>(data);

  return {
    likeCount: Number(row?.like_count ?? 0),
    created: Boolean(row?.created),
  };
};
