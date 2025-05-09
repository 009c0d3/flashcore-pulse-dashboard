
import React, { useState, useEffect } from "react";
import { User, Lock } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import MotivationPopup from "@/components/MotivationPopup";
import { useAuth } from "@/context/AuthContext";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  full_name: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const UserProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [motivationOpen, setMotivationOpen] = useState<boolean>(false);
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  
  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      full_name: "",
    },
  });
  
  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  useEffect(() => {
    if (user?.profile) {
      profileForm.reset({
        username: user.profile.username || "",
        full_name: user.profile.full_name || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async (data: ProfileFormData) => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name || null,
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
      
      // Refresh user data
      await refreshUser();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (data: PasswordFormData) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Password updated successfully.",
      });
      
      passwordForm.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <ParticleBackground />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          openMotivationPopup={() => setMotivationOpen(true)}
        />
        
        <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center">
          <Card className="w-full max-w-md border-l-4 border-l-flashcore-green">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold text-center mb-6">USER PROFILE</h1>
              
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="profile">Profile Information</TabsTrigger>
                  <TabsTrigger value="password">Update Password</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-flashcore-green flex items-center justify-center">
                          <User size={16} className="text-black" />
                        </div>
                        <h2 className="font-semibold">PROFILE INFORMATION</h2>
                      </div>
                      
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className="space-y-4">
                          <FormField
                            control={profileForm.control}
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
                            control={profileForm.control}
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
                          
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                            <Input value={user?.email || ''} readOnly className="bg-secondary" />
                          </div>
                          
                          <Button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:opacity-90"
                          >
                            {loading ? "Updating..." : "Update Profile"}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="password">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-flashcore-green flex items-center justify-center">
                          <Lock size={16} className="text-black" />
                        </div>
                        <h2 className="font-semibold">UPDATE PASSWORD</h2>
                      </div>
                      
                      <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(handleUpdatePassword)} className="space-y-4">
                          <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:opacity-90"
                          >
                            {loading ? "Updating..." : "Update Password"}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Message Us Button */}
          <Button 
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <span className="mr-2">✈️</span>
            Message Us
          </Button>
        </main>
      </div>
      
      {/* Motivation Popup */}
      <MotivationPopup 
        isOpen={motivationOpen} 
        onClose={() => setMotivationOpen(false)} 
      />
    </div>
  );
};

export default UserProfile;
