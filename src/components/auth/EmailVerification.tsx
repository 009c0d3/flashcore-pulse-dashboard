
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface EmailVerificationProps {
  onClose: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { sendVerification } = useAuth();

  const handleResendVerification = async () => {
    if (!email.trim()) return;
    
    setIsSending(true);
    try {
      await sendVerification(email);
      // No need to close, user will see the toast
    } catch (error) {
      console.error("Error sending verification email:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Email Verification</CardTitle>
        <CardDescription>
          Resend your verification email to activate your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Your account needs to be verified before you can log in. Please enter your email to resend the verification link.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Your email address"
              className="pl-9"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleResendVerification}
              disabled={isSending || !email.trim()} 
              className="flex-1"
            >
              {isSending ? "Sending..." : "Resend Verification"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
