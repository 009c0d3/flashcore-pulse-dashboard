
import React, { useState } from "react";
import { MessageSquare, Image, CloudUpload } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import MotivationPopup from "@/components/MotivationPopup";

const FeatureRequest: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [motivationOpen, setMotivationOpen] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feature request submitted:', { description, file: selectedFile });
    // Add your submit logic here
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
          <Card className="w-full max-w-2xl border-l-4 border-l-flashcore-green">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Request a New Feature</h1>
                <p className="text-muted-foreground mt-1">
                  Share your ideas to help us improve.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-flashcore-green flex items-center justify-center">
                      <MessageSquare size={16} className="text-black" />
                    </div>
                    <label className="font-semibold">Feature Description</label>
                  </div>
                  
                  <Textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the feature you'd love to see... Be as specific as possible..." 
                    className="min-h-32"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-flashcore-green flex items-center justify-center">
                      <Image size={16} className="text-black" />
                    </div>
                    <label className="font-semibold">Optional Image</label>
                  </div>
                  
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${dragging ? 'border-flashcore-green bg-flashcore-green/10' : 'border-muted-foreground/50 hover:border-flashcore-green/50'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <CloudUpload size={32} className="text-muted-foreground mb-2" />
                    <p className="text-center text-muted-foreground">
                      {selectedFile 
                        ? `Selected: ${selectedFile.name}`
                        : 'Drag & drop an image or click to browse'
                      }
                    </p>
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple hover:opacity-90"
                >
                  Submit Feature Request
                </Button>
              </form>
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

export default FeatureRequest;
