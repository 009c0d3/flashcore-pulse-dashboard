
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Users, Key, CreditCard, Shield } from "lucide-react";

const AdminDashboard = () => {
  const [licenses, setLicenses] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newLicenseData, setNewLicenseData] = useState({
    subscription_tier: "basic",
    quantity: 1
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch licenses
      const { data } = await supabase.functions.invoke('admin-manage-licenses', {
        body: { action: 'list' }
      });
      
      if (data?.licenses) setLicenses(data.licenses);

      // Fetch subscribers
      const { data: subsData } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      if (subsData) setSubscribers(subsData);

      // Fetch orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (ordersData) setOrders(ordersData);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch admin data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
      fetchData();
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

      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update license status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      pending: "secondary",
      expired: "destructive",
      suspended: "outline"
    };
    return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Shield className="w-8 h-8 text-primary" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licenses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.filter(s => s.subscribed).length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orders.reduce((sum, order) => sum + (order.amount / 100), 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* License Keys Management */}
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

      {/* Subscribers */}
      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
          <CardDescription>Current subscription status of all users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Expires</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((subscriber: any) => (
                <TableRow key={subscriber.id}>
                  <TableCell>{subscriber.email}</TableCell>
                  <TableCell>
                    <Badge variant={subscriber.subscribed ? "default" : "secondary"}>
                      {subscriber.subscribed ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscriber.subscription_tier || "None"}</TableCell>
                  <TableCell>
                    {subscriber.subscription_end ? new Date(subscriber.subscription_end).toLocaleDateString() : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
