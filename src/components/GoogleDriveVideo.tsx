import { AspectRatio } from "@/components/ui/aspect-ratio";

interface GoogleDriveVideoProps {
  fileId: string;
  title?: string;
  className?: string;
}

const GoogleDriveVideo = ({ fileId, title = "Video", className = "" }: GoogleDriveVideoProps) => {
  const src = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className={`w-full overflow-hidden rounded-lg ${className}`}>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={src}
          title={title}
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
