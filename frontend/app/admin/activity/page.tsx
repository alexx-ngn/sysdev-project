"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, ChevronDown } from "lucide-react"
import { API_BASE_URL } from '@/app/config/api'

interface Activity {
  id: string;
  type: 'donation' | 'registration';
  title: string;
  description: string;
  date: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const [donationsRes, registrationsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/donations`),
          fetch(`${API_BASE_URL}/api/registrations`)
        ]);

        const donations = await donationsRes.json();
        const registrations = await registrationsRes.json();

        const donationActivities = donations.map((d: any) => ({
          id: `donation-${d.DonationID}`,
          type: 'donation' as const,
          title: 'New Donation',
          description: `${d.name} donated $${d.Amount}`,
          date: new Date(d.DonationDate).toISOString()
        }));

        const registrationActivities = registrations.map((r: any) => ({
          id: `registration-${r.RegistrationID}`,
          type: 'registration' as const,
          title: 'New Registration',
          description: `${r.user.FirstName} ${r.user.LastName} registered`,
          date: new Date(r.RegistrationDate).toISOString()
        }));

        const allActivities = [...donationActivities, ...registrationActivities]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setActivities(allActivities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading activities...</p>
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Activity Log</h2>
        <p className="text-muted-foreground">
          View all system activities and notifications.
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Activities</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
        </TabsList>

        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-8" />
          </div>
          <Button variant="outline" size="sm" className="ml-auto flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          {activities.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{activity.title}</CardTitle>
                    <CardDescription>{activity.description}</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleString()}
                  </span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          {activities
            .filter((activity) => activity.type === 'donation')
            .map((activity) => (
              <Card key={activity.id}>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="registrations" className="space-y-4">
          {activities
            .filter((activity) => activity.type === 'registration')
            .map((activity) => (
              <Card key={activity.id}>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.date).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 