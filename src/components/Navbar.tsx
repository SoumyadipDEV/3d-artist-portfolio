import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { submitResumeAccess } from "@/lib/resumeAccess";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeUnlocked, setResumeUnlocked] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [formError, setFormError] = useState("");
  const resumePdfUrl = import.meta.env.VITE_RESUME_BUCKET_URL?.trim() ?? "";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const resumeDownloadUrl = useMemo(() => {
    if (!resumePdfUrl) return "";

    try {
      const url = new URL(resumePdfUrl);
      const fallbackFilename = "resume.pdf";
      const filename = url.pathname.split("/").pop() || fallbackFilename;
      url.searchParams.set("download", filename);
      return url.toString();
    } catch {
      return resumePdfUrl;
    }
  }, [resumePdfUrl]);

  const resumePreviewUrl = useMemo(() => {
    if (!resumePdfUrl) return "";

    try {
      const url = new URL(resumePdfUrl);
      const hashFragment = url.hash.replace(/^#/, "");
      const hashParams = new URLSearchParams(hashFragment);
      hashParams.set("toolbar", "0");
      hashParams.set("navpanes", "0");
      hashParams.set("scrollbar", "0");
      url.hash = hashParams.toString();
      return url.toString();
    } catch {
      const separator = resumePdfUrl.includes("#") ? "&" : "#";
      return `${resumePdfUrl}${separator}toolbar=0&navpanes=0&scrollbar=0`;
    }
  }, [resumePdfUrl]);

  const resumeAccessMutation = useMutation({
    mutationFn: submitResumeAccess,
    onSuccess: () => {
      setFormError("");
      setResumeUnlocked(true);
      toast({
        title: "Resume unlocked",
        description: "You can now view and download the resume.",
      });
    },
    onError: (error) => {
      setFormError(error instanceof Error ? error.message : "Unable to verify your details right now.");
    },
  });

  const handleResumeAccessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    resumeAccessMutation.mutate({
      visitorName,
      visitorEmail,
    });
  };

  const linkClassName = (isActive: boolean) =>
    cn(
      "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
      isActive && "text-foreground",
    );

  const mobileLinkClassName = (isActive: boolean) =>
    cn(
      "rounded-xl border px-4 py-3 text-left text-base font-medium transition-colors",
      isActive
        ? "border-border bg-secondary/70 text-foreground"
        : "border-transparent text-muted-foreground hover:border-border/70 hover:bg-secondary/50 hover:text-foreground",
    );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed right-4 top-4 z-50 sm:left-0 sm:right-0 sm:top-0"
      >
        <div className="flex items-center justify-end sm:site-frame sm:gap-3 sm:py-4 sm:justify-between">
          <Link
            to="/"
            className="hidden max-w-[12rem] text-sm font-bold tracking-tight text-foreground xs:max-w-none xs:text-base sm:block sm:text-lg"
          >
            Rajdip Banerjee
          </Link>

          <div className="hidden items-center gap-5 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={linkClassName(pathname === link.to)}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setResumeDialogOpen(true)}
              className={linkClassName(resumeDialogOpen)}
            >
              Resume
            </button>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-border/70 bg-background/70 shadow-lg backdrop-blur-md sm:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-border bg-background/95 backdrop-blur-md"
            >
              <SheetHeader className="mt-8 items-start text-left">
                <SheetTitle className="text-base tracking-tight">Navigate</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={mobileLinkClassName(pathname === link.to)}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeDialogOpen(true);
                  }}
                  className={mobileLinkClassName(resumeDialogOpen)}
                >
                  Resume
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>

      <Dialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
        <DialogContent
          className={cn(
            "gap-0 overflow-hidden border-border bg-card p-0",
            resumePdfUrl && resumeUnlocked ? "max-h-[calc(100dvh-1rem)] max-w-5xl sm:max-h-[92svh]" : "max-w-lg",
          )}
        >
          <DialogHeader className="border-b border-border px-4 py-3 xs:px-5">
            <div className="flex flex-col gap-3 pr-8 xs:flex-row xs:items-center xs:justify-between">
              <div className="space-y-1">
                <DialogTitle className="text-base">Resume</DialogTitle>
                {!resumeUnlocked && resumePdfUrl ? (
                  <DialogDescription className="text-sm text-muted-foreground">
                    Submit your Name & Email details to View/Download my Resume
                  </DialogDescription>
                ) : null}
              </div>
              {resumePdfUrl && resumeUnlocked ? (
                <Button asChild size="sm" variant="secondary">
                  <a href={resumeDownloadUrl || resumePdfUrl} target="_blank" rel="noreferrer">
                    Download
                  </a>
                </Button>
              ) : null}
            </div>
          </DialogHeader>
          <div
            className={cn(
              "bg-background",
              resumePdfUrl && resumeUnlocked ? "h-[68svh] sm:h-[76svh]" : "p-5 xs:p-6",
            )}
          >
            {!resumePdfUrl ? (
              <div className="flex min-h-40 items-center justify-center text-center text-sm text-muted-foreground">
                Add `VITE_RESUME_BUCKET_URL` in your `.env` with a public PDF URL to preview and download your resume.
              </div>
            ) : !resumeUnlocked ? (
              <form className="mx-auto w-full max-w-md space-y-4" onSubmit={handleResumeAccessSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="resume-visitor-name">Name</Label>
                  <Input
                    id="resume-visitor-name"
                    value={visitorName}
                    onChange={(event) => setVisitorName(event.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={resumeAccessMutation.isPending}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resume-visitor-email">Email</Label>
                  <Input
                    id="resume-visitor-email"
                    type="email"
                    value={visitorEmail}
                    onChange={(event) => setVisitorEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={resumeAccessMutation.isPending}
                    required
                  />
                </div>
                {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
                <DialogFooter className="pt-2">
                  <Button type="submit" disabled={resumeAccessMutation.isPending}>
                    {resumeAccessMutation.isPending ? "Verifying..." : "View Resume"}
                  </Button>
                </DialogFooter>
              </form>
            ) : (
              <iframe
                title="Resume PDF preview"
                src={resumePreviewUrl}
                className="h-full w-full border-0"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
