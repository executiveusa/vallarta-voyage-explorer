
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Directory from "./pages/Directory";
import Sunsets from "./pages/Sunsets";
import SunsetSpotDetail from "./pages/SunsetSpotDetail";
import Agents from "./pages/Agents";
import ClaimListing from "./pages/ClaimListing";
import AdminPanel from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/sunsets" element={<Sunsets />} />
          <Route path="/sunset-spots/:slug" element={<SunsetSpotDetail />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/claim" element={<ClaimListing />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
