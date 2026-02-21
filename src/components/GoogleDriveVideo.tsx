import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getGoogleDrivePreviewUrl } from "@/lib/googleDrive";

interface GoogleDriveVideoProps {
  fileId: string;
}

const GoogleDriveVideo = ({ fileId }: GoogleDriveVideoProps) => {
  const src = getGoogleDrivePreviewUrl(fileId);

  return (
    <div className="w-full overflow-hidden rounded-lg">
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={src}
          title="Project video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="h-full w-full border-0"
          loading="lazy"
        />
      </AspectRatio>
    </div>
  );
};

export default GoogleDriveVideo;
