
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

// Mock the hooks
vi.mock('@/hooks/useSupabaseAuth', () => ({
  useSupabaseAuth: vi.fn(() => ({
    login: vi.fn(),
    signup: vi.fn(),
    logout: vi.fn(),
    fetchUserData: vi.fn(),
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
    sendPasswordResetEmail: vi.fn(),
    resetPassword: vi.fn(),
    sendVerificationEmail: vi.fn(),
    verifyEmail: vi.fn(),
  })),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({
    toast: vi.fn(),
  })),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

// Test component that uses the auth context
const TestComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <div data-testid="loading">{auth.loading.toString()}</div>
      <div data-testid="user">{auth.user ? JSON.stringify(auth.user) : 'null'}</div>
      <button onClick={() => auth.login({ email: 'test@example.com', password: 'password' })}>
        Login
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide initial auth state', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      );
    });

    // Initially loading should be true
    expect(screen.getByTestId('loading').textContent).toBe('true');

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.getByTestId('loading').textContent).toBe('false');
    });
    
    // User should be null initially
    expect(screen.getByTestId('user').textContent).toBe('null');
  });

  it('should handle session changes', async () => {
    const { useSupabaseAuth } = await import('@/hooks/useSupabaseAuth');
    
    // Mock session change
    const mockOnAuthStateChange = vi.fn().mockImplementation((callback) => {
      // Simulate a session change
      setTimeout(() => {
        callback({ user: { id: '123' } });
      }, 10);
      
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });
    
    const mockFetchUserData = vi.fn().mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      isAdmin: false,
      roles: [],
      profile: null,
    });
    
    vi.mocked(useSupabaseAuth).mockReturnValue({
      ...vi.mocked(useSupabaseAuth)(),
      onAuthStateChange: mockOnAuthStateChange,
      fetchUserData: mockFetchUserData,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <AuthProvider>
            <TestComponent />
          </AuthProvider>
        </MemoryRouter>
      );
    });

    // Wait for user to be loaded after session change
    await waitFor(() => {
      const userElement = screen.getByTestId('user');
      expect(userElement.textContent).not.toBe('null');
      expect(userElement.textContent).toContain('"id":"123"');
    });
  });
});
