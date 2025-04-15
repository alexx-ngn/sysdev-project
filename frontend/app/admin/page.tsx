import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, Calendar, Award } from "lucide-react"

export default function AdminDashboard() {
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
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
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
            <CardTitle className="text-sm font-medium">Sponsors</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Until Event</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">October 15, 2023</p>
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
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">sarah.johnson@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">Today, 10:45 AM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">michael.chen@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">Today, 9:23 AM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Emily Rodriguez</p>
                    <p className="text-sm text-muted-foreground">emily.rodriguez@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday, 4:52 PM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">David Kim</p>
                    <p className="text-sm text-muted-foreground">david.kim@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday, 2:15 PM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Jessica Taylor</p>
                    <p className="text-sm text-muted-foreground">jessica.taylor@example.com</p>
                  </div>
                  <div className="ml-auto font-medium">Sep 23, 2023</div>
                </div>
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
                    <p className="text-sm font-medium leading-none">Robert Wilson</p>
                    <p className="text-sm text-muted-foreground">One-time donation</p>
                  </div>
                  <div className="ml-auto font-medium">$100.00</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Amanda Lee</p>
                    <p className="text-sm text-muted-foreground">One-time donation</p>
                  </div>
                  <div className="ml-auto font-medium">$50.00</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Global Health Inc.</p>
                    <p className="text-sm text-muted-foreground">Corporate sponsorship</p>
                  </div>
                  <div className="ml-auto font-medium">$2,500.00</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Thomas Brown</p>
                    <p className="text-sm text-muted-foreground">One-time donation</p>
                  </div>
                  <div className="ml-auto font-medium">$25.00</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Metro Bank</p>
                    <p className="text-sm text-muted-foreground">Corporate sponsorship</p>
                  </div>
                  <div className="ml-auto font-medium">$5,000.00</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activity in the admin panel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-sm text-muted-foreground">Updated event details</p>
                  </div>
                  <div className="ml-auto font-medium">Today, 11:32 AM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-sm text-muted-foreground">Added new sponsor: Fresh Foods</p>
                  </div>
                  <div className="ml-auto font-medium">Today, 9:15 AM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-sm text-muted-foreground">Exported registration data</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday, 5:42 PM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-sm text-muted-foreground">Updated FAQ page</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday, 3:20 PM</div>
                </div>
                <div className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-sm text-muted-foreground">Logged in</p>
                  </div>
                  <div className="ml-auto font-medium">Yesterday, 3:12 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

