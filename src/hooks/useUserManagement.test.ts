
import { renderHook, act } from '@testing-library/react-hooks';
import { useUserManagement } from './useUserManagement';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Mock the supabase client and toast
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    auth: {
      admin: {
        listUsers: jest.fn(),
        deleteUser: jest.fn()
      }
    }
  }
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('useUserManagement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users on initial render', async () => {
    // Mock successful responses
    const mockProfiles = [{ id: '123', username: 'testuser' }];
    const mockUserRoles = [{ user_id: '123', role: 'admin' }];
    const mockAuthUsers = { users: [{ id: '123', email: 'test@example.com' }] };

    supabase.from().select.mockImplementation((selector) => {
      if (selector === '*') {
        return Promise.resolve({ data: mockProfiles, error: null });
      }
    });

    supabase.from('user_roles').select.mockResolvedValue({ 
      data: mockUserRoles, 
      error: null 
    });
    
    supabase.auth.admin.listUsers.mockResolvedValue({ 
      data: mockAuthUsers, 
      error: null 
    });

    const { result, waitForNextUpdate } = renderHook(() => useUserManagement());
    
    // Initially loading
    expect(result.current.isLoading).toBe(true);
    
    await waitForNextUpdate();
    
    // After loading
    expect(result.current.isLoading).toBe(false);
    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].id).toBe('123');
    expect(result.current.users[0].isAdmin).toBe(true);
  });

  it('should handle update user', async () => {
    // Setup mock
    supabase.from().update.mockResolvedValue({ error: null });
    
    const { result, waitForNextUpdate } = renderHook(() => useUserManagement());
    
    await waitForNextUpdate();
    
    // Call updateUser
    await act(async () => {
      const success = await result.current.updateUser('123', { 
        username: 'newusername',
        full_name: 'New Name' 
      });
      
      expect(success).toBe(true);
      expect(toast.success).toHaveBeenCalledWith('User updated successfully');
    });
  });
});
