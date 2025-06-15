
import React from "react";

export const Logo = ({ className = "w-8 h-8", ...props }: React.ComponentProps<"img">) => (
  <img
    src="/lovable-uploads/c6274856-7224-4530-9f45-df3b9949127d.png"
    alt="FlashCore Logo"
    className={className}
    {...props}
  />
);

export default Logo;
