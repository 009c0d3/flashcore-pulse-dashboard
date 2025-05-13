
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { LoginCredentials } from "@/types/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import EmailVerification from "@/components/auth/EmailVerification";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const { login, loading, error } = useAuth();
  
  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
  
  const onSubmit = async (data: LoginCredentials) => {
    await login(data);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <ParticleBackground />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          openMotivationPopup={() => {}}
        />
        
        <main className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center">
          <Card className="w-full max-w-md border-l-4 border-l-flashcore-green">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground mt-1">
                  Don't have an account? <Link to="/register" className="text-flashcore-green hover:underline">Register</Link>
                </p>
              </div>
              
              {error && (
                <div className="bg-destructive/10 text-destructive rounded-md p-3 mb-4">
                  {error}
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="Enter your email" 
                              {...field}
                              className="pl-9"
                            />
                          </FormControl>
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Enter your password" 
                              {...field}
                              className="pl-9"
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:from-flashcore-green/90 hover:to-flashcore-purple/90"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>

              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowVerification(true)}
                  className="text-sm text-flashcore-green hover:underline"
                >
                  Need to verify your email?
                </button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="max-w-md p-0">
          <EmailVerification onClose={() => setShowVerification(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
