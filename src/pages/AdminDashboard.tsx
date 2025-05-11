
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserManagementPanel from "@/components/admin/UserManagementPanel";
import { useAdmin } from "@/hooks/useAdmin";

const AdminDashboard = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  // Redirect non-admin users
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <UserManagementPanel />
    </div>
  );
};

export default AdminDashboard;
