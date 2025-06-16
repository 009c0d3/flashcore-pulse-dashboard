
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Key, CheckCircle } from "lucide-react";

const LicenseActivation = () => {
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);
  const { toast } = useToast();

  const activateLicense = async () => {
    if (!licenseKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a license key",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('activate-license', {
        body: { license_key: licenseKey.trim() }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Success!",
          description: `License activated successfully! You now have ${data.tier} access.`,
        });
        setActivated(true);
        setLicenseKey("");
      } else {
        toast({
          title: "Activation Failed",
          description: data.message || "Invalid license key",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to activate license key",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (activated) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-semibold">License Activated!</h3>
            <p className="text-muted-foreground">
              Your license has been successfully activated. You can now access all premium features.
            </p>
            <Button onClick={() => setActivated(false)} variant="outline">
              Activate Another License
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Key className="w-6 h-6" />
          <CardTitle>Activate License Key</CardTitle>
        </div>
        <CardDescription>
          Enter your license key to activate your subscription
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="license">License Key</Label>
          <Input
            id="license"
            placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value.toUpperCase())}
            className="font-mono"
          />
        </div>
        <Button
          onClick={activateLicense}
          disabled={loading || !licenseKey.trim()}
          className="w-full"
        >
          {loading ? "Activating..." : "Activate License"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          License keys are provided after purchase or can be obtained from your administrator.
        </p>
      </CardContent>
    </Card>
  );
};

export default LicenseActivation;
