"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle, Plus, Download } from "lucide-react"
import { downloadCSV } from "@/lib/utils"

export default function EventsPage() {
  const handleExport = () => {
    // Format event data for export
    const eventData = [{
      'Event Name': 'MilesForHope Charity Run 2023',
      'Date': 'October 15, 2023',
      'Time': '7:00 AM - 11:00 AM',
      'Location': 'City Park, Hopeville',
      'Participants': '245',
      'Tasks Completed': '3',
      'Tasks In Progress': '2',
      'Tasks Pending': '3',
      'Total Volunteers': '32'
    }];

    // Download CSV with current date in filename
    downloadCSV(eventData, `events-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Event Management</h2>
          <p className="text-muted-foreground">Manage all aspects of the charity run event.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>MilesForHope Charity Run 2023</CardTitle>
          <CardDescription>Saturday, October 15, 2023 at City Park</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">October 15, 2023</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Time</p>
                <p className="text-sm text-muted-foreground">7:00 AM - 11:00 AM</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <MapPin className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">City Park, Hopeville</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Registrations</p>
                <p className="text-sm text-muted-foreground">245 participants</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-2">
            <Button variant="outline">Edit Event</Button>
            <Button>Manage Event</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Event Tasks</TabsTrigger>
          <TabsTrigger value="schedule">Event Schedule</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Tasks</CardTitle>
              <CardDescription>Track and manage tasks for the charity run.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">Status</TableHead>
                      <TableHead>Task</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        status: "completed",
                        task: "Secure event permits",
                        assignedTo: "Michael Chen",
                        dueDate: "Aug 15, 2023",
                        priority: "High",
                      },
                      {
                        status: "completed",
                        task: "Order event t-shirts",
                        assignedTo: "Sarah Johnson",
                        dueDate: "Sep 1, 2023",
                        priority: "Medium",
                      },
                      {
                        status: "completed",
                        task: "Confirm sponsors",
                        assignedTo: "David Kim",
                        dueDate: "Sep 15, 2023",
                        priority: "High",
                      },
                      {
                        status: "in-progress",
                        task: "Arrange water stations",
                        assignedTo: "Emily Rodriguez",
                        dueDate: "Oct 1, 2023",
                        priority: "Medium",
                      },
                      {
                        status: "in-progress",
                        task: "Coordinate volunteers",
                        assignedTo: "Jessica Taylor",
                        dueDate: "Oct 5, 2023",
                        priority: "High",
                      },
                      {
                        status: "pending",
                        task: "Set up registration booth",
                        assignedTo: "Robert Wilson",
                        dueDate: "Oct 14, 2023",
                        priority: "Medium",
                      },
                      {
                        status: "pending",
                        task: "Prepare awards and medals",
                        assignedTo: "Amanda Lee",
                        dueDate: "Oct 10, 2023",
                        priority: "Medium",
                      },
                      {
                        status: "pending",
                        task: "Arrange post-event refreshments",
                        assignedTo: "Thomas Brown",
                        dueDate: "Oct 12, 2023",
                        priority: "Low",
                      },
                    ].map((task, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {task.status === "completed" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : task.status === "in-progress" ? (
                            <Clock className="h-5 w-5 text-blue-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-300" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{task.task}</TableCell>
                        <TableCell>{task.assignedTo}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              task.priority === "High"
                                ? "bg-red-50 text-red-700 ring-red-600/20"
                                : task.priority === "Medium"
                                  ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                                  : "bg-green-50 text-green-700 ring-green-600/20"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
              <CardDescription>Detailed timeline for the charity run.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <div className="font-medium">6:00 AM</div>
                    <div className="text-muted-foreground">Check-in & Registration Opens</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Staff: Sarah, Michael, Emily</p>
                      <p>Location: Main Entrance</p>
                      <p>Notes: Set up registration tables, prepare race packets</p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <div className="font-medium">6:45 AM</div>
                    <div className="text-muted-foreground">Pre-Race Warm-up</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Staff: Jessica</p>
                      <p>Location: Main Stage</p>
                      <p>Notes: Group warm-up exercises led by fitness instructor</p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <div className="font-medium">7:00 AM</div>
                    <div className="text-muted-foreground">Race Start</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Staff: David, Robert</p>
                      <p>Location: Starting Line</p>
                      <p>Notes: Brief welcome speech, national anthem, starting horn</p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <div className="font-medium">8:30 AM</div>
                    <div className="text-muted-foreground">Awards Ceremony</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Staff: Amanda, Thomas</p>
                      <p>Location: Main Stage</p>
                      <p>Notes: Recognition of top finishers and fundraisers</p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="h-full w-px bg-gray-200 mt-2"></div>
                  </div>
                  <div>
                    <div className="font-medium">9:00 AM</div>
                    <div className="text-muted-foreground">Post-Race Celebration</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Staff: All</p>
                      <p>Location: Park Pavilion</p>
                      <p>Notes: Refreshments, music, sponsor booths, community activities</p>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">11:00 AM</div>
                    <div className="text-muted-foreground">Event Concludes</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>Staff: All</p>
                      <p>Location: Entire Venue</p>
                      <p>Notes: Clean-up, equipment breakdown, final announcements</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Schedule Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="volunteers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Volunteer Management</CardTitle>
              <CardDescription>Coordinate volunteers for the charity run.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Volunteer Summary</h3>
                  <p className="text-sm text-muted-foreground">Total volunteers: 32</p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Volunteer
                </Button>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Shift</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Lisa Johnson",
                        role: "Registration",
                        shift: "6:00 AM - 9:00 AM",
                        contact: "(555) 123-7890",
                        status: "Confirmed",
                      },
                      {
                        name: "Mark Wilson",
                        role: "Water Station",
                        shift: "6:30 AM - 10:30 AM",
                        contact: "(555) 234-8901",
                        status: "Confirmed",
                      },
                      {
                        name: "Karen Lee",
                        role: "Course Marshal",
                        shift: "6:30 AM - 9:30 AM",
                        contact: "(555) 345-9012",
                        status: "Confirmed",
                      },
                      {
                        name: "James Smith",
                        role: "First Aid",
                        shift: "6:00 AM - 11:00 AM",
                        contact: "(555) 456-0123",
                        status: "Confirmed",
                      },
                      {
                        name: "Patricia Brown",
                        role: "Refreshments",
                        shift: "8:00 AM - 11:00 AM",
                        contact: "(555) 567-1234",
                        status: "Pending",
                      },
                      {
                        name: "Robert Davis",
                        role: "Parking",
                        shift: "5:30 AM - 8:30 AM",
                        contact: "(555) 678-2345",
                        status: "Confirmed",
                      },
                      {
                        name: "Jennifer Garcia",
                        role: "Photography",
                        shift: "6:30 AM - 10:30 AM",
                        contact: "(555) 789-3456",
                        status: "Confirmed",
                      },
                      {
                        name: "Michael Martinez",
                        role: "Setup/Cleanup",
                        shift: "5:00 AM - 12:00 PM",
                        contact: "(555) 890-4567",
                        status: "Confirmed",
                      },
                    ].map((volunteer, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{volunteer.name}</TableCell>
                        <TableCell>{volunteer.role}</TableCell>
                        <TableCell>{volunteer.shift}</TableCell>
                        <TableCell>{volunteer.contact}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              volunteer.status === "Confirmed"
                                ? "bg-green-50 text-green-700 ring-green-600/20"
                                : "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                            }`}
                          >
                            {volunteer.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Volunteer Roles</h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Volunteers: 6</p>
                      <p className="text-sm text-muted-foreground">Needed: 8</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-full w-[75%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Water Stations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Volunteers: 8</p>
                      <p className="text-sm text-muted-foreground">Needed: 8</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-full w-[100%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Course Marshals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Volunteers: 10</p>
                      <p className="text-sm text-muted-foreground">Needed: 12</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-full w-[83%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">First Aid</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Volunteers: 4</p>
                      <p className="text-sm text-muted-foreground">Needed: 4</p>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div className="h-full w-[100%] rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

