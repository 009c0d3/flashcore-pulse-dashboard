
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  MoreHorizontal, 
  Pencil, 
  Shield, 
  ShieldOff, 
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { UserProfile, UserRole } from "@/types/auth";

interface UserWithRole extends UserProfile {
  email: string;
  isAdmin: boolean;
  user_roles: UserRole[];
}

const updateFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  full_name: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
});

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUserAction, setLoadingUserAction] = useState<{id: string, action: string} | null>(null);

  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      username: "",
      full_name: "",
    },
  });
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
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
      
      // Combine all the data
      const enrichedProfiles: UserWithRole[] = profiles.map(profile => {
        // Find roles for this user
        const roles = userRoles?.filter(role => role.user_id === profile.id) || [];
        
        // Find auth user data
        const authUser = authUsers?.users?.find(u => u.id === profile.id);
        
        return {
          ...profile,
          user_roles: roles,
          email: authUser?.email || "Email hidden",
          isAdmin: roles.some(role => role.role === 'admin') || false
        };
      });
      
      setUsers(enrichedProfiles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Could not load users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUser = (user: UserWithRole) => {
    setSelectedUser(user);
    updateForm.reset({
      username: user.username || "",
      full_name: user.full_name || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = async (values: z.infer<typeof updateFormSchema>) => {
    if (!selectedUser) return;
    
    setLoadingUserAction({ id: selectedUser.id, action: "update" });
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: values.username,
          full_name: values.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      
      toast.success("User updated successfully");
      fetchUsers();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
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
      
      fetchUsers();
    } catch (error) {
      console.error("Error toggling admin role:", error);
      toast.error(`Failed to ${makeAdmin ? 'promote' : 'demote'} user. Please try again.`);
    } finally {
      setLoadingUserAction(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    
    setLoadingUserAction({ id: userId, action: "delete" });
    
    try {
      // Delete from auth (this will cascade to profiles due to foreign key)
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setLoadingUserAction(null);
    }
  };

  if (!user?.isAdmin) {
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableCaption>List of all users</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.username || "Not set"}</TableCell>
                    <TableCell>{user.full_name || "Not set"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            User
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {user.isAdmin ? (
                            <DropdownMenuItem 
                              onClick={() => toggleAdminRole(user.id, false)}
                              disabled={loadingUserAction?.id === user.id}
                            >
                              <ShieldOff className="mr-2 h-4 w-4" />
                              Remove Admin Role
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => toggleAdminRole(user.id, true)}
                              disabled={loadingUserAction?.id === user.id}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Make Admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => deleteUser(user.id)}
                            disabled={loadingUserAction?.id === user.id}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <Form {...updateForm}>
            <form onSubmit={updateForm.handleSubmit(handleUpdateUser)} className="space-y-4">
              <FormField
                control={updateForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={updateForm.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={loadingUserAction?.id === selectedUser?.id}
                >
                  {loadingUserAction?.id === selectedUser?.id ? 
                    "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
