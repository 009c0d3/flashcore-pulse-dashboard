
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle initial theme setup
  useEffect(() => {
    setIsMounted(true);
    // Check if user has previously set a theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("light-mode", storedTheme === "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    
    // Actually toggle the theme class on the document
    document.documentElement.classList.toggle("light-mode", newTheme === "light");
    
    console.log(`Theme switched to ${newTheme}`);
  };

  if (!isMounted) return null; // Prevent flash of incorrect theme

  return (
    <Toggle
      pressed={!isDarkMode}
      onPressedChange={() => toggleTheme()}
      className="p-2 rounded-full hover:bg-secondary relative transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-6 h-6">
        <Sun 
          size={20} 
          className={`absolute transition-all duration-300 ${
            isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`} 
        />
        <Moon 
          size={20} 
          className={`absolute transition-all duration-300 ${
            isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
          }`} 
        />
      </div>
      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping ${isDarkMode ? "bg-flashcore-green" : "bg-flashcore-orange"}`}></span>
    </Toggle>
  );
};

export default ThemeToggle;
