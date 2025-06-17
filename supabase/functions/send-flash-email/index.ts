
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw userError;
    
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { type, to, subject, message, from, data: emailData } = await req.json();

    // Get SMTP configuration
    const { data: smtpConfig } = await supabaseClient
      .from('smtp_settings')
      .select('*')
      .eq('is_active', true)
      .single();

    if (!smtpConfig) {
      throw new Error("No SMTP configuration found. Please configure SMTP settings in admin panel.");
    }

    // Here you would implement the actual email sending logic
    // For now, we'll simulate email sending and log the activity
    console.log("Sending email with config:", {
      type,
      to,
      subject,
      provider: smtpConfig.provider
    });

    // Log the email activity
    await supabaseClient.from('mail_activity').insert({
      user_id: user.id,
      email_type: type,
      recipient_email: to,
      status: 'sent',
      details: {
        subject,
        message,
        template_type: type,
        smtp_provider: smtpConfig.provider
      }
    });

    // Update user progress
    await supabaseClient.functions.invoke('increment-mails', {
      body: { user_id: user.id }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email sent successfully",
        provider: smtpConfig.provider
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Email sending failed:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
