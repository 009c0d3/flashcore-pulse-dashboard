
import { supabase } from "@/integrations/supabase/client";

/**
 * This is a utility function to create test users in the system.
 * 
 * WARNING: This is for development/testing purposes only.
 * Do NOT use this in production as it creates users with predictable passwords.
 */
export const setupTestUsers = async () => {
  try {
    // Create a regular user
    const { data: regularUser, error: regularUserError } = await supabase.auth.signUp({
      email: 'user@example.com',
      password: 'password123',
      options: {
        data: {
          username: 'regular_user',
          full_name: 'Regular User',
        }
      }
    });
    
    if (regularUserError) throw regularUserError;
    
    console.log('Regular user created:', regularUser);
    
    // Create an admin user
    const { data: adminUser, error: adminUserError } = await supabase.auth.signUp({
      email: 'admin@example.com',
      password: 'admin123',
      options: {
        data: {
          username: 'admin_user',
          full_name: 'Admin User',
        }
      }
    });
    
    if (adminUserError) throw adminUserError;
    
    console.log('Admin user created:', adminUser);
    
    // Make the admin user an admin
    if (adminUser.user) {
      const { error: adminRoleError } = await supabase
        .from('user_roles')
        .insert([{ 
          user_id: adminUser.user.id, 
          role: 'admin'
        }]);
      
      if (adminRoleError) throw adminRoleError;
      
      console.log('Admin role assigned successfully');
    }
    
    return {
      regularUser: {
        email: 'user@example.com',
        password: 'password123'
      },
      adminUser: {
        email: 'admin@example.com',
        password: 'admin123'
      }
    };
  } catch (error) {
    console.error('Error creating test users:', error);
    throw error;
  }
};
