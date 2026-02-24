import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, ThumbsUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import SupabaseVideo from "@/components/SupabaseVideo";
import { type Project } from "@/data/projects";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import {
  getVideoInteractionStats,
  incrementVideoPlayCount,
  submitVideoLike,
  type VideoInteractionStats,
} from "@/lib/videoInteractions";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  const [likeDialogOpen, setLikeDialogOpen] = useState(false);
  const [likeIconPulseSeed, setLikeIconPulseSeed] = useState(0);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [formError, setFormError] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const projectId = project?.id ?? "";

  const statsQueryKey = useMemo(() => ["video-interaction-stats", projectId] as const, [projectId]);

  const statsQuery = useQuery({
    queryKey: statsQueryKey,
    queryFn: () => getVideoInteractionStats(projectId),
    enabled: open && Boolean(projectId),
  });

  const playMutation = useMutation({
    mutationFn: (projectId: string) => incrementVideoPlayCount(projectId),
    onSuccess: (nextStats, projectId) => {
      queryClient.setQueryData(["video-interaction-stats", projectId], nextStats);
    },
  });

  const likeMutation = useMutation({
    mutationFn: submitVideoLike,
    onSuccess: (result, variables) => {
      queryClient.setQueryData(["video-interaction-stats", variables.projectId], (current: VideoInteractionStats | undefined) => ({
        playCount: current?.playCount ?? 0,
        likeCount: result.likeCount,
      }));

      setLikeDialogOpen(false);
      setVisitorName("");
      setVisitorEmail("");
      setFormError("");

      toast({
        title: result.created ? "Thanks for the like" : "Like already submitted",
        description: result.created
          ? "Your like has been counted."
          : "This email has already liked this video.",
      });

      if (result.created) {
        setLikeIconPulseSeed((previous) => previous + 1);
      }
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Unable to submit your like right now.");
    },
  });

  useEffect(() => {
    setLikeDialogOpen(false);
    setVisitorName("");
    setVisitorEmail("");
    setFormError("");
  }, [projectId, open]);

  const playCount = statsQuery.data?.playCount ?? 0;
  const likeCount = statsQuery.data?.likeCount ?? 0;

  const handleLikeButtonClick = () => {
    if (!isSupabaseConfigured) {
      toast({
        variant: "destructive",
        title: "Supabase is not configured",
        description: "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable likes.",
      });
      return;
    }

    setLikeIconPulseSeed((previous) => previous + 1);
    setFormError("");
    setLikeDialogOpen(true);
  };

  const handleLikeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectId) return;
    setFormError("");

    likeMutation.mutate({
      projectId,
      visitorName,
      visitorEmail,
    });
  };

  const handleVideoFirstPlay = () => {
    if (!open || !projectId || !isSupabaseConfigured) return;
    playMutation.mutate(projectId);
  };

  if (!project) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-3xl gap-0 overflow-hidden border-border bg-card p-0 sm:rounded-2xl">
          <div className="max-h-[90vh] overflow-y-auto">
            <div className="overflow-hidden rounded-t-2xl">
              <SupabaseVideo
                videoUrl={project.videoUrl}
                posterUrl={project.posterUrl}
                onFirstPlay={handleVideoFirstPlay}
              />
            </div>
            <div className="space-y-4 p-6">
              <section className="space-y-2">
                <div className="overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-r from-card via-card to-secondary/40 px-3 py-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <motion.span
                        key={`views-${playCount}-${statsQuery.isLoading}`}
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-[1.5rem] font-semibold text-foreground"
                      >
                        {statsQuery.isLoading ? "--" : playCount.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-2 text-sm">
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      <motion.span
                        key={`likes-${likeCount}-${statsQuery.isLoading}`}
                        initial={{ scale: 0.9, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-[1.5rem] font-semibold text-foreground"
                      >
                        {statsQuery.isLoading ? "--" : likeCount.toLocaleString()}
                      </motion.span>
                    </div>
                    <div className="grow" />
                    <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 420, damping: 24 }}>
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        aria-label="Like this video"
                        className="h-10 w-10 rounded-full border border-border/70 bg-background/70 text-foreground hover:bg-background"
                        onClick={handleLikeButtonClick}
                        disabled={likeMutation.isPending}
                      >
                        <motion.span
                          key={`like-action-${likeIconPulseSeed}`}
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
                {!isSupabaseConfigured ? (
                  <p className="text-xs text-muted-foreground">
                    Add Supabase URL and anon key env vars to enable live interaction tracking.
                  </p>
                ) : null}
                {statsQuery.error ? (
                  <p className="text-xs text-destructive">
                    Unable to load interaction stats right now.
                  </p>
                ) : null}
              </section>

              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {project.description}
                </DialogDescription>
              </DialogHeader>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Tools Used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="rounded-md bg-secondary text-secondary-foreground">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={likeDialogOpen}
        onOpenChange={(nextOpen) => {
          if (likeMutation.isPending) return;
          setLikeDialogOpen(nextOpen);
          if (!nextOpen) setFormError("");
        }}
      >
        <DialogContent className="max-w-md border-border bg-card">
          <DialogHeader>
            <DialogTitle>Like {project.title}</DialogTitle>
            <DialogDescription>
              Enter your name and email to submit your like for this video.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleLikeSubmit}>
            <div className="space-y-2">
              <Label htmlFor="visitor-name">Name</Label>
              <Input
                id="visitor-name"
                value={visitorName}
                onChange={(event) => setVisitorName(event.target.value)}
                placeholder="Your name"
                autoComplete="name"
                disabled={likeMutation.isPending}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitor-email">Email</Label>
              <Input
                id="visitor-email"
                type="email"
                value={visitorEmail}
                onChange={(event) => setVisitorEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={likeMutation.isPending}
                required
              />
            </div>
            {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setLikeDialogOpen(false)}
                disabled={likeMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={likeMutation.isPending}>
                {likeMutation.isPending ? "Saving..." : "Submit like"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectModal;
