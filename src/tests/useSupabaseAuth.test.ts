
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

// Mock the Supabase client
vi.mock('@/integrations/supabase/client', () => {
  const mockAuth = {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn(),
    getUser: vi.fn(),
    onAuthStateChange: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    updateUser: vi.fn(),
    resend: vi.fn(),
  };

  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(),
            maybeSingle: vi.fn(),
          })),
        })),
      })),
      auth: mockAuth,
    },
  };
});

describe('useSupabaseAuth', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should login with valid credentials', async () => {
    // Arrange
    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { session: { user: { id: '123' } } },
      error: null,
    } as any);

    // Act
    const auth = useSupabaseAuth();
    await auth.login({ email: 'test@example.com', password: 'password123' });

    // Assert
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should throw an error on login failure', async () => {
    // Arrange
    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { session: null },
      error: new Error('Invalid login credentials'),
    } as any);

    // Act and Assert
    const auth = useSupabaseAuth();
    await expect(auth.login({ email: 'test@example.com', password: 'wrong' }))
      .rejects
      .toThrow('Invalid login credentials');
  });

  it('should sign up a new user', async () => {
    // Arrange
    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.signUp).mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    } as any);

    // Act
    const auth = useSupabaseAuth();
    await auth.signup({
      email: 'new@example.com',
      password: 'password123',
      username: 'newuser',
    });

    // Assert
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'password123',
      options: {
        data: {
          username: 'newuser',
          full_name: undefined,
          avatar_url: undefined,
        }
      }
    });
  });

  it('should log out a user', async () => {
    // Arrange
    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.signOut).mockResolvedValue({
      error: null,
    } as any);

    // Act
    const auth = useSupabaseAuth();
    await auth.logout();

    // Assert
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it('should send verification email', async () => {
    // Arrange
    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.resend).mockResolvedValue({
      data: {},
      error: null,
    } as any);

    // Act
    const auth = useSupabaseAuth();
    await auth.sendVerificationEmail('user@example.com');

    // Assert
    expect(supabase.auth.resend).toHaveBeenCalledWith({
      type: 'signup',
      email: 'user@example.com',
    });
  });

  it('should reset password', async () => {
    // Arrange
    const { supabase } = await import('@/integrations/supabase/client');
    vi.mocked(supabase.auth.updateUser).mockResolvedValue({
      data: { user: { id: '123' } },
      error: null,
    } as any);

    // Act
    const auth = useSupabaseAuth();
    await auth.resetPassword('newpassword123');

    // Assert
    expect(supabase.auth.updateUser).toHaveBeenCalledWith({
      password: 'newpassword123'
    });
  });
});
