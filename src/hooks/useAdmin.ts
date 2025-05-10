
import { useAuth } from "@/context/AuthContext";

export const useAdmin = () => {
  const { user } = useAuth();
  
  return {
    isAdmin: user?.isAdmin || false,
  };
};
