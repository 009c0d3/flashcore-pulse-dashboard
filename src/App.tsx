import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Activation from './pages/Activation';
import AdminDashboard from './pages/AdminDashboard';
import CreateAdminPage from './pages/CreateAdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient } from '@tanstack/react-query';
import FlashPage from './pages/FlashPage';
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <QueryClient>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/activation" element={<Activation />} />
            <Route path="/flash" element={<ProtectedRoute><FlashPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/create-admin" element={<ProtectedRoute><CreateAdminPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </QueryClient>
  );
}

export default App;
