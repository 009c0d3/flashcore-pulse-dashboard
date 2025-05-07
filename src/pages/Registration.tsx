
import React, { useState } from "react";
import { Eye, EyeOff, Wallet, User, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import MotivationPopup from "@/components/MotivationPopup";

const walletLogos = [
  { name: "Binance", icon: "💰" },
  { name: "Bybit", icon: "💲" },
  { name: "Coinbase", icon: "🪙" },
  { name: "MetaMask", icon: "🦊" },
  { name: "Zelle", icon: "💵" },
];

const Registration: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [motivationOpen, setMotivationOpen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });
  
  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Handle registration logic here
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
              <div className="flex justify-center space-x-3 mb-6">
                {walletLogos.map((wallet, index) => (
                  <div 
                    key={index} 
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xl"
                    title={wallet.name}
                  >
                    {wallet.icon}
                  </div>
                ))}
              </div>
              
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-muted-foreground mt-1">
                  Already registered? <Link to="/login" className="text-flashcore-green hover:underline">Login</Link>
                </p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="Enter your username" 
                              {...field}
                              className="pl-9"
                            />
                          </FormControl>
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                        </div>
                      </FormItem>
                    )}
                  />
                  
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
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type={showConfirmPassword ? "text" : "password"} 
                              placeholder="Confirm your password" 
                              {...field}
                              className="pl-9"
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:from-flashcore-green/90 hover:to-flashcore-purple/90"
                  >
                    Register
                  </Button>
                </form>
              </Form>
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

export default Registration;
