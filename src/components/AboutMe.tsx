import { motion } from "framer-motion";
import { skills } from "@/data/projects";

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
            The Artist Behind the Renders
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-muted-foreground"
          >
            <p>
              With over 5 years of experience in 3D art and animation, I specialize in creating
              immersive environments, character animations, and visual effects that push the
              boundaries of digital storytelling.
            </p>
            <p>
              My journey began with a fascination for video games and film VFX, which evolved into
              a deep passion for crafting detailed, photorealistic worlds and stylized animations
              that captivate audiences.
            </p>
            <p>
              I believe every polygon tells a story, and every frame is an opportunity to
              create something extraordinary.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Software & Tools
            </p>
            <div className="space-y-3">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
