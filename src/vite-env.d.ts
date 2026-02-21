/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_SUPABASE_STORAGE_BUCKET: string;
  readonly VITE_SUPABASE_STORAGE_BASE_URL: string;
  readonly VITE_HERO_VIDEO_URL: string;
  readonly VITE_PROJECT_VIDEO_1_URL: string;
  readonly VITE_PROJECT_POSTER_1_URL: string;
  readonly VITE_PROJECT_VIDEO_2_URL: string;
  readonly VITE_PROJECT_POSTER_2_URL: string;
  readonly VITE_PROJECT_VIDEO_3_URL: string;
  readonly VITE_PROJECT_POSTER_3_URL: string;
  readonly VITE_PROJECT_VIDEO_4_URL: string;
  readonly VITE_PROJECT_POSTER_4_URL: string;
  readonly VITE_PROJECT_VIDEO_5_URL: string;
  readonly VITE_PROJECT_POSTER_5_URL: string;
  readonly VITE_PROJECT_VIDEO_6_URL: string;
  readonly VITE_PROJECT_POSTER_6_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
