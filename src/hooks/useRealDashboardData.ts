
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

      console.log('Fetching dashboard data for user:', user.id);

      // Fetch user progress - use maybeSingle to handle case where no record exists
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (progressError) {
        console.error('Error fetching progress:', progressError);
      }

      // If no progress record exists, create one
      if (!progressData) {
        console.log('No progress record found, creating one...');
        const { data: newProgress, error: insertError } = await supabase
          .from('user_progress')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating progress record:', insertError);
        } else {
          console.log('Created new progress record:', newProgress);
        }
      }

      // Fetch mail activity
      const { data: mailData, error: mailError } = await supabase
        .from('mail_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(30);

      if (mailError) {
        console.error('Error fetching mail data:', mailError);
      }

      // Fetch subscription info
      const { data: subscriptionData, error: subError } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', user.email)
        .maybeSingle();

      if (subError) {
        console.error('Error fetching subscription:', subError);
      }

      // Use either fetched or newly created progress data
      const progress = progressData || {
        current_rank: 'Bronze',
        mails_sent: 0,
        referral_count: 0,
        referral_earnings: 0,
        total_earnings: 0
      };

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
      const currentRank = progress.current_rank || 'Bronze';
      const mailsSent = progress.mails_sent || 0;
      const nextLevelMap: { [key: string]: { next: string; needed: number } } = {
        'Bronze': { next: 'Silver', needed: 100 },
        'Silver': { next: 'Gold', needed: 500 },
        'Gold': { next: 'Platinum', needed: 1000 },
        'Platinum': { next: 'Diamond', needed: 2000 }
      };
      
      const nextLevelInfo = nextLevelMap[currentRank] || { next: 'Max Level', needed: 0 };
      const mailsNeeded = Math.max(0, nextLevelInfo.needed - mailsSent);
      const progressPercentage = nextLevelInfo.needed > 0 ? Math.min(100, (mailsSent / nextLevelInfo.needed) * 100) : 100;

      const dashboardData = {
        user: {
          username: user.email?.split('@')[0] || 'User',
          avatar: '/placeholder.svg',
          rank: currentRank,
          mailsSent: mailsSent,
          referralCount: progress.referral_count || 0,
          referralEarnings: Number(progress.referral_earnings) || 0,
          referralLink: `https://flashcore.com/ref/${user.id}`
        },
        plan: {
          name: subscriptionData?.subscription_tier || 'Free',
          amount: subscriptionData?.subscription_tier === 'pro' ? '$49' : '$0',
          expires: subscriptionData?.subscription_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        progress: Math.round(progressPercentage),
        nextLevel: nextLevelInfo.next,
        mailsNeeded,
        walletBalance: `$${Number(progress.total_earnings || 0).toFixed(2)}`,
        totalMails: mailsSent,
        mailActivity
      };

      console.log('Dashboard data prepared:', dashboardData);
      return dashboardData;
    },
    enabled: !!user,
    staleTime: 30000,
    refetchInterval: 60000,
    retry: 1
  });
};
