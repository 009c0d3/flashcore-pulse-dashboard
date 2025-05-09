
export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile | null;
  roles: UserRole[];
  isAdmin: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
}
