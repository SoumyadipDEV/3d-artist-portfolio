import { motion } from "framer-motion";
import { type LucideIcon, Facebook, Instagram, Linkedin, MapPin, Palette, Phone } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SocialLink {
  name: string;
  href: string;
  Icon: LucideIcon;
}

const socialLinks: SocialLink[] = [
  { name: "ArtStation", href: "#", Icon: Palette },
  { name: "Instagram", href: "#", Icon: Instagram },
  { name: "LinkedIn", href: "#", Icon: Linkedin },
  { name: "Facebook", href: "#", Icon: Facebook },
  { name: "Mobile Number", href: "tel:+919000000000", Icon: Phone },
];

const ContactSection = () => {
  const [state, handleSubmit] = useForm("meelpyao");

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
          <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-8">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Kolkata, India
            </p>
            <a
              href="tel:+919000000000"
              className="flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" />
              Mobile Number: +91 90000 00000
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-lg"
        >
          {state.succeeded ? (
            <div className="rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. Your message has been sent successfully.
              </p>
            </div>
          ) : (
            <form
              action="https://formspree.io/f/meelpyao"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="contact-name"
                  name="name"
                  placeholder="Name"
                  required
                  className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
                />
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
                />
              </div>
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-sm text-destructive"
              />
              <Input
                id="contact-subject"
                name="subject"
                placeholder="Subject"
                required
                className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
              />
              <Textarea
                id="contact-message"
                name="message"
                placeholder="Your message..."
                rows={5}
                required
                className="border-border bg-secondary/50 placeholder:text-muted-foreground focus-visible:ring-primary"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-sm text-destructive"
              />
              <ValidationError
                errors={state.errors}
                className="text-sm text-destructive"
              />
              <Button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary/50 text-sm font-semibold text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:glow-primary"
            >
              <social.Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <p className="mt-16 text-center text-xs text-muted-foreground">
          © 2026 Rajdip Banerjee. Designed & built with passion.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
