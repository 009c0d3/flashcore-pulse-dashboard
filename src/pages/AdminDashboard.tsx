
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "@/types/auth";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Check, 
  ChevronDown, 
  MoreHorizontal, 
  Pencil, 
  Shield, 
  ShieldOff, 
  Trash2, 
  UserPlus, 
  X 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserWithRole extends UserProfile {
  user_roles: UserRole[];
  email: string;
  isAdmin: boolean;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  
  const updateUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    full_name: z.string().optional(),
  });
  
  type UpdateUserFormData = z.infer<typeof updateUserSchema>;
  
  const updateForm = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: "",
      full_name: "",
    }
  });

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      toast({
        title: "Access Denied",
        description: "You need admin permissions to access this page.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Fetch all users with their roles
  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      
      // First, get all user profiles
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*');
        
      if (profileError) throw profileError;

      // Then, get all user roles separately
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
        
      if (rolesError) throw rolesError;
      
      // Get emails from auth.users (need to use edge function for this in production)
      const { data: authUsers, error: usersError } = await supabase.auth.admin.listUsers();
      
      // Combine all the data
      const enrichedProfiles: UserWithRole[] = profiles.map(profile => {
        // Find roles for this user
        const roles = userRoles.filter(role => role.user_id === profile.id);
        
        // Find auth user data
        const authUser = authUsers?.users?.find(u => u.id === profile.id);
        
        return {
          ...profile,
          user_roles: roles || [],
          email: authUser?.email || "Email hidden",
          isAdmin: roles?.some(role => role.role === 'admin') || false
        };
      });
      
      setUsers(enrichedProfiles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    try {
      // In a real app, you'd want to use an edge function for this
      const { error } = await supabase.auth.admin.deleteUser(userId);
      
      if (error) throw error;
      
      setUsers(users.filter(u => u.id !== userId));
      
      toast({
        title: "Success",
        description: "User has been deleted successfully.",
      });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Update user role (make admin or remove admin)
  const handleToggleAdminRole = async (userId: string, isAdmin: boolean) => {
    try {
      if (isAdmin) {
        // Remove admin role
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
          
        if (error) throw error;
      } else {
        // Add admin role
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
          
        if (error) throw error;
      }
      
      // Update local state
      setUsers(users.map(u => {
        if (u.id === userId) {
          return { ...u, isAdmin: !isAdmin };
        }
        return u;
      }));
      
      toast({
        title: "Success",
        description: `User ${isAdmin ? 'removed from' : 'added to'} admin role.`,
      });
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user role. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Update user profile
  const handleUpdateUser = async (data: UpdateUserFormData) => {
    if (!selectedUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name,
        })
        .eq('id', selectedUser.id);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(u => {
        if (u.id === selectedUser.id) {
          return { 
            ...u, 
            username: data.username,
            full_name: data.full_name || u.full_name 
          };
        }
        return u;
      }));
      
      toast({
        title: "Success",
        description: "User profile has been updated.",
      });
      
      setIsUpdateDialogOpen(false);
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update user. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Open update dialog with user data
  const openUpdateDialog = (user: UserWithRole) => {
    setSelectedUser(user);
    updateForm.reset({
      username: user.username || "",
      full_name: user.full_name || "",
    });
    setIsUpdateDialogOpen(true);
  };

  if (loading || !user?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <ParticleBackground />
      <Sidebar isOpen={false} onClose={() => {}} />
      
      <div className="flex flex-col flex-1">
        <Header 
          toggleSidebar={() => {}} 
          openMotivationPopup={() => {}}
        />
        
        <main className="flex-1 p-4 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Shield className="mr-2" /> Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User Management</h2>
                <Button onClick={() => fetchUsers()} variant="outline" size="sm">
                  Refresh
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingUsers ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          Loading users...
                        </TableCell>
                      </TableRow>
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.full_name || '-'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.isAdmin ? 'bg-flashcore-purple/20 text-flashcore-purple' : 'bg-muted text-muted-foreground'
                            }`}>
                              {user.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openUpdateDialog(user)}>
                                  <Pencil size={14} className="mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleToggleAdminRole(user.id, user.isAdmin)}
                                  disabled={user.id === user?.id} // Prevent removing admin from self
                                >
                                  {user.isAdmin ? (
                                    <>
                                      <ShieldOff size={14} className="mr-2" /> Remove Admin
                                    </>
                                  ) : (
                                    <>
                                      <Shield size={14} className="mr-2" /> Make Admin
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteUser(user.id)}
                                  disabled={user.id === user?.id} // Prevent deleting self
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 size={14} className="mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      {/* Update User Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
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
                      <Input {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsUpdateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
