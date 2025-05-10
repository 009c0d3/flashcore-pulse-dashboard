
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if user has previously set a theme preference
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    
    // This is a placeholder for actual theme switching
    // In a real implementation, you would update CSS variables or use a theme context
    console.log(`Theme switched to ${newTheme}`);
  };

  return (
    <button
      onClick={toggleTheme}
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
      <span className="absolute -top-1 -right-1 w-2 h-2 bg-flashcore-green rounded-full animate-ping"></span>
    </button>
  );
};

export default ThemeToggle;
