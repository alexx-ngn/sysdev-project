import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown } from "lucide-react"

export default function DonationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donations</h2>
          <p className="text-muted-foreground">Manage and track all donations for the charity run.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button>Add Donation</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <CardDescription>A total of 83 donations have been received.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search donations..." className="pl-8" />
            </div>
            <div className="flex items-center gap-2">
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
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    donor: "Robert Wilson",
                    type: "One-time donation",
                    amount: "$100.00",
                    date: "Sep 24, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Amanda Lee",
                    type: "One-time donation",
                    amount: "$50.00",
                    date: "Sep 24, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Global Health Inc.",
                    type: "Corporate sponsorship",
                    amount: "$2,500.00",
                    date: "Sep 23, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Thomas Brown",
                    type: "One-time donation",
                    amount: "$25.00",
                    date: "Sep 23, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Metro Bank",
                    type: "Corporate sponsorship",
                    amount: "$5,000.00",
                    date: "Sep 22, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Jennifer Garcia",
                    type: "One-time donation",
                    amount: "$75.00",
                    date: "Sep 22, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "City News",
                    type: "Corporate sponsorship",
                    amount: "$1,000.00",
                    date: "Sep 21, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "William Davis",
                    type: "One-time donation",
                    amount: "$50.00",
                    date: "Sep 21, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Elizabeth Smith",
                    type: "One-time donation",
                    amount: "$100.00",
                    date: "Sep 20, 2023",
                    status: "Completed",
                  },
                  {
                    donor: "Daniel Johnson",
                    type: "One-time donation",
                    amount: "$25.00",
                    date: "Sep 20, 2023",
                    status: "Completed",
                  },
                ].map((donation, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{donation.donor}</TableCell>
                    <TableCell>{donation.type}</TableCell>
                    <TableCell>{donation.amount}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {donation.status}
                      </span>
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
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Showing 1-10 of 83 donations</div>
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
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Donations Over Time</p>
              <div className="h-[200px] bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart Placeholder</p>
              </div>
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

