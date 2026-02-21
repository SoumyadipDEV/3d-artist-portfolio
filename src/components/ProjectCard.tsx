import { motion } from "framer-motion";
import { type Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/30"
    >
      {/* Video thumbnail area */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:border-primary/50 group-hover:glow-primary">
            <svg className="ml-1 h-5 w-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
            {project.category}
          </span>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
