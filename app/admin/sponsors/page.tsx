import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building, Plus, ExternalLink } from "lucide-react"

export default function SponsorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sponsors</h2>
          <p className="text-muted-foreground">Manage and track all sponsors for the charity run.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Sponsor
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sponsors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Across all tiers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sponsorship Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500</div>
            <p className="text-xs text-muted-foreground">In financial support</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In-Kind Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,200</div>
            <p className="text-xs text-muted-foreground">In products and services</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platinum Sponsors</CardTitle>
          <CardDescription>Our highest tier sponsors contributing $5,000 or more.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Acme Corporation",
                type: "Technology Partner",
                contribution: "$5,000",
                since: "2018",
              },
              {
                name: "Global Health Inc.",
                type: "Healthcare Partner",
                contribution: "$5,000",
                since: "2020",
              },
              {
                name: "Metro Bank",
                type: "Financial Partner",
                contribution: "$5,000",
                since: "2019",
              },
            ].map((sponsor, i) => (
              <Card key={i} className="border-primary/20">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-gray-400" />
                  </div>
                  <CardTitle className="text-base">{sponsor.name}</CardTitle>
                  <CardDescription>{sponsor.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contribution:</span>
                      <span className="font-medium">{sponsor.contribution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Partner since:</span>
                      <span className="font-medium">{sponsor.since}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Sponsors</CardTitle>
          <CardDescription>Complete list of all sponsors across all tiers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Contribution</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    company: "Acme Corporation",
                    tier: "Platinum",
                    contribution: "$5,000",
                    contact: "John Smith",
                    status: "Confirmed",
                  },
                  {
                    company: "Global Health Inc.",
                    tier: "Platinum",
                    contribution: "$5,000",
                    contact: "Maria Rodriguez",
                    status: "Confirmed",
                  },
                  {
                    company: "Metro Bank",
                    tier: "Platinum",
                    contribution: "$5,000",
                    contact: "David Chen",
                    status: "Confirmed",
                  },
                  {
                    company: "Fitness First",
                    tier: "Gold",
                    contribution: "$2,500",
                    contact: "Sarah Johnson",
                    status: "Confirmed",
                  },
                  {
                    company: "Green Energy Co.",
                    tier: "Gold",
                    contribution: "$2,500",
                    contact: "Michael Brown",
                    status: "Confirmed",
                  },
                  {
                    company: "City News",
                    tier: "Gold",
                    contribution: "$2,500",
                    contact: "Jessica Lee",
                    status: "Confirmed",
                  },
                  {
                    company: "Fresh Foods",
                    tier: "Gold",
                    contribution: "$2,500",
                    contact: "Robert Wilson",
                    status: "Confirmed",
                  },
                  {
                    company: "Local Brewery",
                    tier: "Silver",
                    contribution: "$1,000",
                    contact: "Thomas Anderson",
                    status: "Confirmed",
                  },
                  {
                    company: "Community Bank",
                    tier: "Silver",
                    contribution: "$1,000",
                    contact: "Emily Davis",
                    status: "Confirmed",
                  },
                  {
                    company: "Tech Innovations",
                    tier: "Silver",
                    contribution: "$1,000",
                    contact: "Daniel Kim",
                    status: "Pending",
                  },
                ].map((sponsor, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{sponsor.company}</TableCell>
                    <TableCell>{sponsor.tier}</TableCell>
                    <TableCell>{sponsor.contribution}</TableCell>
                    <TableCell>{sponsor.contact}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          sponsor.status === "Confirmed"
                            ? "bg-green-50 text-green-700 ring-green-600/20"
                            : "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                        }`}
                      >
                        {sponsor.status}
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sponsorship Packages</CardTitle>
          <CardDescription>Available sponsorship tiers and benefits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Platinum</CardTitle>
                <CardDescription>$5,000+</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Premium logo placement</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Speaking opportunity</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>10 free registrations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Social media promotion</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Booth at the event</span>
                  </li>
                </ul>
                <Button className="w-full mt-4">Edit Package</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gold</CardTitle>
                <CardDescription>$2,500+</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Logo on event materials</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>5 free registrations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Social media mention</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Booth at the event</span>
                  </li>
                </ul>
                <Button className="w-full mt-4">Edit Package</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Silver</CardTitle>
                <CardDescription>$1,000+</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Logo on event website</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>2 free registrations</span>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>Social media mention</span>
                  </li>
                </ul>
                <Button className="w-full mt-4">Edit Package</Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

