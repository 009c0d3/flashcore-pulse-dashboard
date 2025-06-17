
import React, { useState } from "react";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Receipt, FileText, Send } from "lucide-react";
import FlashBillingModal from "@/components/flash/FlashBillingModal";
import GenerateReceiptModal from "@/components/flash/GenerateReceiptModal";
import GenerateTransactionModal from "@/components/flash/GenerateTransactionModal";

const FlashPage = () => {
  const { isActivated } = useSubscriptionStatus();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [showBillingModal, setShowBillingModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
  const [customEmailData, setCustomEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    template: 'custom'
  });

  if (!isActivated) {
    return (
      <div className="container mx-auto p-6">
        <div className="p-6 bg-destructive/10 border border-destructive rounded-lg text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">License Activation Required</h2>
          <p className="text-muted-foreground mb-4">
            You need an active license to access Flash features.
          </p>
          <Button asChild>
            <a href="/activation">Activate License</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleSendCustomEmail = async () => {
    if (!customEmailData.to || !customEmailData.subject || !customEmailData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('send-flash-email', {
        body: {
          type: 'custom',
          to: customEmailData.to,
          subject: customEmailData.subject,
          message: customEmailData.message,
          from: user?.email
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Email sent successfully!",
      });

      setCustomEmailData({ to: '', subject: '', message: '', template: 'custom' });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-flashcore-purple to-flashcore-green bg-clip-text text-transparent">
          FlashCore Pro
        </h1>
        <p className="text-xl text-muted-foreground">
          Professional email automation and business tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Billing Email Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowBillingModal(true)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-flashcore-purple" />
              Generate Billing Email
            </CardTitle>
            <CardDescription>
              Create professional billing and invoice emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-flashcore-purple to-flashcore-green">
              Create Billing Email
            </Button>
          </CardContent>
        </Card>

        {/* Receipt Generator Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowReceiptModal(true)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-flashcore-green" />
              Generate Receipt
            </CardTitle>
            <CardDescription>
              Create and send professional receipts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-flashcore-green to-flashcore-purple">
              Create Receipt
            </Button>
          </CardContent>
        </Card>

        {/* Transaction Generator Card */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowTransactionModal(true)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Generate Transaction
            </CardTitle>
            <CardDescription>
              Create transaction confirmations and statements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
              Create Transaction
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Custom Email Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Custom Email
          </CardTitle>
          <CardDescription>
            Compose and send custom emails with professional templates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={customEmailData.to}
                onChange={(e) => setCustomEmailData({ ...customEmailData, to: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select value={customEmailData.template} onValueChange={(value) => setCustomEmailData({ ...customEmailData, template: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="notification">Notification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Email subject"
              value={customEmailData.subject}
              onChange={(e) => setCustomEmailData({ ...customEmailData, subject: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={6}
              value={customEmailData.message}
              onChange={(e) => setCustomEmailData({ ...customEmailData, message: e.target.value })}
            />
          </div>

          <Button onClick={handleSendCustomEmail} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </CardContent>
      </Card>

      {/* Modals */}
      <FlashBillingModal isOpen={showBillingModal} onClose={() => setShowBillingModal(false)} />
      <GenerateReceiptModal isOpen={showReceiptModal} onClose={() => setShowReceiptModal(false)} />
      <GenerateTransactionModal isOpen={showTransactionModal} onClose={() => setShowTransactionModal(false)} />
    </div>
  );
};

export default FlashPage;
