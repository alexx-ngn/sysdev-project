"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface Donation {
  DonationID: number;
  name: string;
  email: string;
  Amount: number;
  DonationDate: string;
  type: string;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

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

  const totalDonations = donations.reduce((sum, donation) => sum + (donation.Amount || 0), 0);
  const averageDonation = donations.length > 0 ? totalDonations / donations.length : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donations</h2>
          <p className="text-muted-foreground">Manage and track all donations for the charity run.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button>Add Donation</Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+$2,250 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Individual Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,950</div>
            <p className="text-xs text-muted-foreground">78 donations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Corporate Sponsorships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,500</div>
            <p className="text-xs text-muted-foreground">5 sponsors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">41.5%</div>
            <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
              <div className="h-full w-[41.5%] rounded-full bg-primary"></div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">$12,450 of $30,000 goal</p>
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
                {donations.map((donation) => (
                  <TableRow key={donation.DonationID}>
                    <TableCell className="font-medium">{donation.name}</TableCell>
                    <TableCell>{donation.email}</TableCell>
                    <TableCell>{donation.type}</TableCell>
                    <TableCell>${donation.Amount?.toFixed(2) || '0.00'}</TableCell>
                    <TableCell>{new Date(donation.DonationDate).toLocaleDateString()}</TableCell>
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
              <p className="text-sm text-muted-foreground">
                Average donation: ${averageDonation.toFixed(2)}
              </p>
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

