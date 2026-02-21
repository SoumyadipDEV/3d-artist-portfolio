const DEFAULT_GOOGLE_DRIVE_BASE_URL = "https://drive.google.com/file/d/";

const getBaseUrl = () => {
  const configuredBaseUrl = import.meta.env.VITE_GOOGLE_DRIVE_BASE_URL?.trim();
  const baseUrl = configuredBaseUrl || DEFAULT_GOOGLE_DRIVE_BASE_URL;

  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
};

export const getGoogleDrivePreviewUrl = (fileId: string) => {
  return `${getBaseUrl()}${fileId}/preview`;
};
