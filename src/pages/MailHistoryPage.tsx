
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronLeft, ChevronRight, Download, RefreshCw, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MailHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const emailData = [
    { id: 1, recipient: "john.doe@example.com", subject: "Your monthly report is ready", date: "May 15, 2023", status: "Delivered" },
    { id: 2, recipient: "jane.smith@example.com", subject: "Account verification", date: "May 10, 2023", status: "Opened" },
    { id: 3, recipient: "robert.johnson@example.com", subject: "Welcome to FlashCore", date: "May 5, 2023", status: "Clicked" },
    { id: 4, recipient: "sarah.williams@example.com", subject: "Your subscription is expiring soon", date: "May 3, 2023", status: "Delivered" },
    { id: 5, recipient: "michael.brown@example.com", subject: "Security alert: New login", date: "May 1, 2023", status: "Opened" },
    { id: 6, recipient: "emily.davis@example.com", subject: "Invoice for April 2023", date: "Apr 30, 2023", status: "Clicked" },
    { id: 7, recipient: "david.miller@example.com", subject: "Your feature request update", date: "Apr 28, 2023", status: "Bounced" },
    { id: 8, recipient: "lisa.wilson@example.com", subject: "API usage summary", date: "Apr 25, 2023", status: "Delivered" },
    { id: 9, recipient: "james.taylor@example.com", subject: "Scheduled maintenance notification", date: "Apr 22, 2023", status: "Opened" },
    { id: 10, recipient: "emma.anderson@example.com", subject: "Your support ticket has been resolved", date: "Apr 20, 2023", status: "Delivered" },
  ];
  
  const statusBadgeColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-blue-100 text-blue-800";
      case "Opened": return "bg-green-100 text-green-800";
      case "Clicked": return "bg-purple-100 text-purple-800";
      case "Bounced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mail History</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Email Communications</CardTitle>
              <CardDescription>View and track all sent emails</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="opened">Opened</SelectItem>
                    <SelectItem value="clicked">Clicked</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailData.map((email) => (
                <TableRow key={email.id}>
                  <TableCell className="font-medium">{email.id}</TableCell>
                  <TableCell>{email.recipient}</TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>{email.date}</TableCell>
                  <TableCell>
                    <Badge className={statusBadgeColor(email.status)}>
                      {email.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1 to 10 of 54 entries
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MailHistoryPage;
