const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

export const getSupabasePublicBaseUrl = () => {
  const explicitBaseUrl = import.meta.env.VITE_SUPABASE_STORAGE_BASE_URL?.trim();
  if (explicitBaseUrl) return trimTrailingSlash(explicitBaseUrl);

  const projectUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const bucketName = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET?.trim();

  if (!projectUrl || !bucketName) return "";

  return `${trimTrailingSlash(projectUrl)}/storage/v1/object/public/${bucketName}`;
};

export const getSupabasePublicUrl = (assetPath: string) => {
  const baseUrl = getSupabasePublicBaseUrl();
  const normalizedPath = assetPath.replace(/^\/+/, "");

  if (!baseUrl || !normalizedPath) return "";

  return `${baseUrl}/${normalizedPath}`;
};
