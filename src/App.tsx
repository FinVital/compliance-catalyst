import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AutoTracker from "./components/AutoTracker.tsx";
// Lazy loading pages for better performance
const Index = lazy(() => import("./pages/Index.tsx"));
const Assessment = lazy(() => import("./pages/Assessment.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Loading fallback
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-950">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AutoTracker />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/solutions" element={<Index />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
