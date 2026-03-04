const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 bg-transparent">
      <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted-foreground/60 sm:text-sm">
        &copy; Designed & Developed by Soumyadip Banerjee. {currentYear} All Rights reserved
      </div>
    </footer>
  );
};

export default SiteFooter;
