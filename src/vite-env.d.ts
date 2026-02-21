/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_DRIVE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
