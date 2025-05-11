
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, AuthUser, LoginCredentials, SignupData } from '@/types/auth';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
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
  sendPasswordReset: (email: string) => Promise<void>;
  resetPassword: (newPassword: string) => Promise<void>;
  sendVerification: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const { toast } = useToast();
  const navigate = useNavigate();
  const authService = useSupabaseAuth();

  // Handle session changes
  const handleSessionChange = async (session: Session | null) => {
    setAuthState(prev => ({ ...prev, loading: true }));
    
    if (session?.user) {
      const user = await authService.fetchUserData(session.user.id);
      setAuthState({ user, loading: false, error: null });
    } else {
      setAuthState({ user: null, loading: false, error: null });
    }
  };

  // Initialize auth state and listen for changes
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = authService.onAuthStateChange((session) => {
      console.log('Auth state changed');
      
      // Handle the session change asynchronously to avoid auth deadlocks
      setTimeout(() => {
        handleSessionChange(session);
      }, 0);
    });

    // THEN check for existing session
    authService.getSession().then(({ data: { session } }) => {
      handleSessionChange(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function with error handling
  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      await authService.login(credentials);
      
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

  // Signup function with error handling
  const signup = async (data: SignupData) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      await authService.signup(data);
      
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

  // Logout function with error handling
  const logout = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      await authService.logout();
      
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
    const user = await authService.fetchUserData(authState.user.id);
    setAuthState({ user, loading: false, error: null });
  };

  // Send password reset email
  const sendPasswordReset = async (email: string) => {
    try {
      await authService.sendPasswordResetEmail(email);
      toast({
        title: "Password reset email sent",
        description: "Please check your email to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Reset password
  const resetPassword = async (newPassword: string) => {
    try {
      await authService.resetPassword(newPassword);
      toast({
        title: "Password reset successful",
        description: "Your password has been updated.",
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Password reset failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Send verification email
  const sendVerification = async (email: string) => {
    try {
      await authService.sendVerificationEmail(email);
      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Email verification failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        signup, 
        logout,
        refreshUser,
        sendPasswordReset,
        resetPassword,
        sendVerification
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
