import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown } from "lucide-react"

export default function RegistrationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Registrations</h2>
          <p className="text-muted-foreground">Manage and view all participant registrations for the charity run.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button>Add Registration</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Participants</CardTitle>
          <CardDescription>A total of 245 participants have registered for the event.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search participants..." className="pl-8" />
            </div>
            <div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    name: "Sarah Johnson",
                    email: "sarah.johnson@example.com",
                    phone: "(555) 123-4567",
                    date: "Sep 24, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Michael Chen",
                    email: "michael.chen@example.com",
                    phone: "(555) 234-5678",
                    date: "Sep 24, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Emily Rodriguez",
                    email: "emily.rodriguez@example.com",
                    phone: "(555) 345-6789",
                    date: "Sep 23, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "David Kim",
                    email: "david.kim@example.com",
                    phone: "(555) 456-7890",
                    date: "Sep 23, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Jessica Taylor",
                    email: "jessica.taylor@example.com",
                    phone: "(555) 567-8901",
                    date: "Sep 23, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Robert Wilson",
                    email: "robert.wilson@example.com",
                    phone: "(555) 678-9012",
                    date: "Sep 22, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Amanda Lee",
                    email: "amanda.lee@example.com",
                    phone: "(555) 789-0123",
                    date: "Sep 22, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Thomas Brown",
                    email: "thomas.brown@example.com",
                    phone: "(555) 890-1234",
                    date: "Sep 21, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "Sophia Martinez",
                    email: "sophia.martinez@example.com",
                    phone: "(555) 901-2345",
                    date: "Sep 21, 2023",
                    status: "Confirmed",
                  },
                  {
                    name: "James Anderson",
                    email: "james.anderson@example.com",
                    phone: "(555) 012-3456",
                    date: "Sep 20, 2023",
                    status: "Confirmed",
                  },
                ].map((participant, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{participant.name}</TableCell>
                    <TableCell>{participant.email}</TableCell>
                    <TableCell>{participant.phone}</TableCell>
                    <TableCell>{participant.date}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {participant.status}
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

          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-3">
            <div className="text-sm text-muted-foreground">Showing 1-10 of 245 participants</div>
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
          <CardTitle>Registration Statistics</CardTitle>
          <CardDescription>Overview of registration trends and demographics.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Registration by Day</p>
              <div className="h-[180px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart Placeholder</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Age Distribution</p>
              <div className="h-[180px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart Placeholder</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Gender Distribution</p>
              <div className="h-[180px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart Placeholder</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

