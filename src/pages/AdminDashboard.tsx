
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import LicenseManagement from "@/components/admin/LicenseManagement";
import SubscribersTable from "@/components/admin/SubscribersTable";

const AdminDashboard = () => {
  const [licenses, setLicenses] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <AdminHeader />
      <AdminStatsCards licenses={licenses} subscribers={subscribers} orders={orders} />
      <LicenseManagement licenses={licenses} onRefresh={fetchData} />
      <SubscribersTable subscribers={subscribers} />
    </div>
  );
};

export default AdminDashboard;
