
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
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    // Check if user is admin
    const { data: profile } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const { action, ...payload } = await req.json();

    let result;
    switch (action) {
      case "create":
        const { subscription_tier, quantity = 1 } = payload;
        const licenses = [];
        
        for (let i = 0; i < quantity; i++) {
          const { data: licenseKey } = await supabaseClient.rpc('generate_license_key');
          const { data } = await supabaseClient
            .from("license_keys")
            .insert({
              key_value: licenseKey,
              subscription_tier,
              status: "pending"
            })
            .select()
            .single();
          licenses.push(data);
        }
        
        // Log admin action
        await supabaseClient.from("admin_logs").insert({
          admin_id: user.id,
          action: "create_license_keys",
          target_table: "license_keys",
          details: { subscription_tier, quantity, created_keys: licenses.map(l => l.key_value) }
        });
        
        result = { licenses };
        break;

      case "list":
        const { data: licenses_list } = await supabaseClient
          .from("license_keys")
          .select("*")
          .order("created_at", { ascending: false });
        result = { licenses: licenses_list };
        break;

      case "update":
        const { id, status } = payload;
        const { data: updated } = await supabaseClient
          .from("license_keys")
          .update({ status, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();
        
        await supabaseClient.from("admin_logs").insert({
          admin_id: user.id,
          action: "update_license_key",
          target_table: "license_keys",
          target_id: id,
          details: { status }
        });
        
        result = { license: updated };
        break;

      case "delete":
        const { id: deleteId } = payload;
        await supabaseClient
          .from("license_keys")
          .delete()
          .eq("id", deleteId);
        
        await supabaseClient.from("admin_logs").insert({
          admin_id: user.id,
          action: "delete_license_key",
          target_table: "license_keys",
          target_id: deleteId
        });
        
        result = { success: true };
        break;

      default:
        throw new Error("Invalid action");
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
