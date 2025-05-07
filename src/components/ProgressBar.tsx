
import React, { useEffect, useRef } from "react";
import { ProgressBarProps } from "@/types";
import { cn } from "@/lib/utils";

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, height = "h-2" }) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress-width', `${progress}%`);
    }
  }, [progress]);

  return (
    <div className={cn("progress-bar-container", height)}>
      <div 
        ref={progressBarRef}
        className="progress-bar"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar;
