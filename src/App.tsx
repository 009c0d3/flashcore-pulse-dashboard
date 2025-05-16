
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ReferEarnPage from "./pages/ReferEarnPage";
import ActivationPage from "./pages/ActivationPage";
import ChildPanelPage from "./pages/ChildPanelPage";
import FeatureRequestPage from "./pages/FeatureRequestPage";
import HistoryPage from "./pages/HistoryPage";
import MailHistoryPage from "./pages/MailHistoryPage";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import TutorialPage from "./pages/TutorialPage";
import LogoutPage from "./pages/LogoutPage";

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
          {/* Auth pages without layout */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Pages with layout */}
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/refer" element={<Layout><ReferEarnPage /></Layout>} />
          <Route path="/activation" element={<Layout><ActivationPage /></Layout>} />
          <Route path="/child-panel" element={<Layout><ChildPanelPage /></Layout>} />
          <Route path="/features" element={<Layout><FeatureRequestPage /></Layout>} />
          <Route path="/history" element={<Layout><HistoryPage /></Layout>} />
          <Route path="/history/mail" element={<Layout><MailHistoryPage /></Layout>} />
          <Route path="/history/payment" element={<Layout><PaymentHistoryPage /></Layout>} />
          <Route path="/tutorials" element={<Layout><TutorialPage /></Layout>} />
          <Route path="/logout" element={<Layout><LogoutPage /></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
