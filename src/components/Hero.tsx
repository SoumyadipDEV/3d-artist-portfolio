import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Google Drive background video */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID_HERE/preview"
          title="Hero background video"
          allow="autoplay; encrypted-media"
          className="pointer-events-none h-full w-full scale-[1.5] border-0 object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
      </div>

      {/* Dark overlay on top of video */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/60 via-background/70 to-background" />

      {/* Floating orb decorations */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-[100px]"
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/8 blur-[120px]"
        animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground"
        >
          3D Artist & Animator
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-7xl md:text-8xl"
        >
          Crafting{" "}
          <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Worlds
          </span>
          <br />
          in Pixels
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground"
        >
          Bringing imagination to life through 3D artistry, one frame at a time.
        </motion.p>

        <motion.a
          href="#showcase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:glow-primary"
        >
          View My Work
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default Hero;
