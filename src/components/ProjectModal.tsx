import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import ProjectDetailPage from "@/components/ProjectDetailPage";
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
        <DialogContent className="max-h-[calc(100dvh-1rem)] max-w-5xl gap-0 overflow-hidden border-border bg-card p-0 sm:max-h-[92svh] sm:rounded-2xl [&>button]:z-20 [&>button]:rounded-full [&>button]:border [&>button]:border-border/70 [&>button]:bg-background/80 [&>button]:backdrop-blur-sm">
          <div className="max-h-[calc(100dvh-1rem)] overflow-y-auto overscroll-contain sm:max-h-[92svh]">
            <ProjectDetailPage
              project={project}
              playCount={playCount}
              likeCount={likeCount}
              statsLoading={statsQuery.isLoading}
              statsError={Boolean(statsQuery.error)}
              likesEnabled={isSupabaseConfigured}
              likeButtonDisabled={likeMutation.isPending}
              likeIconPulseSeed={likeIconPulseSeed}
              onLikeButtonClick={handleLikeButtonClick}
              onVideoFirstPlay={handleVideoFirstPlay}
            />
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
