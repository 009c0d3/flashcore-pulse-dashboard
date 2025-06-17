
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
      case "list":
        const { data: users } = await supabaseClient.auth.admin.listUsers();
        
        // Get additional profile data
        const usersWithProfiles = await Promise.all(
          users.users.map(async (authUser) => {
            const { data: profileData } = await supabaseClient
              .from("profiles")
              .select("role, first_name, last_name")
              .eq("id", authUser.id)
              .single();
            
            const { data: userProfileData } = await supabaseClient
              .from("user_profiles")
              .select("username, phone")
              .eq("user_id", authUser.id)
              .single();

            return {
              ...authUser,
              profiles: profileData,
              user_profiles: userProfileData
            };
          })
        );
        
        result = { users: usersWithProfiles };
        break;

      case "create":
        const { userData } = payload;
        const { data: newUser, error: createError } = await supabaseClient.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          user_metadata: {
            firstName: userData.firstName,
            lastName: userData.lastName
          },
          email_confirm: true
        });

        if (createError) throw createError;

        // Update role if admin
        if (userData.role === 'admin') {
          await supabaseClient
            .from("profiles")
            .update({ role: "admin" })
            .eq("id", newUser.user.id);
        }

        result = { user: newUser.user };
        break;

      case "update":
        const { userId, userData: updateData } = payload;
        
        // Update profile
        await supabaseClient
          .from("profiles")
          .update({
            role: updateData.role,
            first_name: updateData.firstName,
            last_name: updateData.lastName
          })
          .eq("id", userId);

        result = { success: true };
        break;

      case "delete":
        const { userId: deleteUserId } = payload;
        const { error: deleteError } = await supabaseClient.auth.admin.deleteUser(deleteUserId);
        
        if (deleteError) throw deleteError;
        
        result = { success: true };
        break;

      default:
        throw new Error("Invalid action");
    }

    // Log admin action
    await supabaseClient.from("admin_logs").insert({
      admin_id: user.id,
      action: `user_management_${action}`,
      target_table: "auth.users",
      details: payload
    });

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
