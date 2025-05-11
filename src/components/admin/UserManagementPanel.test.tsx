
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserManagementPanel from './UserManagementPanel';

// Mock the useUserManagement hook
jest.mock('@/hooks/useUserManagement', () => ({
  useUserManagement: () => ({
    users: [
      {
        id: '123',
        username: 'testuser',
        full_name: 'Test User',
        email: 'test@example.com',
        avatar_url: null,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        isAdmin: false,
        user_roles: []
      }
    ],
    isLoading: false,
    loadingUserAction: null,
    updateUser: jest.fn().mockResolvedValue(true),
    toggleAdminRole: jest.fn().mockResolvedValue(true),
    deleteUser: jest.fn().mockResolvedValue(true)
  })
}));

describe('UserManagementPanel', () => {
  it('renders the user management panel with users', () => {
    render(<UserManagementPanel />);
    
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('shows user actions dropdown when clicking on actions button', async () => {
    render(<UserManagementPanel />);
    
    const actionsButton = screen.getByRole('button', { name: /actions/i });
    await userEvent.click(actionsButton);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Make Admin')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
