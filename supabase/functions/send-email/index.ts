
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  message: string;
  from: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, message, from }: EmailRequest = await req.json();

    // For demo purposes, we'll simulate email sending
    // In production, you would integrate with a service like Resend, SendGrid, etc.
    console.log('Sending email:', { to, subject, from });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate 95% success rate
    if (Math.random() < 0.95) {
      return new Response(
        JSON.stringify({ success: true, message: 'Email sent successfully' }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    } else {
      throw new Error('Simulated email sending failure');
    }

  } catch (error: any) {
    console.error("Error in send-email function:", error);
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
