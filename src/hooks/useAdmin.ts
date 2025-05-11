
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";

export const useAdmin = () => {
  const { user } = useAuth();
  
  // Notify if accessing admin area without proper permissions
  useEffect(() => {
    if (user && !user.isAdmin) {
      toast.error("You don't have permission to access this area");
    }
  }, [user]);
  
  return {
    isAdmin: user?.isAdmin || false,
    user,
  };
};
