import { motion } from "framer-motion";
import { Eye, ThumbsUp } from "lucide-react";
import SupabaseVideo from "@/components/SupabaseVideo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Project, type ProjectDetailBlock } from "@/data/projects";

interface ProjectDetailPageProps {
  project: Project;
  playCount: number;
  likeCount: number;
  statsLoading: boolean;
  statsError: boolean;
  likesEnabled: boolean;
  likeButtonDisabled: boolean;
  likeIconPulseSeed: number;
  onLikeButtonClick: () => void;
  onVideoFirstPlay: () => void;
}

const renderDetailBlock = (block: ProjectDetailBlock) => {
  if (block.type === "text") {
    return (
      <article className="space-y-3 rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5">
        <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
        <div className="space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {block.body.map((paragraph, index) => (
            <p key={`${block.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>
      </article>
    );
  }

  if (block.type === "image") {
    return (
      <article className="space-y-3 rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5">
        {block.title ? <h3 className="text-lg font-semibold text-foreground">{block.title}</h3> : null}
        <figure className="overflow-hidden rounded-xl border border-border/70 bg-secondary/40">
          <img
            src={block.image.src}
            alt={block.image.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {block.image.caption ? (
            <figcaption className="px-3 py-2 text-xs text-muted-foreground sm:text-sm">
              {block.image.caption}
            </figcaption>
          ) : null}
        </figure>
      </article>
    );
  }

  return (
    <article className="space-y-4 rounded-2xl border border-border/70 bg-card/60 p-4 sm:p-5">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
        {block.description ? (
          <p className="text-sm text-muted-foreground sm:text-base">{block.description}</p>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {block.images.map((image, index) => (
          <figure
            key={`${block.id}-image-${index}`}
            className="overflow-hidden rounded-xl border border-border/70 bg-secondary/40"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
            {image.caption ? (
              <figcaption className="px-3 py-2 text-xs text-muted-foreground sm:text-sm">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </article>
  );
};

const ProjectDetailPage = ({
  project,
  playCount,
  likeCount,
  statsLoading,
  statsError,
  likesEnabled,
  likeButtonDisabled,
  likeIconPulseSeed,
  onLikeButtonClick,
  onVideoFirstPlay,
}: ProjectDetailPageProps) => {
  return (
    <article className="min-w-0 space-y-5 p-3 xs:p-4 sm:space-y-6 sm:p-6">
      <section className="overflow-hidden rounded-xl border border-border/70 bg-black sm:rounded-2xl">
        <SupabaseVideo
          videoUrl={project.videoUrl}
          posterUrl={project.posterUrl}
          onFirstPlay={onVideoFirstPlay}
        />
      </section>

      <section className="space-y-2">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-gradient-to-r from-card via-card to-secondary/40 px-3 py-3 sm:rounded-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <motion.span
                key={`views-${project.id}-${playCount}-${statsLoading}`}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="min-w-[1.5rem] font-semibold text-foreground"
              >
                {statsLoading ? "--" : playCount.toLocaleString()}
              </motion.span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <motion.span
                key={`likes-${project.id}-${likeCount}-${statsLoading}`}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="min-w-[1.5rem] font-semibold text-foreground"
              >
                {statsLoading ? "--" : likeCount.toLocaleString()}
              </motion.span>
            </div>
            <motion.div
              className="sm:ml-auto"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 24 }}
            >
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Like this video"
                className="h-10 w-10 rounded-full border border-border/70 bg-background/70 text-foreground hover:bg-background"
                onClick={onLikeButtonClick}
                disabled={likeButtonDisabled}
              >
                <motion.span
                  key={`like-action-${project.id}-${likeIconPulseSeed}`}
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{ scale: [1, 1.25, 0.95, 1], rotate: [0, -12, 8, 0] }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-flex"
                >
                  <ThumbsUp className="h-4 w-4" />
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
        {!likesEnabled ? (
          <p className="text-xs text-muted-foreground">
            Add Supabase URL and anon key env vars to enable live interaction tracking.
          </p>
        ) : null}
        {statsError ? (
          <p className="text-xs text-destructive">Unable to load interaction stats right now.</p>
        ) : null}
      </section>

      <section className="space-y-4 rounded-xl border border-border/70 bg-card/60 p-4 sm:rounded-2xl sm:p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
            {project.category}
          </span>
        </div>
        <div className="space-y-2">
          <h2 className="text-[clamp(1.75rem,1.25rem+2vw,2.5rem)] font-bold text-foreground">
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{project.description}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Tools used</p>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <Badge key={tool} variant="secondary" className="rounded-md bg-secondary text-secondary-foreground">
                {tool}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Project Reference Page
        </p>
        {project.detailBlocks.map((block, index) => (
          <div key={`${block.id}-${index}`}>{renderDetailBlock(block)}</div>
        ))}
      </section>
    </article>
  );
};

export default ProjectDetailPage;
