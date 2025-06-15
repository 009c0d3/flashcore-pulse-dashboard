
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
      "glass-card rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1 relative",
      "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-flashcore-purple before:via-flashcore-green before:to-flashcore-orange before:-z-10",
      "after:absolute after:inset-[1px] after:rounded-xl after:bg-card/50 after:backdrop-blur-sm after:-z-10",
      className
    )}>
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="mt-2 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default DashboardModule;
