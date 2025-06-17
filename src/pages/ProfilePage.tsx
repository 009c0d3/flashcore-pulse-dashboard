
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserProfile from "@/components/UserProfile";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <UserProfile />
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
