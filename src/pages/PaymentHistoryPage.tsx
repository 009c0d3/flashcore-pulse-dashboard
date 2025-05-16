
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Download, FileText, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const PaymentHistoryPage = () => {
  const paymentData = [
    { id: "INV-2023-001", description: "Premium Subscription", date: "May 1, 2023", amount: "$49.99", status: "Paid", method: "Credit Card" },
    { id: "INV-2023-002", description: "API Credits", date: "Apr 15, 2023", amount: "$19.99", status: "Paid", method: "PayPal" },
    { id: "INV-2023-003", description: "Premium Subscription", date: "Apr 1, 2023", amount: "$49.99", status: "Paid", method: "Credit Card" },
    { id: "INV-2023-004", description: "Child Panel Setup", date: "Mar 25, 2023", amount: "$99.99", status: "Paid", method: "Bank Transfer" },
    { id: "INV-2023-005", description: "Storage Upgrade", date: "Mar 18, 2023", amount: "$29.99", status: "Paid", method: "Credit Card" },
    { id: "INV-2023-006", description: "Premium Subscription", date: "Mar 1, 2023", amount: "$49.99", status: "Paid", method: "Credit Card" },
    { id: "INV-2023-007", description: "Support Extension", date: "Feb 22, 2023", amount: "$39.99", status: "Paid", method: "PayPal" },
    { id: "INV-2023-008", description: "Premium Subscription", date: "Feb 1, 2023", amount: "$49.99", status: "Paid", method: "Credit Card" },
    { id: "INV-2023-009", description: "White Label Add-on", date: "Jan 15, 2023", amount: "$79.99", status: "Paid", method: "Credit Card" },
    { id: "INV-2023-010", description: "Premium Subscription", date: "Jan 1, 2023", amount: "$49.99", status: "Paid", method: "Credit Card" },
  ];
  
  const methodBadgeColor = (method: string) => {
    switch (method) {
      case "Credit Card": return "bg-blue-100 text-blue-800";
      case "PayPal": return "bg-purple-100 text-purple-800";
      case "Bank Transfer": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Spent</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            $519.90
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Subscriptions</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            $349.93
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Add-ons</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            $169.97
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Billing</CardTitle>
          </CardHeader>
          <CardContent className="font-bold">
            <span className="text-3xl">Jun 1, 2023</span>
            <p className="text-sm font-normal text-muted-foreground mt-1">$49.99 - Premium Plan</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your past transactions</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input placeholder="Search invoices..." className="w-full sm:w-[250px]" />
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
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
                <TableHead>Invoice</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>
                    <Badge className={methodBadgeColor(payment.method)}>
                      {payment.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-1" /> View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1 to 10 of 24 entries
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

export default PaymentHistoryPage;
