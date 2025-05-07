
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WalletSelection from "./pages/WalletSelection";
import ChildPanel from "./pages/ChildPanel";
import Registration from "./pages/Registration";
import UserProfile from "./pages/UserProfile";
import FeatureRequest from "./pages/FeatureRequest";
import ActivationHistory from "./pages/ActivationHistory";
import SentMailHistory from "./pages/SentMailHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30 * 1000, // 30 seconds
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/wallets" element={<WalletSelection />} />
          <Route path="/child-panel" element={<ChildPanel />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/features" element={<FeatureRequest />} />
          <Route path="/activation-history" element={<ActivationHistory />} />
          <Route path="/history/mail" element={<SentMailHistory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
