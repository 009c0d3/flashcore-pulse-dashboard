
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReferEarnPage = () => {
  const { toast } = useToast();
  const referralCode = "FLASH-AM2023";
  const referralLink = `https://flashcore.app/refer?code=${referralCode}`;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Code Copied!",
      description: "Referral code has been copied to clipboard.",
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link has been copied to clipboard.",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Refer & Earn</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
            <CardDescription>Share this code with friends to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input value={referralCode} readOnly className="font-mono text-lg" />
              <Button variant="outline" size="icon" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input value={referralLink} readOnly className="font-mono text-xs" />
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <Button className="w-full mt-4">
              <Share2 className="mr-2 h-4 w-4" /> Share with Friends
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rewards Earned</CardTitle>
            <CardDescription>Track your referral rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Referrals</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Pending Rewards</span>
                <span className="font-semibold text-amber-500">$25.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Earned</span>
                <span className="font-semibold text-flashcore-green">$125.00</span>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden mt-4">
                <div 
                  className="h-full bg-gradient-to-r from-flashcore-purple to-flashcore-green animate-progress-fill" 
                  style={{ "--progress-width": "60%" } as React.CSSProperties} 
                />
              </div>
              <div className="text-sm text-muted-foreground text-center">
                3 more referrals to reach next tier
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Referrals</CardTitle>
            <CardDescription>People who joined using your code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Name</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-right py-3 px-4 font-medium">Reward</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "John Smith", date: "2023-05-12", status: "Completed", reward: "$15.00" },
                    { name: "Sarah Johnson", date: "2023-04-28", status: "Completed", reward: "$15.00" },
                    { name: "Michael Brown", date: "2023-04-15", status: "Pending", reward: "$15.00" },
                    { name: "Emily Davis", date: "2023-03-30", status: "Completed", reward: "$15.00" },
                  ].map((referral, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="py-3 px-4">{referral.name}</td>
                      <td className="py-3 px-4">{referral.date}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          referral.status === "Completed" 
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium">{referral.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferEarnPage;
