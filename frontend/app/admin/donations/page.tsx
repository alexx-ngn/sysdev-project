"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown, Pencil, Trash2, Check } from "lucide-react"
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
import { getApiUrl } from '../../config/api'

interface Donation {
  DonationID: number;
  UserID: number;
  user: {
    FirstName: string;
    LastName: string;
    Email: string;
  };
  Amount: number;
  DonationDate: string;
  ConfirmationID: string;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [newDonation, setNewDonation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    Amount: 0
  });
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());

  // Calculate donation statistics
  const totalDonations = donations.reduce((sum, donation) => sum + (donation.Amount || 0), 0);
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
  const goalAmount = 30000; // $30,000 goal
  const progressPercentage = (totalDonations / goalAmount) * 100;

  // Move fetchDonations to component scope so it can be called from anywhere
  const fetchDonations = async () => {
    try {
      const response = await fetch(getApiUrl('/donations'));
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

  useEffect(() => {
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
      
      // Generate a unique notification ID
      const notificationId = `donation-${data.DonationID}-${Date.now()}`;
      
      // Show notification with mark as read button
      const donorName = data.user ? `${data.user.FirstName} ${data.user.LastName}` : 'Anonymous';
      toast.success('New donation received!', {
        description: (
          <div className="flex items-center justify-between gap-4">
            <span>{`${donorName} donated $${data.Amount.toFixed(2)}`}</span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => {
                setReadNotifications(prev => new Set([...Array.from(prev), notificationId]));
                toast.dismiss();
              }}
            >
              <Check className="h-4 w-4" />
              <span className="ml-2">Mark as read</span>
            </Button>
          </div>
        ),
        id: notificationId,
        duration: readNotifications.has(notificationId) ? 0 : 5000,
      });
    });

    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [readNotifications]);

  const handleAddDonation = async () => {
    try {
      // Validate inputs
      if (!newDonation.firstName.trim()) {
        throw new Error('First name is required');
      }
      if (!newDonation.lastName.trim()) {
        throw new Error('Last name is required');
      }
      if (!newDonation.email.trim()) {
        throw new Error('Email is required');
      }
      if (!newDonation.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error('Please enter a valid email address');
      }
      if (!newDonation.Amount || newDonation.Amount <= 0) {
        throw new Error('Please enter a valid donation amount');
      }

      // First, create or find the user
      const userResponse = await fetch(getApiUrl('/users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          FirstName: newDonation.firstName.trim(),
          LastName: newDonation.lastName.trim(),
          Email: newDonation.email.trim(),
          PhoneNumber: newDonation.phoneNumber.trim()
        }),
      });

      const userData = await userResponse.json();
      
      if (!userResponse.ok) {
        throw new Error(userData.message || userData.error || 'Failed to create user');
      }

      // Now create the donation with the user ID
      const donationData = {
        UserID: userData.UserID,
        Amount: parseFloat(newDonation.Amount.toString()),
        DonationDate: new Date().toISOString(),
        ConfirmationID: `DON-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      };

      console.log('Sending donation request:', donationData);

      const donationResponse = await fetch(getApiUrl('/donations'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(donationData),
      });

      const responseData = await donationResponse.json();
      console.log('Server response:', responseData);

      if (!donationResponse.ok) {
        if (responseData.errors) {
          const errorMessages = Object.values(responseData.errors).flat().join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(responseData.message || responseData.error || 'Failed to add donation');
      }

      // Fetch the updated donations list to ensure all fields are correct
      await fetchDonations();
      setIsAddDialogOpen(false);
      setNewDonation({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        Amount: 0
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
      'Donor Name': `${donation.user?.FirstName} ${donation.user?.LastName}`,
      'Email': donation.user?.Email,
      'Amount': `$${donation.Amount.toFixed(2)}`,
      'Date': new Date(donation.DonationDate).toLocaleDateString(),
      'Confirmation ID': donation.ConfirmationID
    }));

    // Download CSV with current date in filename
    downloadCSV(exportData, `donations-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleEditDonation = async () => {
    if (!selectedDonation) return;

    try {
      const response = await fetch(getApiUrl(`/donations/${selectedDonation.DonationID}`), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: newDonation.firstName,
          LastName: newDonation.lastName,
          Email: newDonation.email,
          Amount: newDonation.Amount,
          DonationDate: selectedDonation.DonationDate,
          ConfirmationID: selectedDonation.ConfirmationID
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update donation');
      }

      setDonations(prev => prev.map(d => 
        d.DonationID === selectedDonation.DonationID ? data.data : d
      ));
      setIsEditDialogOpen(false);
      setSelectedDonation(null);
      setNewDonation({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        Amount: 0
      });
      toast.success(data.message || 'Donation updated successfully!');
    } catch (err) {
      console.error('Error updating donation:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update donation');
    }
  };

  const handleDeleteDonation = async (donationId: number) => {
    if (!window.confirm('Are you sure you want to delete this donation?')) return;

    try {
      const response = await fetch(getApiUrl(`/donations/${donationId}`), {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete donation');
      }

      setDonations(prev => prev.filter(d => d.DonationID !== donationId));
      toast.success(data.message || 'Donation deleted successfully!');
    } catch (err) {
      console.error('Error deleting donation:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete donation');
    }
  };

  const handleEditClick = (donation: Donation) => {
    setSelectedDonation(donation);
    setNewDonation({
      firstName: donation.user.FirstName,
      lastName: donation.user.LastName,
      email: donation.user.Email,
      phoneNumber: '',
      Amount: donation.Amount
    });
    setIsEditDialogOpen(true);
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Confirmation ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation, index) => (
                  <TableRow key={donation.DonationID || `donation-${index}`}>
                    <TableCell className="font-medium">{`${donation.user?.FirstName} ${donation.user?.LastName}`}</TableCell>
                    <TableCell>{donation.user?.Email}</TableCell>
                    <TableCell>${donation.Amount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>{new Date(donation.DonationDate).toLocaleDateString()}</TableCell>
                    <TableCell>{donation.ConfirmationID}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditClick(donation)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                        onClick={() => handleDeleteDonation(donation.DonationID)}
                      >
                        <Trash2 className="h-4 w-4" />
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Donation</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editFirstName">First Name</Label>
              <Input
                id="editFirstName"
                value={newDonation.firstName}
                onChange={(e) => setNewDonation(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editLastName">Last Name</Label>
              <Input
                id="editLastName"
                value={newDonation.lastName}
                onChange={(e) => setNewDonation(prev => ({ ...prev, lastName: e.target.value }))}
                placeholder="Enter last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={newDonation.email}
                onChange={(e) => setNewDonation(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter donor email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhoneNumber">Phone Number</Label>
              <Input
                id="editPhoneNumber"
                type="tel"
                value={newDonation.phoneNumber}
                onChange={(e) => setNewDonation(prev => ({ ...prev, phoneNumber: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editAmount">Amount</Label>
              <Input
                id="editAmount"
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
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditDonation}>
              Update Donation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

