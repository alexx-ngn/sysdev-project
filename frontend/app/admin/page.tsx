"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, Calendar, Award } from "lucide-react"
import { useEffect, useState } from "react"

interface Registration {
  RegistrationID: number;
  RegistrationDate: string;
  RegistrationStatus: string;
  participant: {
    FirstName: string;
    LastName: string;
    Email: string;
  };
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/registrations');
        if (!response.ok) {
          throw new Error('Failed to fetch registrations');
        }
        const data = await response.json();
        setRegistrations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const recentRegistrations = registrations
    .sort((a, b) => new Date(b.RegistrationDate).getTime() - new Date(a.RegistrationDate).getTime())
    .slice(0, 3);

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
            <div className="text-2xl font-bold">$12,450</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
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
                        {registration.participant.FirstName} {registration.participant.LastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{registration.participant.Email}</p>
                    </div>
                    <div className="ml-auto font-medium">
                      {new Date(registration.RegistrationDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
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
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">John Smith</p>
                    <p className="text-sm text-muted-foreground">john.smith@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">$500</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">sarah.johnson@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">$250</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">michael.chen@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">$100</div>
                </div>
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
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">New registration</p>
                    <p className="text-sm text-muted-foreground">Sarah Johnson registered for the event</p>
                  </div>
                  <div className="ml-auto font-medium">Today, 10:45 AM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Donation received</p>
                    <p className="text-sm text-muted-foreground">John Smith donated $500</p>
                  </div>
                  <div className="ml-auto font-medium">Today, 9:23 AM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">New sponsor</p>
                    <p className="text-sm text-muted-foreground">TechCorp joined as a sponsor</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday, 4:52 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

