
import React from "react";

export const Logo = ({
  className = "w-16 h-16 shadow-lg drop-shadow-lg",
  ...props
}: React.ComponentProps<"img">) => (
  <img
    src="/lovable-uploads/c6274856-7224-4530-9f45-df3b9949127d.png"
    alt="FlashCore Logo"
    className={`rounded-xl bg-white/90 object-contain border-2 border-gray-300 ${className}`}
    {...props}
  />
);

export default Logo;
