"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, Calendar, Award } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { getAuthToken, getAuthUser } from '@/app/utils/auth'

interface Registration {
  RegistrationID: number;
  RegistrationDate: string;
  RegistrationStatus: string;
  user: {
    FirstName: string;
    LastName: string;
    Email: string;
  };
}

interface Donation {
  DonationID: number;
  name: string;
  email: string;
  Amount: number;
  DonationDate: string;
  type: string;
  ConfirmationID: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const user = getAuthUser();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingAdmins, setIsCheckingAdmins] = useState(true);

  useEffect(() => {
    const checkAdminsAndAuth = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/admin/check');
        const data = await response.json();
        
        if (!data.has_admins) {
          router.push('/admin/register');
          return;
        }

        const token = getAuthToken();
        if (!token) {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Error checking admins:', error);
      } finally {
        setIsCheckingAdmins(false);
      }
    };

    checkAdminsAndAuth();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [registrationsRes, donationsRes] = await Promise.all([
          fetch('http://localhost:8000/api/registrations'),
          fetch('http://localhost:8000/api/donations')
        ]);

        if (!registrationsRes.ok) {
          throw new Error('Failed to fetch registrations');
        }
        if (!donationsRes.ok) {
          throw new Error('Failed to fetch donations');
        }

        const registrationsData = await registrationsRes.json();
        const donationsData = await donationsRes.json();

        setRegistrations(registrationsData);
        setDonations(donationsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isCheckingAdmins || loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const recentRegistrations = registrations
    .sort((a, b) => new Date(b.RegistrationDate).getTime() - new Date(a.RegistrationDate).getTime())
    .slice(0, 3);

  const recentDonations = donations
    .sort((a, b) => new Date(b.DonationDate).getTime() - new Date(a.DonationDate).getTime())
    .slice(0, 3);

  const totalDonations = donations.reduce((sum, donation) => sum + donation.Amount, 0);
  const lastMonthDonations = donations.filter(d => {
    const donationDate = new Date(d.DonationDate);
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    return donationDate >= lastMonth;
  });
  const lastMonthTotal = lastMonthDonations.reduce((sum, d) => sum + d.Amount, 0);
  const previousMonthTotal = donations
    .filter(d => {
      const donationDate = new Date(d.DonationDate);
      const twoMonthsAgo = new Date();
      const lastMonth = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      return donationDate >= twoMonthsAgo && donationDate < lastMonth;
    })
    .reduce((sum, d) => sum + d.Amount, 0);
  
  const monthlyChange = ((lastMonthTotal - previousMonthTotal) / previousMonthTotal * 100) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the MilesForHope admin dashboard. Here's an overview of your charity run.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{registrations.length}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(registrations.length * 0.12)}% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground">{monthlyChange >= 0 ? '+' : ''}{monthlyChange.toFixed(0)}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next event in 5 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsors</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="registrations">
        <TabsList>
          <TabsTrigger value="registrations">Recent Registrations</TabsTrigger>
          <TabsTrigger value="donations">Recent Donations</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        <TabsContent value="registrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>The latest participants who registered for the charity run.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentRegistrations.map((registration) => (
                  <div key={registration.RegistrationID} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {registration.user.FirstName} {registration.user.LastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{registration.user.Email}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      {new Date(registration.RegistrationDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {recentRegistrations.length === 0 && (
                  <div className="text-sm text-muted-foreground">No recent registrations</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>The latest donations received for the charity run.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentDonations.map((donation) => (
                  <div key={donation.DonationID} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{donation.name}</p>
                      <p className="text-sm text-muted-foreground">{donation.email}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      ${donation.Amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
                {recentDonations.length === 0 && (
                  <div className="text-sm text-muted-foreground">No recent donations</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activities in the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[...recentRegistrations.map(reg => ({
                  type: 'registration',
                  date: new Date(reg.RegistrationDate),
                  text: `${reg.user.FirstName} ${reg.user.LastName} registered for the event`
                })), ...recentDonations.map(don => ({
                  type: 'donation',
                  date: new Date(don.DonationDate),
                  text: `${don.name} donated $${don.Amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                }))].sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 3)
                .map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.type === 'registration' ? 'New registration' : 'Donation received'}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.text}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      {activity.date.toLocaleString()}
                    </div>
                  </div>
                ))}
                {recentRegistrations.length === 0 && recentDonations.length === 0 && (
                  <div className="text-sm text-muted-foreground">No recent activity</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

