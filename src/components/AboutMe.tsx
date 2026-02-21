import { motion } from "framer-motion";
import { skills } from "@/data/projects";

const education = [
  {
    period: "2023 - 2025",
    title: "Diploma in Animation & VFX",
    institution: "Creative Arts Institute, Kolkata",
    details: "Focused on 3D modeling, texturing, and character animation pipelines.",
  },
  {
    period: "2020 - 2023",
    title: "Bachelor's Degree (Dummy Data)",
    institution: "Kolkata University Affiliated College",
    details: "Built fundamentals in visual storytelling, design principles, and digital media.",
  },
  {
    period: "2018 - 2020",
    title: "Higher Secondary (Dummy Data)",
    institution: "City Higher Secondary School",
    details: "Completed core academics while exploring beginner 3D and motion projects.",
  },
];

const AboutMe = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            About
          </p>
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Rajdip Banerjee
          </h2>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[280px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto w-full max-w-[280px] md:mx-0"
          >
            <div className="aspect-square rounded-2xl border border-dashed border-primary/50 bg-secondary/50 p-4">
              <div className="flex h-full items-center justify-center rounded-xl border border-border bg-card text-center text-sm text-muted-foreground">
                Photograph
                <br />
                Placeholder
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-muted-foreground"
          >
            <p>
              I am Rajdip Banerjee, a fresher 3D artist building a career through freelance
              projects in modeling, animation, and cinematic scene creation.
            </p>
            <p>
              My freelance work includes short-form product visualizations, motion tests, and
              environment shots where I focus on clear storytelling, clean topology, and polished
              final renders.
            </p>
            <p>
              I enjoy collaborating closely with clients, iterating quickly, and turning references
              into production-ready visuals.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14"
        >
          <h3 className="mb-6 text-2xl font-semibold text-foreground">Education</h3>
          <div className="space-y-4">
            {education.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="rounded-xl border border-border bg-card/60 p-4 sm:p-5"
              >
                <p className="mb-1 text-xs uppercase tracking-[0.2em] text-primary">{item.period}</p>
                <h4 className="text-base font-semibold text-foreground sm:text-lg">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.institution}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-14"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Software & Tools
          </p>
          <motion.div
            className="space-y-3"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent-foreground"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + 0.1 * i }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
