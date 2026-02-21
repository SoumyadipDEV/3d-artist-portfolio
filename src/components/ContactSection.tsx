import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const socials = [
  { name: "ArtStation", href: "#", icon: "A" },
  { name: "Instagram", href: "#", icon: "I" },
  { name: "LinkedIn", href: "#", icon: "L" },
  { name: "Facebook", href: "#", icon: "F" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Contact
          </p>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Let's Create Together
          </h2>
          <p className="mx-auto max-w-md text-muted-foreground">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-lg"
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                placeholder="Name"
                className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
              />
              <Input
                type="email"
                placeholder="Email"
                className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </div>
            <Input
              placeholder="Subject"
              className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            <Textarea
              placeholder="Your message..."
              rows={5}
              className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
            />
            <Button
              type="submit"
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Send Message
            </Button>
          </form>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              aria-label={s.name}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary/50 text-sm font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:glow-primary"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <p className="mt-16 text-center text-xs text-muted-foreground">
          © 2026 — Designed & built with passion.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
