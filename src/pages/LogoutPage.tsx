
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Logout Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate("/login");
    }
  };
  
  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card className="mt-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Logout Confirmation</CardTitle>
          <CardDescription>Are you sure you want to log out?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <p>You will need to login again to access your account.</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Yes, Log me out
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogoutPage;
