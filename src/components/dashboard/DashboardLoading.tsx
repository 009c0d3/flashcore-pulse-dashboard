
import React from "react";

const DashboardLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-flashcore-purple border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold">Loading dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
