
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { DashboardData, MailActivity } from "@/types";

export const useRealDashboardData = () => {
  const { user } = useAuth();

  return useQuery<DashboardData>({
    queryKey: ["realDashboardData", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");

      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch mail activity
      const { data: mailData } = await supabase
        .from('mail_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);

      // Fetch subscription info
      const { data: subscriptionData } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', user.email)
        .single();

      // Transform mail activity data for chart
      const mailActivity: MailActivity[] = (mailData || []).reduce((acc: MailActivity[], mail) => {
        const date = new Date(mail.created_at).toISOString().split('T')[0];
        const existing = acc.find(item => item.date === date);
        
        if (existing) {
          existing.sent += 1;
        } else {
          acc.push({ date, sent: 1 });
        }
        
        return acc;
      }, []).slice(0, 7).reverse();

      // Calculate next level and progress
      const currentRank = progressData?.current_rank || 'Bronze';
      const mailsSent = progressData?.mails_sent || 0;
      const nextLevelMap: { [key: string]: { next: string; needed: number } } = {
        'Bronze': { next: 'Silver', needed: 100 },
        'Silver': { next: 'Gold', needed: 500 },
        'Gold': { next: 'Platinum', needed: 1000 },
        'Platinum': { next: 'Diamond', needed: 2000 }
      };
      
      const nextLevelInfo = nextLevelMap[currentRank] || { next: 'Max Level', needed: 0 };
      const mailsNeeded = Math.max(0, nextLevelInfo.needed - mailsSent);
      const progress = nextLevelInfo.needed > 0 ? Math.min(100, (mailsSent / nextLevelInfo.needed) * 100) : 100;

      return {
        user: {
          username: user.email?.split('@')[0] || 'User',
          avatar: '/placeholder.svg',
          rank: currentRank,
          mailsSent: mailsSent,
          referralCount: progressData?.referral_count || 0,
          referralEarnings: Number(progressData?.referral_earnings) || 0,
          referralLink: `https://flashcore.com/ref/${user.id}`
        },
        plan: {
          name: subscriptionData?.subscription_tier || 'Free',
          amount: subscriptionData?.subscription_tier === 'pro' ? '$49' : '$0',
          expires: subscriptionData?.subscription_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        progress: Math.round(progress),
        nextLevel: nextLevelInfo.next,
        mailsNeeded,
        walletBalance: `$${Number(progressData?.total_earnings).toFixed(2)}`,
        totalMails: mailsSent,
        mailActivity
      };
    },
    enabled: !!user,
    staleTime: 30000,
    refetchInterval: 60000
  });
};
