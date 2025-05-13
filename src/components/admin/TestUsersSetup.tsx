
import React, { useState } from "react";
import { setupTestUsers } from "@/utils/setupTestUsers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check } from "lucide-react";
import { toast } from "sonner";

const TestUsersSetup: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [testUsers, setTestUsers] = useState<{
    regularUser?: {email: string, password: string},
    adminUser?: {email: string, password: string}
  }>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleSetupTestUsers = async () => {
    try {
      setIsCreating(true);
      const users = await setupTestUsers();
      setTestUsers(users);
      setIsComplete(true);
      toast.success("Test users created successfully");
    } catch (error) {
      console.error("Error setting up test users:", error);
      toast.error("Failed to create test users");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Users Setup</CardTitle>
        <CardDescription>
          Create test users for development purposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isComplete ? (
            <>
              <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-900">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="font-medium text-green-800 dark:text-green-400">
                    Test users created successfully
                  </p>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You can use these credentials to log in:
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Admin User:</h3>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {testUsers.adminUser?.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Password:</span> {testUsers.adminUser?.password}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Regular User:</h3>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {testUsers.regularUser?.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Password:</span> {testUsers.regularUser?.password}
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-200 dark:border-amber-900">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <p className="font-medium text-amber-800 dark:text-amber-400">
                    Important Note
                  </p>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  These users need email verification. You may need to disable email verification in the Supabase dashboard or use the email confirmation link from the console logs.
                </p>
              </div>
            </>
          ) : (
            <p>
              Click the button below to create test users. This will create one regular user and one admin user with predefined credentials.
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {!isComplete && (
          <Button 
            onClick={handleSetupTestUsers} 
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? "Creating Users..." : "Create Test Users"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TestUsersSetup;
