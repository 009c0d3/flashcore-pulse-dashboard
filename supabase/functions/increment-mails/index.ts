
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { user_id } = await req.json();

    // Increment mails sent and recalculate progress
    const { data, error } = await supabaseClient
      .from('user_progress')
      .select('mails_sent, current_rank')
      .eq('user_id', user_id)
      .single();

    if (error) throw error;

    const newMailCount = (data.mails_sent || 0) + 1;
    let newRank = data.current_rank;
    let newProgress = 0;

    // Update rank based on mail count
    if (newMailCount >= 2000) {
      newRank = 'Diamond';
      newProgress = 100;
    } else if (newMailCount >= 1000) {
      newRank = 'Platinum';
      newProgress = Math.min(100, (newMailCount / 2000) * 100);
    } else if (newMailCount >= 500) {
      newRank = 'Gold';
      newProgress = Math.min(100, (newMailCount / 1000) * 100);
    } else if (newMailCount >= 100) {
      newRank = 'Silver';
      newProgress = Math.min(100, (newMailCount / 500) * 100);
    } else {
      newRank = 'Bronze';
      newProgress = Math.min(100, (newMailCount / 100) * 100);
    }

    // Update the record
    const { error: updateError } = await supabaseClient
      .from('user_progress')
      .update({
        mails_sent: newMailCount,
        current_rank: newRank,
        progress_percentage: Math.round(newProgress),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user_id);

    if (updateError) throw updateError;

    return new Response(
      JSON.stringify({ success: true, newMailCount, newRank, newProgress }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error incrementing mails:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
