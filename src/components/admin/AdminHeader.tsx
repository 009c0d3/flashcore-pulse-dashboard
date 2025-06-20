
import React from "react";
import { Shield } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Shield className="w-8 h-8 text-primary" />
    </div>
  );
};

export default AdminHeader;
