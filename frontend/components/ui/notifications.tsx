import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Activity {
  id: string;
  type: 'donation' | 'registration';
  title: string;
  description: string;
  date: string;
}

export function NotificationsPopover() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetch both donations and registrations
        const [donationsRes, registrationsRes] = await Promise.all([
          fetch('http://localhost:8000/api/donations'),
          fetch('http://localhost:8000/api/registrations')
        ]);

        const donations = await donationsRes.json();
        const registrations = await registrationsRes.json();

        // Transform and combine the data
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
          description: `${r.participant.FirstName} ${r.participant.LastName} registered`,
          date: new Date(r.RegistrationDate).toISOString()
        }));

        // Combine and sort by date
        const allActivities = [...donationActivities, ...registrationActivities]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10); // Get only the 10 most recent activities

        setActivities(allActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const recentActivities = activities.slice(0, 5);
  const hasUnreadNotifications = recentActivities.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2 rounded-full hover:bg-gray-100">
          {hasUnreadNotifications && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {recentActivities.length}
            </span>
          )}
          <Bell className="h-6 w-6 text-gray-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Activities</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-4 py-4">
                {isLoading ? (
                  <p className="text-center text-sm text-gray-500">Loading activities...</p>
                ) : activities.length > 0 ? (
                  activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 rounded-lg border p-3"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500">No activities to show</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread">
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-4 py-4">
                {isLoading ? (
                  <p className="text-center text-sm text-gray-500">Loading activities...</p>
                ) : recentActivities.length > 0 ? (
                  recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 rounded-lg border p-3"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(activity.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-gray-500">No unread notifications</p>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className="mt-4 border-t pt-4 px-4">
          <Link href="/admin/activity">
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
} 