
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import WalletSelection from "./pages/WalletSelection";
import ChildPanel from "./pages/ChildPanel";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import FeatureRequest from "./pages/FeatureRequest";
import ActivationHistory from "./pages/ActivationHistory";
import SentMailHistory from "./pages/SentMailHistory";
import AdminDashboard from "./pages/AdminDashboard";
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
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/wallets" element={
              <ProtectedRoute>
                <WalletSelection />
              </ProtectedRoute>
            } />
            <Route path="/child-panel" element={
              <ProtectedRoute>
                <ChildPanel />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/features" element={
              <ProtectedRoute>
                <FeatureRequest />
              </ProtectedRoute>
            } />
            <Route path="/activation-history" element={
              <ProtectedRoute>
                <ActivationHistory />
              </ProtectedRoute>
            } />
            <Route path="/history/mail" element={
              <ProtectedRoute>
                <SentMailHistory />
              </ProtectedRoute>
            } />
            
            {/* Admin route */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
