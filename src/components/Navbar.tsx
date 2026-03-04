import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const primaryNavLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

const secondaryNavLinks = [
  { label: "Work", to: "/work" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const [resumeUnlocked, setResumeUnlocked] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const [visitorEmail, setVisitorEmail] = useState("");
  const [formError, setFormError] = useState("");
  const resumePdfUrl = import.meta.env.VITE_RESUME_BUCKET_URL?.trim() ?? "";

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

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed left-0 right-0 top-0 z-50 bg-transparent"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-bold tracking-tight text-foreground">
            Rajdip Banerjee
          </Link>
          <div className="flex items-center gap-6">
            {primaryNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  pathname === link.to && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setResumeDialogOpen(true)}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                resumeDialogOpen && "text-foreground",
              )}
            >
              Resume
            </button>
            {secondaryNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  pathname === link.to && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      <Dialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
        <DialogContent
          className={cn(
            "gap-0 overflow-hidden border-border bg-card p-0",
            resumePdfUrl && resumeUnlocked ? "max-h-[92vh] max-w-5xl" : "max-w-lg",
          )}
        >
          <DialogHeader className="border-b border-border px-4 py-3 sm:px-5">
            <div className="flex items-center justify-between gap-3 pr-8">
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
          <div className={cn("bg-background", resumePdfUrl && resumeUnlocked ? "h-[76vh]" : "p-6")}>
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
