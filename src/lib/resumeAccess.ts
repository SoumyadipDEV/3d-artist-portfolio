import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export interface SubmitResumeAccessInput {
  visitorName: string;
  visitorEmail: string;
}

export interface SubmitResumeAccessResult {
  created: boolean;
}

interface ResumeAccessResultRow {
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

export const submitResumeAccess = async ({
  visitorName,
  visitorEmail,
}: SubmitResumeAccessInput): Promise<SubmitResumeAccessResult> => {
  const normalizedName = visitorName.trim();
  const normalizedEmail = visitorEmail.trim().toLowerCase();

  if (normalizedName.length < 2) {
    throw new Error("Please enter your full name.");
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.rpc("submit_resume_access", {
    p_visitor_name: normalizedName,
    p_visitor_email: normalizedEmail,
  });

  if (error) throw error;

  const row = getFirstRow<ResumeAccessResultRow>(data);

  return { created: Boolean(row?.created) };
};
