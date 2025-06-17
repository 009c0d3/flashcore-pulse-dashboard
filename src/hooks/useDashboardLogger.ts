
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useDashboardLogger = () => {
  const { user } = useAuth();

  const logActivity = async (action: string, details?: any) => {
    if (!user) return;

    try {
      await supabase.from('dashboard_logs').insert({
        user_id: user.id,
        action,
        details,
        ip_address: null, // Client-side IP detection would require external service
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log dashboard activity:', error);
    }
  };

  return { logActivity };
};
