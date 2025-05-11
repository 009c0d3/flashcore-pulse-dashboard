
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import UserManagementPanel from "@/components/admin/UserManagementPanel";
import AnalyticsPanel from "@/components/admin/AnalyticsPanel";
import TestUsersSetup from "@/components/admin/TestUsersSetup";
import { useAdmin } from "@/hooks/useAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      
      <Tabs defaultValue="users" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="setup">Test Setup</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagementPanel />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsPanel />
        </TabsContent>
        <TabsContent value="setup">
          <TestUsersSetup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
