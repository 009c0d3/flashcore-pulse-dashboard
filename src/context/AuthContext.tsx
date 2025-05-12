
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, AuthUser, LoginCredentials, SignupData } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Handle session changes
  const handleSessionChange = async (session: Session | null) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    if (session?.user) {
      const user = await fetchUserData(session.user.id);
      setAuthState({ user, loading: false, error: null });
    } else {
      setAuthState({ user: null, loading: false, error: null });
    }
  };

  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        // Handle the session change asynchronously to avoid auth deadlocks
        setTimeout(() => {
          handleSessionChange(session);
        }, 0);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSessionChange(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message 
        }));
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      navigate('/');
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message 
      }));
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Signup function
  const signup = async (data: SignupData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
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
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message 
        }));
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Signup successful",
        description: "Please check your email to confirm your account.",
      });
      navigate('/login');
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message 
      }));
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message 
        }));
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      setAuthState({ user: null, loading: false, error: null });
      navigate('/login');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message 
      }));
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    if (!authState.user?.id) return;
    
    setAuthState(prev => ({ ...prev, loading: true }));
    const user = await fetchUserData(authState.user.id);
    setAuthState({ user, loading: false, error: null });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        signup, 
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
