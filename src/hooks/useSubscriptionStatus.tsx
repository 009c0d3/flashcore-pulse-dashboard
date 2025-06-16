
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const useSubscriptionStatus = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!user?.email) {
        setIsActivated(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('subscribers')
          .select('subscribed, subscription_end')
          .eq('email', user.email)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking subscription:', error);
          setIsActivated(false);
        } else if (data) {
          const isActive = data.subscribed && 
            (!data.subscription_end || new Date(data.subscription_end) > new Date());
          setIsActivated(isActive);
        } else {
          setIsActivated(false);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        setIsActivated(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, [user?.email]);

  return { isActivated, loading };
};
