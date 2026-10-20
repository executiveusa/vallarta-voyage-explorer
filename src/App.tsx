
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import Sunsets from "./pages/Sunsets";
import SunsetSpotDetail from "./pages/SunsetSpotDetail";
import TrustPage from "./pages/TrustPage";
import Report from "./pages/Report";
import ClaimListing from "./pages/ClaimListing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/sunsets" element={<Sunsets />} />
            <Route path="/sunset-spots/:slug" element={<SunsetSpotDetail />} />
            <Route path="/verified" element={<TrustPage page="verified" />} />
            <Route path="/how-we-make-money" element={<TrustPage page="money" />} />
            <Route path="/privacidad" element={<TrustPage page="privacy" />} />
            <Route path="/terms" element={<TrustPage page="terms" />} />
            <Route path="/report" element={<Report />} />
            <Route path="/claim" element={<ClaimListing />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

export default App;
