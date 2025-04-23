"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import Pusher from 'pusher-js'
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { downloadCSV } from "@/lib/utils"

interface Donation {
  DonationID: number;
  UserID: number;
  Amount: number;
  DonationDate: string;
  ConfirmationID: string;
  type: string;
  user: {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
  };
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDonation, setNewDonation] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    Amount: 0,
    type: 'One-time donation'
  });

  // Calculate donation statistics
  const totalDonations = donations.reduce((sum, donation) => sum + (donation.Amount || 0), 0);
  const individualDonations = donations.filter(d => d.type === 'One-time donation');
  const corporateDonations = donations.filter(d => d.type === 'Corporate');
  const totalIndividualAmount = individualDonations.reduce((sum, d) => sum + (d.Amount || 0), 0);
  const totalCorporateAmount = corporateDonations.reduce((sum, d) => sum + (d.Amount || 0), 0);
  const goalAmount = 30000; // $30,000 goal
  const progressPercentage = (totalDonations / goalAmount) * 100;

  // Calculate month-over-month change
  const currentDate = new Date();
  const lastMonthDonations = donations.filter(d => {
    const donationDate = new Date(d.DonationDate);
    return donationDate.getMonth() === currentDate.getMonth() &&
           donationDate.getFullYear() === currentDate.getFullYear();
  });
  const previousMonthDonations = donations.filter(d => {
    const donationDate = new Date(d.DonationDate);
    return donationDate.getMonth() === currentDate.getMonth() - 1 &&
           donationDate.getFullYear() === currentDate.getFullYear();
  });
  const currentMonthTotal = lastMonthDonations.reduce((sum, d) => sum + (d.Amount || 0), 0);
  const previousMonthTotal = previousMonthDonations.reduce((sum, d) => sum + (d.Amount || 0), 0);
  const monthlyChange = currentMonthTotal - previousMonthTotal;

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/donations');
        if (!response.ok) {
          throw new Error('Failed to fetch donations');
        }
        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();

    // Initialize Pusher
    const pusher = new Pusher('milesforhope-key', {
      cluster: 'mt1',
      wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      enabledTransports: ['ws']
    });

    // Subscribe to the donations channel
    const channel = pusher.subscribe('donations');
    
    // Listen for new donations
    channel.bind('new-donation', (data: Donation) => {
      setDonations(prev => [data, ...prev]);
      
      // Show notification
      toast.success('New donation received!', {
        description: `${data.user ? `${data.user.FirstName} ${data.user.LastName}` : 'N/A'} donated $${data.Amount}`
      });
    });

    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  const handleAddDonation = async () => {
    try {
      // First, find or create a user
      const userResponse = await fetch('http://localhost:8000/api/users/find-or-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: newDonation.firstName,
          LastName: newDonation.lastName,
          PhoneNumber: newDonation.phoneNumber,
          Email: newDonation.email
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Failed to find or create user');
      }

      const userData = await userResponse.json();
      const userId = userData.UserID;

      // Then create the donation
      const response = await fetch('http://localhost:8000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserID: userId,
          Amount: newDonation.Amount,
          DonationDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
          ConfirmationID: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add donation');
      }

      const data = await response.json();
      
      // Add the new donation to the state with the user data
      const newDonationWithUser = {
        ...data.data,
        type: newDonation.type // Add the type since it's not stored in the database
      };
      
      setDonations(prev => [newDonationWithUser, ...prev]);
      setIsAddDialogOpen(false);
      setNewDonation({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        Amount: 0,
        type: 'One-time donation'
      });
      toast.success('Donation added successfully!');
    } catch (err) {
      console.error('Error adding donation:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to add donation');
    }
  };

  const handleExport = () => {
    // Transform donations data for CSV export
    const exportData = donations.map(donation => ({
      'Donor Name': donation.user ? `${donation.user.FirstName} ${donation.user.LastName}` : 'N/A',
      'Email': donation.user?.Email || 'N/A',
      'Amount': `$${donation.Amount.toFixed(2)}`,
      'Type': donation.type,
      'Date': new Date(donation.DonationDate).toLocaleDateString(),
      'Donation ID': donation.DonationID
    }));

    // Download CSV with current date in filename
    downloadCSV(exportData, `donations-${new Date().toISOString().split('T')[0]}.csv`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading donations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donations</h2>
          <p className="text-muted-foreground">Manage and track all donations for the charity run.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Donation</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Donation</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newDonation.firstName}
                      onChange={(e) => setNewDonation(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newDonation.lastName}
                      onChange={(e) => setNewDonation(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={newDonation.phoneNumber}
                    onChange={(e) => setNewDonation(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newDonation.email}
                    onChange={(e) => setNewDonation(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter donor email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newDonation.Amount || ''}
                    onChange={(e) => setNewDonation(prev => ({ 
                      ...prev, 
                      Amount: e.target.value ? parseFloat(e.target.value) : 0 
                    }))}
                    placeholder="Enter donation amount"
                    min={0}
                    step={0.01}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Donation Type</Label>
                  <select
                    id="type"
                    value={newDonation.type}
                    onChange={(e) => setNewDonation(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="One-time donation">One-time donation</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDonation}>
                  Add Donation
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyChange >= 0 ? '+' : '-'}${Math.abs(monthlyChange).toFixed(2)} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Individual Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIndividualAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{individualDonations.length} donations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corporate Sponsorships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCorporateAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{corporateDonations.length} sponsors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercentage.toFixed(1)}%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div 
                className="h-full rounded-full bg-primary transition-all duration-500" 
                style={{ width: `${Math.min(100, progressPercentage)}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              ${totalDonations.toFixed(2)} of ${goalAmount.toLocaleString()} goal
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
          <CardDescription>A total of {donations.length} donations have been received.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search donations..." className="pl-8" />
            </div>
            <div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation, index) => (
                  <TableRow key={donation.DonationID || `donation-${index}`}>
                    <TableCell className="font-medium">
                      {donation.user ? `${donation.user.FirstName} ${donation.user.LastName}` : 'N/A'}
                    </TableCell>
                    <TableCell>{donation.user?.Email || 'N/A'}</TableCell>
                    <TableCell>{donation.type || 'One-time donation'}</TableCell>
                    <TableCell>${donation.Amount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>
                      {donation.DonationDate ? new Date(donation.DonationDate).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {donations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No donations found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
            <div className="text-sm text-muted-foreground">
              Showing 1-{donations.length} of {donations.length} donations
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Donation Analytics</CardTitle>
          <CardDescription>Insights into donation patterns and trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
              <div className="text-3xl font-bold">${totalDonations.toFixed(2)}</div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Donation Sources</p>
              <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart Placeholder</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

