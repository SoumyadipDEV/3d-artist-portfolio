import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import AboutPage from "./pages/About";
import WorkPage from "./pages/Work";
import ContactPage from "./pages/Contact";
import SiteFooter from "@/components/SiteFooter";

const queryClient = new QueryClient();
const routerBase = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBase}>
        <div className="bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          <SiteFooter />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
