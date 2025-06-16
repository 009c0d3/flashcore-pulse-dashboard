
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

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { email, password, firstName, lastName } = await req.json();

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Create the user
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        firstName: firstName || "Admin",
        lastName: lastName || "User"
      },
      email_confirm: true
    });

    if (authError) throw authError;

    if (!authData.user) {
      throw new Error("Failed to create user");
    }

    // Update the user's profile to set admin role
    const { error: profileError } = await supabaseClient
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", authData.user.id);

    if (profileError) {
      console.error("Profile update error:", profileError);
      throw new Error("Failed to set admin role");
    }

    // Log the admin creation
    await supabaseClient.from("admin_logs").insert({
      admin_id: authData.user.id,
      action: "admin_user_created",
      target_table: "profiles",
      target_id: authData.user.id,
      details: { email, created_by: "system" }
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin user created successfully",
        user_id: authData.user.id,
        email: authData.user.email
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating admin user:", errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
