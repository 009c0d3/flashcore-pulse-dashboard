
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DashboardModule from "@/components/DashboardModule";

const ContactUsPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1">
        <main className="p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              📞 Contact Us
            </h1>
            <p className="text-muted-foreground">
              Get in touch with our support team for any questions or assistance
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <DashboardModule title="Send us a Message" icon="✉️">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input placeholder="Your full name" required />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your.email@example.com" required />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="What's this about?" required />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea 
                      placeholder="Tell us how we can help you..." 
                      rows={5}
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </DashboardModule>
            </div>
            
            <div className="space-y-6">
              <DashboardModule title="Contact Information" icon="📍">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-flashcore-purple" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@flashcore.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-flashcore-green" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-flashcore-orange" />
                    <div>
                      <p className="font-medium">Office Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Tech Street<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </DashboardModule>
              
              <DashboardModule title="Support Hours" icon="🕒">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </DashboardModule>
              
              <DashboardModule title="Quick Links" icon="🔗">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    📚 Help Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    💬 Live Chat Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎥 Video Tutorials
                  </Button>
                </div>
              </DashboardModule>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactUsPage;
