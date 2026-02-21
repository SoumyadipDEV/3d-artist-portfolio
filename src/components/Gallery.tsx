import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Portfolio
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </section>
  );
};

export default Gallery;
