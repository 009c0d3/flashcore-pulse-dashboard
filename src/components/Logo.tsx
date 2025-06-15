
import React from "react";

export const Logo = ({
  className = "w-16 h-16",
  ...props
}: React.ComponentProps<"img">) => (
  <img
    src="/lovable-uploads/b33b1b5a-9cbe-4f15-9057-216ab7e11c91.png"
    alt="FlashCore Logo"
    className={`object-contain ${className}`}
    {...props}
  />
);

export default Logo;
