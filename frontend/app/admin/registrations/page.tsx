"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface Registration {
  RegistrationID: number;
  RegistrationDate: string;
  RegistrationStatus: string;
  participant: {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
  };
}

export default function RegistrationsPage() {
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
          <CardDescription>A total of {registrations.length} participants have registered for the event.</CardDescription>
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

          <div className="rounded-md border">
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
                {registrations.map((registration) => (
                  <TableRow key={registration.RegistrationID}>
                    <TableCell className="font-medium">
                      {registration.participant.FirstName} {registration.participant.LastName}
                    </TableCell>
                    <TableCell>{registration.participant.Email}</TableCell>
                    <TableCell>{registration.participant.PhoneNumber}</TableCell>
                    <TableCell>{new Date(registration.RegistrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        registration.RegistrationStatus === 'pending' 
                          ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' 
                          : 'bg-green-50 text-green-700 ring-green-600/20'
                      } ring-1 ring-inset`}>
                        {registration.RegistrationStatus}
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
            <div className="text-sm text-muted-foreground">
              Showing 1-{registrations.length} of {registrations.length} participants
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

