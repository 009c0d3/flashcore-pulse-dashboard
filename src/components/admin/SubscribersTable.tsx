
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SubscribersTableProps {
  subscribers: any[];
}

const SubscribersTable: React.FC<SubscribersTableProps> = ({ subscribers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscribers</CardTitle>
        <CardDescription>Current subscription status of all users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Expires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber: any) => (
              <TableRow key={subscriber.id}>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>
                  <Badge variant={subscriber.subscribed ? "default" : "secondary"}>
                    {subscriber.subscribed ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{subscriber.subscription_tier || "None"}</TableCell>
                <TableCell>
                  {subscriber.subscription_end ? new Date(subscriber.subscription_end).toLocaleDateString() : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SubscribersTable;
