
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
import FlashPage from "./pages/FlashPage";
import WorldChatPage from "./pages/WorldChatPage";
import ContactUsPage from "./pages/ContactUsPage";
import PricingPage from "./pages/PricingPage";
import PlansPage from "./pages/PlansPage";
import FeaturesPage from "./pages/FeaturesPage";
import ContactPage from "./pages/ContactPage";
import PricingLandingPage from "./pages/PricingLandingPage";
import WalletPage from "./pages/WalletPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/contact-landing" element={<ContactPage />} />
          <Route path="/pricing-landing" element={<PricingLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/refer" element={<ProtectedRoute><Layout><ReferEarnPage /></Layout></ProtectedRoute>} />
          <Route path="/world-chat" element={<ProtectedRoute><Layout><WorldChatPage /></Layout></ProtectedRoute>} />
          <Route path="/activation" element={<ProtectedRoute><Layout><ActivationPage /></Layout></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Layout><ContactUsPage /></Layout></ProtectedRoute>} />
          <Route path="/child-panel" element={<ProtectedRoute><Layout><ChildPanelPage /></Layout></ProtectedRoute>} />
          <Route path="/request-features" element={<ProtectedRoute><Layout><FeatureRequestPage /></Layout></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><Layout><HistoryPage /></Layout></ProtectedRoute>} />
          <Route path="/history/mail" element={<ProtectedRoute><Layout><MailHistoryPage /></Layout></ProtectedRoute>} />
          <Route path="/history/payment" element={<ProtectedRoute><Layout><PaymentHistoryPage /></Layout></ProtectedRoute>} />
          <Route path="/tutorials" element={<ProtectedRoute><Layout><TutorialPage /></Layout></ProtectedRoute>} />
          <Route path="/flash" element={<ProtectedRoute><Layout><FlashPage /></Layout></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute><Layout><PricingPage /></Layout></ProtectedRoute>} />
          <Route path="/logout" element={<ProtectedRoute><Layout><LogoutPage /></Layout></ProtectedRoute>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<ProtectedRoute><Layout><NotFound /></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
