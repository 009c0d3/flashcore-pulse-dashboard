
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Users, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setStatus('sending');

    try {
      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: {
          to: formData.to,
          subject: formData.subject,
          message: formData.message,
          from: user.email
        }
      });

      if (error) throw error;

      // Log the email activity
      await supabase.from('mail_activity').insert({
        user_id: user.id,
        email_type: 'custom',
        recipient_email: formData.to,
        status: 'sent',
        details: {
          subject: formData.subject,
          message: formData.message
        }
      });

      // Update user progress via edge function
      await supabase.functions.invoke('increment-mails', {
        body: { user_id: user.id }
      });

      setStatus('success');
      toast({
        title: "Email Sent Successfully!",
        description: "Your email has been delivered.",
      });

      setTimeout(() => {
        onClose();
        setFormData({ to: '', subject: '', message: '' });
        setStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
      toast({
        title: "Failed to Send Email",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Loader2 className="w-6 h-6 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Mail className="w-6 h-6 text-flashcore-purple" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'sending':
        return 'Sending your email...';
      case 'success':
        return 'Email sent successfully!';
      case 'error':
        return 'Failed to send email';
      default:
        return 'Compose your email';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon()}
            <span>{getStatusMessage()}</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="email"
              placeholder="recipient@example.com"
              value={formData.to}
              onChange={(e) => setFormData(prev => ({ ...prev, to: e.target.value }))}
              required
              disabled={isLoading || status === 'success'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter email subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              required
              disabled={isLoading || status === 'success'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={8}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
              disabled={isLoading || status === 'success'}
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Email will be tracked in your activity</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || status === 'success'}
                className="bg-gradient-to-r from-flashcore-purple to-flashcore-green"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailComposer;
