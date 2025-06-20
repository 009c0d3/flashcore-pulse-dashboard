
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
        Dashboard Overview
      </h1>
      <p className="text-muted-foreground">
        Welcome back! Here's your account summary and recent activity.
      </p>
    </div>
  );
};

export default DashboardHeader;
