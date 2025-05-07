
import React from "react";
import { DashboardModuleProps } from "@/types";
import { cn } from "@/lib/utils";

const DashboardModule: React.FC<DashboardModuleProps> = ({ 
  title, 
  icon, 
  className, 
  children 
}) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1",
      className
    )}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
};

export default DashboardModule;
