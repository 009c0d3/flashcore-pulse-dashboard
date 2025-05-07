
import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import MotivationPopup from "@/components/MotivationPopup";

const UserProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [motivationOpen, setMotivationOpen] = useState<boolean>(false);
  
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
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Username</label>
                          <Input value="christodd" readOnly className="bg-secondary" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <Input value="user@email.com" readOnly className="bg-secondary" />
                        </div>
                      </div>
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
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Current Password</label>
                          <Input type="password" placeholder="Enter your current password" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">New Password</label>
                          <Input type="password" placeholder="Enter your new password" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Confirm New Password</label>
                          <Input type="password" placeholder="Confirm your new password" />
                        </div>
                        
                        <Button className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:opacity-90">
                          Update Password
                        </Button>
                      </div>
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
