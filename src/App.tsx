import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/About"));
const WorkPage = lazy(() => import("./pages/Work"));
const ContactPage = lazy(() => import("./pages/Contact"));
const SiteFooter = lazy(() => import("@/components/SiteFooter"));

const PageFallback = () => <div className="page-shell bg-background" />;

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={routerBase}>
            <div className="relative overflow-x-clip bg-background text-foreground">
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
                <SiteFooter />
              </Suspense>
            </div>
          </BrowserRouter>
        </MotionConfig>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
