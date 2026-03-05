import { useEffect, useState } from "react";
import { incrementSiteVisitCount } from "@/lib/siteVisits";

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    const updateVisitCount = async () => {
      try {
        const count = await incrementSiteVisitCount();

        if (isMounted) {
          setVisitCount(count);
        }
      } catch (error) {
        console.error("Unable to update site visit count", error);

        if (isMounted) {
          setVisitCount(0);
        }
      }
    };

    void updateVisitCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 bg-transparent">
      <div className="relative mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground/60 sm:text-sm">
        <p className="text-center sm:pr-44">&copy; Designed & Developed by Soumyadip Banerjee. {currentYear} All Rights reserved</p>
        <p className="sm:absolute sm:bottom-4 sm:right-4 text-right">Total Visitor: {visitCount ?? "..."}</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
