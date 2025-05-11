
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserProfile, UserRole } from "@/types/auth";

export interface UserWithRole extends UserProfile {
  email: string;
  isAdmin: boolean;
  user_roles: UserRole[];
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUserAction, setLoadingUserAction] = useState<{id: string, action: string} | null>(null);
  
  const fetchUsers = async () => {
    setIsLoading(true);
    
    try {
      // Fetch user profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;
      
      // Fetch roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) throw rolesError;
      
      // Fetch auth users (requires admin privileges)
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) throw authError;
      
      // Combine all the data - ensure we handle the case where profiles is null or undefined
      const enrichedProfiles: UserWithRole[] = (profiles && profiles.length > 0) 
        ? profiles.map((profile: UserProfile) => {
            // Find roles for this user - ensure proper type checking
            const roles = Array.isArray(userRoles) 
              ? userRoles.filter((role: UserRole) => role.user_id === profile.id) 
              : [];
            
            // Find auth user data
            const authUser = authUsers?.users && authUsers.users.find(u => u.id === profile.id);
            
            return {
              ...profile,
              user_roles: roles,
              email: authUser?.email || "Email hidden",
              isAdmin: roles.some(role => role.role === 'admin') || false
            };
          })
        : [];
      
      setUsers(enrichedProfiles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Could not load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, values: { username: string; full_name: string }) => {
    setLoadingUserAction({ id: userId, action: "update" });
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: values.username,
          full_name: values.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);
      
      if (error) throw error;
      
      toast.success("User updated successfully");
      await fetchUsers();
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
      return false;
    } finally {
      setLoadingUserAction(null);
    }
  };

  const toggleAdminRole = async (userId: string, makeAdmin: boolean) => {
    setLoadingUserAction({ id: userId, action: makeAdmin ? "promote" : "demote" });
    
    try {
      if (makeAdmin) {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert([{ 
            user_id: userId, 
            role: 'admin',
            created_at: new Date().toISOString(),
          }]);
        
        if (error) throw error;
        toast.success("User promoted to admin");
      } else {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
        toast.success("Admin privileges revoked");
      }
      
      await fetchUsers();
      return true;
    } catch (error) {
      console.error("Error toggling admin role:", error);
      toast.error(`Failed to ${makeAdmin ? 'promote' : 'demote'} user. Please try again.`);
      return false;
    } finally {
      setLoadingUserAction(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return false;
    }
    
    setLoadingUserAction({ id: userId, action: "delete" });
    
    try {
      // Delete from auth (this will cascade to profiles due to foreign key)
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      toast.success("User deleted successfully");
      await fetchUsers();
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
      return false;
    } finally {
      setLoadingUserAction(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    loadingUserAction,
    fetchUsers,
    updateUser,
    toggleAdminRole,
    deleteUser
  };
};
