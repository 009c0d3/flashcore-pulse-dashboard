
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AnalyticsData {
  totalUsers: number;
  activeToday: number;
  newSignups: number;
}

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    activeToday: 0,
    newSignups: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    
    try {
      // Fetch user profiles count
      const { count: totalUsers, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      if (countError) throw countError;
      
      // In a real app, we would fetch active users based on session data
      // For now, we'll generate a random number for demonstration
      const activeToday = Math.floor((totalUsers || 0) * 0.6);
      
      // Get new signups in the last 24 hours
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const { count: newSignups, error: newSignupsError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString());
      
      if (newSignupsError) throw newSignupsError;
      
      setAnalytics({
        totalUsers: totalUsers || 0,
        activeToday,
        newSignups: newSignups || 0
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Failed to load analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    analytics,
    isLoading,
    fetchAnalytics
  };
};
