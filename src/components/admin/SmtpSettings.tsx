
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Save, TestTube } from "lucide-react";

interface SmtpConfig {
  id?: string;
  provider: string;
  host: string;
  port: number;
  username: string;
  password: string;
  from_email: string;
  from_name: string;
  is_active: boolean;
}

const SmtpSettings = () => {
  const [config, setConfig] = useState<SmtpConfig>({
    provider: 'smtp',
    host: '',
    port: 587,
    username: '',
    password: '',
    from_email: '',
    from_name: '',
    is_active: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSmtpSettings();
  }, []);

  const fetchSmtpSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('smtp_settings')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching SMTP settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSmtpSettings = async () => {
    setSaving(true);
    try {
      // Deactivate all existing configs
      await supabase
        .from('smtp_settings')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Insert or update current config
      const { data, error } = await supabase
        .from('smtp_settings')
        .upsert({
          ...config,
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setConfig(data);
      toast({
        title: "Success",
        description: "SMTP settings saved successfully",
      });
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      toast({
        title: "Error",
        description: "Failed to save SMTP settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const testSmtpConnection = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('test-smtp', {
        body: { config }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "SMTP connection test successful",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "SMTP connection test failed",
        variant: "destructive"
      });
    }
  };

  const getProviderDefaults = (provider: string) => {
    const defaults: { [key: string]: Partial<SmtpConfig> } = {
      gmail: { host: 'smtp.gmail.com', port: 587 },
      outlook: { host: 'smtp-mail.outlook.com', port: 587 },
      yahoo: { host: 'smtp.mail.yahoo.com', port: 587 },
      mailgun: { host: 'smtp.mailgun.org', port: 587 },
      sendgrid: { host: 'smtp.sendgrid.net', port: 587 },
      smtp: { host: '', port: 587 }
    };
    return defaults[provider] || defaults.smtp;
  };

  const handleProviderChange = (provider: string) => {
    const defaults = getProviderDefaults(provider);
    setConfig({ ...config, provider, ...defaults });
  };

  if (loading) {
    return <div className="p-6">Loading SMTP settings...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-5 h-5" />
          SMTP Configuration
        </CardTitle>
        <CardDescription>
          Configure email sending settings for the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Email Provider</Label>
            <Select value={config.provider} onValueChange={handleProviderChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gmail">Gmail</SelectItem>
                <SelectItem value="outlook">Outlook</SelectItem>
                <SelectItem value="yahoo">Yahoo</SelectItem>
                <SelectItem value="mailgun">Mailgun</SelectItem>
                <SelectItem value="sendgrid">SendGrid</SelectItem>
                <SelectItem value="smtp">Custom SMTP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_active">Active Configuration</Label>
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                checked={config.is_active}
                onCheckedChange={(checked) => setConfig({ ...config, is_active: checked })}
              />
              <span className="text-sm text-muted-foreground">
                {config.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host">SMTP Host</Label>
            <Input
              id="host"
              value={config.host}
              onChange={(e) => setConfig({ ...config, host: e.target.value })}
              placeholder="smtp.example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="port">Port</Label>
            <Input
              id="port"
              type="number"
              value={config.port}
              onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={config.password}
              onChange={(e) => setConfig({ ...config, password: e.target.value })}
              placeholder="Your app password"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from_email">From Email</Label>
            <Input
              id="from_email"
              type="email"
              value={config.from_email}
              onChange={(e) => setConfig({ ...config, from_email: e.target.value })}
              placeholder="noreply@yourcompany.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="from_name">From Name</Label>
            <Input
              id="from_name"
              value={config.from_name}
              onChange={(e) => setConfig({ ...config, from_name: e.target.value })}
              placeholder="Your Company Name"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button onClick={saveSmtpSettings} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
          
          <Button variant="outline" onClick={testSmtpConnection}>
            <TestTube className="w-4 h-4 mr-2" />
            Test Connection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmtpSettings;
