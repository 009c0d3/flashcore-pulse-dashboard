import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Book, Star, Clock, CheckCircle } from "lucide-react";

const TutorialPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">Tutorials</h1>
      <p className="text-muted-foreground mb-6">Learn how to use the platform with our step-by-step guides</p>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Tutorials</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Getting Started Guide",
                description: "Learn the basics of using the dashboard and setting up your account",
                category: "Beginner",
                duration: "10 min",
                isNew: true,
                completed: false,
              },
              {
                title: "Setting Up Your First Child Panel",
                description: "Create and configure your first reseller panel step by step",
                category: "Beginner",
                duration: "15 min",
                isNew: false,
                completed: false,
              },
              {
                title: "Creating Service Packages",
                description: "Learn how to build and price service packages for your clients",
                category: "Intermediate",
                duration: "12 min",
                isNew: false,
                completed: true,
              },
              {
                title: "API Integration Guide",
                description: "Connect external services using our robust API endpoints",
                category: "Advanced",
                duration: "20 min",
                isNew: false,
                completed: false,
              },
              {
                title: "White Label Configuration",
                description: "Customize your panels with your own branding and design",
                category: "Intermediate",
                duration: "18 min",
                isNew: true,
                completed: false,
              },
              {
                title: "Advanced User Management",
                description: "Set up roles, permissions and manage user accounts",
                category: "Advanced",
                duration: "25 min",
                isNew: false,
                completed: false,
              },
            ].map((tutorial, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="relative h-48 bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-5 w-5" />
                    </Button>
                  </div>
                  {tutorial.isNew && (
                    <Badge className="absolute top-2 right-2 bg-flashcore-purple text-white">
                      New
                    </Badge>
                  )}
                  {tutorial.completed && (
                    <div className="absolute bottom-2 right-2 bg-flashcore-green text-white rounded-full p-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className={
                      tutorial.category === "Beginner" ? "border-green-500 text-green-700" :
                      tutorial.category === "Intermediate" ? "border-blue-500 text-blue-700" :
                      "border-purple-500 text-purple-700"
                    }>
                      {tutorial.category}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <Star className="h-4 w-4 mr-1 text-amber-500" />
                    <Star className="h-4 w-4 mr-1 text-muted" />
                    <span className="ml-1">(24)</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={tutorial.completed ? "outline" : "default"}>
                    {tutorial.completed ? "Watch Again" : "Start Learning"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Other tabs would follow the same pattern */}
        {["beginner", "intermediate", "advanced"].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">
                  {tab === "beginner" && "Beginner tutorials will be shown here."}
                  {tab === "intermediate" && "Intermediate tutorials will be shown here."}
                  {tab === "advanced" && "Advanced tutorials will be shown here."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
          <CardDescription>Documentation, guides, and reference materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-6 justify-start text-left">
              <div className="mr-4 p-2 rounded-md bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Developer Documentation</h3>
                <p className="text-sm text-muted-foreground">Complete API reference and implementation guides</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start text-left">
              <div className="mr-4 p-2 rounded-md bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">User Guides</h3>
                <p className="text-sm text-muted-foreground">Step-by-step instructions for platform features</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start text-left">
              <div className="mr-4 p-2 rounded-md bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Best Practices</h3>
                <p className="text-sm text-muted-foreground">Recommendations for optimal platform usage</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto py-6 justify-start text-left">
              <div className="mr-4 p-2 rounded-md bg-primary/10">
                <Book className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">FAQ</h3>
                <p className="text-sm text-muted-foreground">Answers to common questions and troubleshooting</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialPage;
