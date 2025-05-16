
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MessageCircle, ThumbsUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeatureRequestPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Feature Requests</h1>
          <p className="text-muted-foreground">Suggest new features and vote on existing ones</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Request
        </Button>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="my">My Requests</TabsTrigger>
              <TabsTrigger value="planned">Planned</TabsTrigger>
            </TabsList>
            <Input placeholder="Search requests..." className="max-w-xs" />
          </div>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-4">
              {[
                {
                  title: "Dark Mode Support",
                  description: "Add a toggle for dark mode across all panels and dashboards",
                  status: "Planned",
                  votes: 124,
                  comments: 15,
                  isNew: true,
                },
                {
                  title: "Mobile App Integration",
                  description: "Create a mobile app to manage services on the go",
                  status: "Under Review",
                  votes: 98,
                  comments: 23,
                },
                {
                  title: "Bulk Import/Export",
                  description: "Allow bulk operations for user management and service configuration",
                  status: "Implemented",
                  votes: 86,
                  comments: 8,
                },
                {
                  title: "Enhanced Analytics Dashboard",
                  description: "More detailed analytics with custom date ranges and export options",
                  status: "Planned",
                  votes: 75,
                  comments: 12,
                },
                {
                  title: "Multiple Payment Gateways",
                  description: "Support for more payment providers like Stripe, PayPal, and crypto",
                  status: "Under Review",
                  votes: 62,
                  comments: 19,
                  isNew: true,
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {feature.title}
                          {feature.isNew && (
                            <Badge className="ml-2 bg-flashcore-purple text-white">New</Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">{feature.description}</CardDescription>
                      </div>
                      <Badge 
                        className={
                          feature.status === "Implemented" ? "bg-flashcore-green text-white" :
                          feature.status === "Planned" ? "bg-flashcore-purple text-white" :
                          "bg-flashcore-orange text-white"
                        }
                      >
                        {feature.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-1">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{feature.votes}</span>
                      </Button>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{feature.comments}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* We'll just display content for the "all" tab for now */}
          {["popular", "my", "planned"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">
                    {tab === "popular" && "Popular feature requests will be shown here."}
                    {tab === "my" && "Your submitted feature requests will be shown here."}
                    {tab === "planned" && "Features planned for implementation will be shown here."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Submit a Feature Request</CardTitle>
          <CardDescription>Share your idea with our team</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Feature Title</label>
              <Input id="title" placeholder="Enter a clear title for your feature request" />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea 
                id="description" 
                placeholder="Describe the feature and how it would help you"
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="useCase" className="text-sm font-medium">Use Case</label>
              <Textarea 
                id="useCase" 
                placeholder="Explain how you would use this feature"
                rows={3}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Submit Request</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeatureRequestPage;
