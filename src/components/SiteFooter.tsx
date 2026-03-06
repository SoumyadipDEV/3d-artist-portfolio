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
    <footer
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background via-background/92 to-transparent px-4 pt-6 xs:pt-7 sm:pt-8"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="site-frame relative text-center text-[11px] text-muted-foreground/80 xs:text-sm sm:text-left">
        <p className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none sm:whitespace-nowrap sm:pr-44">
          &copy; Designed & Developed by Soumyadip Banerjee. {currentYear} All Rights reserved
        </p>
        <p className="mt-1.5 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0">
          Total Visitor: {visitCount ?? "..."}
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
