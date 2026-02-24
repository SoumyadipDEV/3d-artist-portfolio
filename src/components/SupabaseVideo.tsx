import { useEffect, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SupabaseVideoProps {
  videoUrl: string;
  posterUrl?: string;
  onFirstPlay?: () => void;
}

const SupabaseVideo = ({ videoUrl, posterUrl, onFirstPlay }: SupabaseVideoProps) => {
  const hasTrackedFirstPlayRef = useRef(false);

  useEffect(() => {
    hasTrackedFirstPlayRef.current = false;
  }, [videoUrl]);

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

  const handlePlay = () => {
    if (hasTrackedFirstPlayRef.current) return;
    hasTrackedFirstPlayRef.current = true;
    onFirstPlay?.();
  };

  return (
    <div className="w-full overflow-hidden rounded-lg bg-black">
      <AspectRatio ratio={16 / 9}>
        <video
          src={videoUrl}
          poster={posterUrl}
          controls
          autoPlay
          loop
          playsInline
          preload="metadata"
          onPlay={handlePlay}
          className="h-full w-full object-cover"
        >
          Your browser does not support HTML5 video playback.
        </video>
      </AspectRatio>
    </div>
  );
};

export default SupabaseVideo;
