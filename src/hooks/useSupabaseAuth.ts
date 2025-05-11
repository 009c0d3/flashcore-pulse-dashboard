
import { supabase } from "@/integrations/supabase/client";
import { LoginCredentials, SignupData, AuthUser } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

export const useSupabaseAuth = () => {
  // Fetch user profile and roles
  const fetchUserData = async (userId: string): Promise<AuthUser | null> => {
    try {
      // Fetch user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Fetch user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);

      if (rolesError) throw rolesError;

      // Get user email
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData?.user) return null;

      // Check if user has admin role
      const isAdmin = roles.some(role => role.role === 'admin');

      return {
        id: userId,
        email: userData.user.email || '',
        profile,
        roles,
        isAdmin,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Login function
  const login = async (credentials: LoginCredentials) => {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
  };

  // Signup function
  const signup = async (data: SignupData) => {
    const { email, password, username, full_name, avatar_url } = data;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          full_name,
          avatar_url,
        }
      }
    });
    
    if (error) throw error;
  };

  // Logout function
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Get current session
  const getSession = async () => {
    return await supabase.auth.getSession();
  };

  // Set up auth state listener
  const onAuthStateChange = (callback: (session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange((_, session) => {
      callback(session);
    });
  };

  return {
    fetchUserData,
    login,
    signup,
    logout,
    getSession,
    onAuthStateChange,
  };
};
