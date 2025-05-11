
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthUser, UserProfile } from "@/types/auth";
import { useToast } from "@/hooks/use-toast";

interface User extends UserProfile {
  email: string;
  isAdmin: boolean;
  user_roles: { role: string }[];
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUserAction, setLoadingUserAction] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all users and their profiles
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      // Get all users from auth.users via Supabase function
      const { data: adminData, error: adminError } = await supabase.auth.admin.listUsers();
      
      if (adminError) throw adminError;
      
      const authUsers = adminData?.users || [];
      
      // Get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");
      
      if (profilesError) throw profilesError;
      
      // Get all user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");
      
      if (rolesError) throw rolesError;
      
      // Combine user data
      const combinedUsers = authUsers.map(authUser => {
        const profile = profiles.find(p => p.id === authUser.id) || null;
        const roles = userRoles ? userRoles.filter(r => r.user_id === authUser.id) : [];
        const isAdmin = roles.some(role => role.role === 'admin');
        
        return {
          id: authUser.id,
          email: authUser.email || '',
          username: profile?.username,
          full_name: profile?.full_name,
          avatar_url: profile?.avatar_url,
          created_at: profile?.created_at || authUser.created_at,
          updated_at: profile?.updated_at || authUser.updated_at,
          isAdmin,
          user_roles: roles,
        };
      });
      
      setUsers(combinedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error fetching users",
        description: "Could not load user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Update user profile
  const updateUser = async (userId: string, userData: Partial<UserProfile>) => {
    try {
      setLoadingUserAction(userId);
      
      const { error } = await supabase
        .from("profiles")
        .update(userData)
        .eq("id", userId);
      
      if (error) throw error;
      
      toast({
        title: "User updated",
        description: "User profile has been updated successfully.",
      });
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error updating user",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoadingUserAction(null);
    }
  };

  // Toggle admin role
  const toggleAdminRole = async (userId: string, makeAdmin: boolean) => {
    try {
      setLoadingUserAction(userId);
      
      if (makeAdmin) {
        // Add admin role
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: "admin" });
        
        if (error) throw error;
        
        toast({
          title: "Admin role added",
          description: "User is now an admin.",
        });
      } else {
        // Remove admin role
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", "admin");
        
        if (error) throw error;
        
        toast({
          title: "Admin role removed",
          description: "User is no longer an admin.",
        });
      }
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      console.error("Error toggling admin role:", error);
      toast({
        title: "Error updating user role",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoadingUserAction(null);
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    try {
      setLoadingUserAction(userId);
      
      // Delete user from auth
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      toast({
        title: "User deleted",
        description: "User has been deleted successfully.",
      });
      
      await fetchUsers();
      return true;
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error deleting user",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoadingUserAction(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    loadingUserAction,
    fetchUsers,
    updateUser,
    toggleAdminRole,
    deleteUser,
  };
};
