import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const ActivationPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Activation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subscription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge className="bg-flashcore-green text-white mr-2">Active</Badge>
              <span className="text-sm text-muted-foreground">Premium Plan</span>
            </div>
            <p className="text-2xl font-bold mt-2">45 days</p>
            <p className="text-sm text-muted-foreground">remaining</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>API Calls</span>
                  <span>756 / 1000</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-flashcore-purple" style={{ width: "75.6%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>2.4 GB / 5 GB</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-flashcore-orange" style={{ width: "48%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-flashcore-green mr-2" />
                <span>Premium Support</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-flashcore-green mr-2" />
                <span>API Access</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-flashcore-green mr-2" />
                <span>Advanced Analytics</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-flashcore-green mr-2" />
                <span>White Label</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Activation History</CardTitle>
          <CardDescription>Your license activation and renewal history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">License Key</th>
                  <th className="text-left py-3 px-4 font-medium">Activation Date</th>
                  <th className="text-left py-3 px-4 font-medium">Expiry Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-mono">FC-PRO-4829-XXXX-XXXX</td>
                  <td className="py-3 px-4">2023-03-15</td>
                  <td className="py-3 px-4">2023-06-15</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-flashcore-green text-white">Active</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-mono">FC-PRO-3672-XXXX-XXXX</td>
                  <td className="py-3 px-4">2022-12-15</td>
                  <td className="py-3 px-4">2023-03-15</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">Expired</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono">FC-STD-2188-XXXX-XXXX</td>
                  <td className="py-3 px-4">2022-09-15</td>
                  <td className="py-3 px-4">2022-12-15</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">Expired</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activate New License</CardTitle>
            <CardDescription>Have a new license key? Activate it here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter your license key" className="font-mono" />
              <Button>Activate</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upgrade Your Plan</CardTitle>
            <CardDescription>Get more features with our premium plans</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Business Plan</h4>
                <p className="text-sm text-muted-foreground">For growing businesses</p>
              </div>
              <Button variant="outline">
                Upgrade <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">Enterprise Plan</h4>
                <p className="text-sm text-muted-foreground">For large organizations</p>
              </div>
              <Button variant="outline">
                Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivationPage;
