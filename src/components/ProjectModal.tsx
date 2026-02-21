import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import SupabaseVideo from "@/components/SupabaseVideo";
import { type Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card p-0 sm:rounded-2xl">
        <div className="overflow-hidden rounded-t-2xl">
          <SupabaseVideo videoUrl={project.videoUrl} posterUrl={project.posterUrl} />
        </div>
        <div className="space-y-4 p-6">
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
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
