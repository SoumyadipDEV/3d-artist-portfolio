import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { getSupabasePublicUrl } from "@/lib/supabaseStorage";

const HERO_VIDEO_ASSET_PATH = "hero/hero-loop.mp4";

const Hero = () => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const heroVideoSrc =
    import.meta.env.VITE_HERO_VIDEO_URL?.trim() || getSupabasePublicUrl(HERO_VIDEO_ASSET_PATH);
  const showBackgroundVideo = Boolean(heroVideoSrc) && !isMobile;
  const animateDecorations = showBackgroundVideo && !prefersReducedMotion;

  return (
    <section className="viewport-panel relative flex items-center justify-center overflow-hidden px-4 pb-16 pt-28 xs:px-6 xs:pt-32 sm:px-8 sm:pt-36">
      {/* Supabase background video */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {showBackgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover object-center"
            style={{ filter: "brightness(0.3)" }}
          >
            <source src={heroVideoSrc} type="video/mp4" />
          </video>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.22),_transparent_48%),linear-gradient(180deg,_hsl(var(--secondary))_0%,_hsl(var(--background))_100%)]" />
        )}
      </div>

      {/* Dark overlay on top of video */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/5 via-background/40 to-background/85" />

      {/* Floating orb decorations */}
      {showBackgroundVideo ? (
        <>
          <motion.div
            className="pointer-events-none absolute left-1/4 top-1/4 z-[1] hidden h-64 w-64 rounded-full bg-primary/5 blur-[100px] sm:block"
            animate={animateDecorations ? { y: [0, -30, 0], scale: [1, 1.1, 1] } : undefined}
            transition={animateDecorations ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : undefined}
          />
          <motion.div
            className="pointer-events-none absolute bottom-1/4 right-1/4 z-[1] hidden h-96 w-96 rounded-full bg-primary/8 blur-[120px] sm:block"
            animate={animateDecorations ? { y: [0, 20, 0], scale: [1, 0.95, 1] } : undefined}
            transition={animateDecorations ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : undefined}
          />
        </>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/4 z-[1] h-48 w-48 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl xs:h-56 xs:w-56"
        />
      )}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-kicker mb-4 font-mono uppercase tracking-[0.32em] text-muted-foreground"
        >
          Rajdip Banerjee | 3D Artist
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title mb-5 font-bold tracking-tight sm:mb-6"
        >
          Rajdip
          <br />
          <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Banerjee
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-copy mx-auto mb-8 max-w-2xl text-balance text-muted-foreground sm:mb-10"
        >
          Fresher 3D artist delivering freelance projects in modeling, animation, and cinematic
          visualization.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:glow-primary sm:px-6"
          >
            View My Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
