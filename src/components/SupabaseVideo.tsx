import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SupabaseVideoProps {
  videoUrl: string;
  posterUrl?: string;
}

const SupabaseVideo = ({ videoUrl, posterUrl }: SupabaseVideoProps) => {
  if (!videoUrl) {
    return (
      <div className="w-full overflow-hidden rounded-lg bg-black">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Video URL not configured
          </div>
        </AspectRatio>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-lg bg-black">
      <AspectRatio ratio={16 / 9}>
        <video
          src={videoUrl}
          poster={posterUrl}
          controls
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Your browser does not support HTML5 video playback.
        </video>
      </AspectRatio>
    </div>
  );
};

export default SupabaseVideo;
