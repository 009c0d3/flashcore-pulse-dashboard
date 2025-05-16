
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, MoreVertical, RefreshCw, Power } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChildPanelPage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Child Panels</h1>
          <p className="text-muted-foreground">Manage your reseller child panels</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Panel
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Panels</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            12
            <p className="text-sm font-normal text-muted-foreground mt-1">2 pending activation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            $3,248.50
            <p className="text-sm font-normal text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Resource Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>CPU</span>
                  <span>65%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-flashcore-orange" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory</span>
                  <span>48%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-flashcore-purple" style={{ width: "48%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage</span>
                  <span>32%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-flashcore-green" style={{ width: "32%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Your Child Panels</CardTitle>
              <CardDescription>Manage all your reseller panels</CardDescription>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search panels..." className="max-w-[220px]" />
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Panel Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Renewal</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  name: "SMM Pro Panel",
                  domain: "smmpro.example.com",
                  plan: "Premium",
                  status: "Active",
                  renewal: "2023-05-15",
                },
                {
                  name: "Social Boost",
                  domain: "socialboost.example.com",
                  plan: "Standard",
                  status: "Active",
                  renewal: "2023-04-28",
                },
                {
                  name: "Media Growth",
                  domain: "mediagrowth.example.com", 
                  plan: "Premium",
                  status: "Pending",
                  renewal: "N/A",
                },
                {
                  name: "Viral Engine",
                  domain: "viralengine.example.com",
                  plan: "Standard",
                  status: "Active",
                  renewal: "2023-03-10",
                },
                {
                  name: "Digital Promoter",
                  domain: "digitalpromoter.example.com",
                  plan: "Basic",
                  status: "Expired",
                  renewal: "2023-02-15",
                },
              ].map((panel, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{panel.name}</TableCell>
                  <TableCell>{panel.domain}</TableCell>
                  <TableCell>{panel.plan}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        panel.status === "Active" ? "bg-flashcore-green text-white" :
                        panel.status === "Pending" ? "bg-amber-500 text-white" :
                        "bg-red-500 text-white"
                      }
                    >
                      {panel.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{panel.renewal}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Power className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildPanelPage;
