import { useState } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";

const Gallery = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="showcase" className="section-shell relative">
      <div className="site-frame">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-10 sm:mb-12"
        >
          <p className="section-kicker mb-2 font-mono uppercase tracking-[0.3em] text-primary">
            Portfolio
          </p>
          <h2 className="section-title font-bold">
            Selected Works
          </h2>
        </motion.div>

        <div className="grid gap-4 xs:gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
