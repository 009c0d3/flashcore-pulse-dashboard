
import React from "react";
import { MessageCircle, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardModule from "@/components/DashboardModule";

const WorldChatPage = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1">
        <main className="p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              💬 World Chat
            </h1>
            <p className="text-muted-foreground">
              Connect with the global community and share your experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DashboardModule title="Global Chat Room" icon="💬">
                <div className="flex flex-col h-96">
                  <div className="flex-1 bg-muted/20 rounded-lg p-4 mb-4 overflow-y-auto">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-flashcore-purple flex items-center justify-center text-white text-sm">
                          AM
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">alex_mitchell</p>
                          <p className="text-sm text-muted-foreground">Welcome to the world chat!</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-flashcore-green flex items-center justify-center text-white text-sm">
                          JD
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">john_doe</p>
                          <p className="text-sm text-muted-foreground">Great to be here! Loving the platform.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      className="flex-1"
                    />
                    <Button size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </DashboardModule>
            </div>
            
            <div className="space-y-4">
              <DashboardModule title="Online Users" icon="👥">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">alex_mitchell</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">john_doe</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">sarah_smith</span>
                  </div>
                </div>
              </DashboardModule>
              
              <DashboardModule title="Chat Rules" icon="📋">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Be respectful to all members</p>
                  <p>• No spam or promotional content</p>
                  <p>• Keep conversations constructive</p>
                  <p>• Report inappropriate behavior</p>
                </div>
              </DashboardModule>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorldChatPage;
