import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarLink } from "@/types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks: SidebarLink[] = [
  { label: "Dashboard", icon: "📊", path: "/dashboard" },
  { label: "Refer & Earn", icon: "💰", path: "/refer" },
  { label: "World Chat", icon: "💬", path: "/world-chat", isNew: true },
  { label: "My Activation", icon: "🔑", path: "/activation" },
  { label: "Contact us", icon: "📞", path: "/contact" },
  { label: "Child Panel", icon: "👥", path: "/child-panel", isNew: true },
  { label: "Request Features", icon: "💡", path: "/features" },
  { 
    label: "History", 
    icon: "📜", 
    path: "/history",
    subLinks: [
      { label: "Mail History", icon: "📧", path: "/history/mail" },
      { label: "Payment History", icon: "💰", path: "/history/payment" }
    ]
  },
  { label: "Tutorials", icon: "📚", path: "/tutorials" },
  { label: "Logout", icon: "🚪", path: "/logout" }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  
  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  // Check if a path is active (exact match or subpath)
  const isActivePath = (path: string) => {
    if (path === "/dashboard" && location.pathname === "/") {
      return true; // Consider dashboard active on home page too
    }
    return location.pathname === path || 
           (path !== "/" && location.pathname.startsWith(path));
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-sidebar transition-transform duration-300 ease-in-out z-50 lg:relative lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-flashcore-purple via-flashcore-green to-flashcore-orange bg-clip-text text-transparent">
                FLASHCORE
              </h1>
            </Link>
          </div>
          
          {/* Links */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {sidebarLinks.map((link) => (
                <li key={link.label}>
                  {link.subLinks ? (
                    <div className="space-y-1">
                      <button
                        className={cn(
                          "flex items-center w-full px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors",
                          isActivePath(link.path) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        )}
                        onClick={() => toggleExpand(link.label)}
                      >
                        <span className="mr-2">{link.icon}</span>
                        <span className="flex-1">{link.label}</span>
                        {expandedItems.includes(link.label) ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                        {link.isNew && (
                          <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full bg-flashcore-purple text-white">
                            New
                          </span>
                        )}
                      </button>
                      
                      {expandedItems.includes(link.label) && (
                        <ul className="pl-5 space-y-1">
                          {link.subLinks.map((subLink) => (
                            <li key={subLink.label}>
                              <Link
                                to={subLink.path}
                                className={cn(
                                  "flex items-center px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors",
                                  isActivePath(subLink.path) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                )}
                              >
                                <span className="mr-2">{subLink.icon}</span>
                                <span>{subLink.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        "flex items-center px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors",
                        isActivePath(link.path) && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      )}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.label}</span>
                      {link.isNew && (
                        <span className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full bg-flashcore-purple text-white">
                          New
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-sm">AM</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">alex_mitchell</p>
                <p className="text-xs text-sidebar-foreground">Power User</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
