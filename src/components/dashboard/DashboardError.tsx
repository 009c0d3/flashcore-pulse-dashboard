
import React from "react";

const DashboardError: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 bg-card rounded-xl border border-destructive max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Dashboard</h2>
        <p className="text-muted-foreground mb-4">Please try refreshing the page</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default DashboardError;
