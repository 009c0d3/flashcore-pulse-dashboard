
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LicenseManagementProps {
  licenses: any[];
  onRefresh: () => void;
}

const LicenseManagement: React.FC<LicenseManagementProps> = ({ licenses, onRefresh }) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newLicenseData, setNewLicenseData] = useState({
    subscription_tier: "basic",
    quantity: 1
  });
  const { toast } = useToast();

  const createLicenses = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-manage-licenses', {
        body: {
          action: 'create',
          subscription_tier: newLicenseData.subscription_tier,
          quantity: newLicenseData.quantity
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Created ${newLicenseData.quantity} license key(s)`,
      });

      setCreateDialogOpen(false);
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create license keys",
        variant: "destructive"
      });
    }
  };

  const updateLicenseStatus = async (id: string, status: string) => {
    try {
      await supabase.functions.invoke('admin-manage-licenses', {
        body: {
          action: 'update',
          id,
          status
        }
      });

      toast({
        title: "Success",
        description: "License status updated",
      });

      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update license status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "destructive" | "outline" | "secondary" } = {
      active: "default",
      pending: "secondary",
      expired: "destructive",
      suspended: "outline"
    };
    const variant = variants[status] || "outline";
    return <Badge variant={variant}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>License Keys</CardTitle>
            <CardDescription>Manage license keys for different subscription tiers</CardDescription>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create License Keys</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create License Keys</DialogTitle>
                <DialogDescription>Generate new license keys for users</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tier" className="text-right">Tier</Label>
                  <Select value={newLicenseData.subscription_tier} onValueChange={(value) => setNewLicenseData({...newLicenseData, subscription_tier: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={newLicenseData.quantity}
                    onChange={(e) => setNewLicenseData({...newLicenseData, quantity: parseInt(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={createLicenses}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>License Key</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {licenses.map((license: any) => (
              <TableRow key={license.id}>
                <TableCell className="font-mono text-sm">{license.key_value}</TableCell>
                <TableCell>{license.subscription_tier}</TableCell>
                <TableCell>{getStatusBadge(license.status)}</TableCell>
                <TableCell>{new Date(license.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Select onValueChange={(value) => updateLicenseStatus(license.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Update" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LicenseManagement;
