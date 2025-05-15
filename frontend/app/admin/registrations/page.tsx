"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search, Filter, ChevronDown, Eye, Pencil, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { downloadCSV } from "@/lib/utils"
import { getApiUrl } from '../../config/api'

interface Registration {
  RegistrationID: number;
  RegistrationDate: string;
  RegistrationStatus: string;
  user: {
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
  };
}

interface RegistrationFormData {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  RegistrationStatus: string;
}

interface ViewEditModalProps {
  registration: Registration | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RegistrationFormData) => Promise<void>;
  mode: 'view' | 'edit';
}

function ViewEditModal({ registration, isOpen, onClose, onSave, mode }: ViewEditModalProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    RegistrationStatus: 'pending'
  });

  useEffect(() => {
    if (registration) {
      setFormData({
        FirstName: registration.user.FirstName,
        LastName: registration.user.LastName,
        Email: registration.user.Email,
        PhoneNumber: registration.user.PhoneNumber,
        RegistrationStatus: registration.RegistrationStatus
      });
    }
  }, [registration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === 'view' ? 'View Registration' : 'Edit Registration'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="FirstName">First Name</Label>
              <Input
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleInputChange}
                required
                disabled={mode === 'view'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="LastName">Last Name</Label>
              <Input
                id="LastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleInputChange}
                required
                disabled={mode === 'view'}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="Email">Email</Label>
            <Input
              id="Email"
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleInputChange}
              required
              disabled={mode === 'view'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="PhoneNumber">Phone Number</Label>
            <Input
              id="PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleInputChange}
              required
              disabled={mode === 'view'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="RegistrationStatus">Status</Label>
            <select
              id="RegistrationStatus"
              name="RegistrationStatus"
              value={formData.RegistrationStatus}
              onChange={handleInputChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              required
              disabled={mode === 'view'}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {mode === 'view' ? 'Close' : 'Cancel'}
            </Button>
            {mode === 'edit' && (
              <Button type="submit">Save Changes</Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');
  const [formData, setFormData] = useState<RegistrationFormData>({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    RegistrationStatus: 'pending'
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] = useState<Registration | null>(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(getApiUrl('/registrations'));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(getApiUrl('/registrations'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('\n');
          toast.error(errorMessages);
          return;
        }
        throw new Error(errorData.error || 'Failed to create registration');
      }

      const newRegistration = await response.json();
      setRegistrations(prev => [newRegistration, ...prev]);
      setIsDialogOpen(false);
      setFormData({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        RegistrationStatus: 'pending'
      });
      toast.success('Registration added successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add registration');
      console.error(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleViewRegistration = (registration: Registration) => {
    setSelectedRegistration(registration);
    setModalMode('view');
    setIsDialogOpen(true);
  };

  const handleEditRegistration = (registration: Registration) => {
    setSelectedRegistration(registration);
    setModalMode('edit');
    setIsDialogOpen(true);
  };

  const handleSaveRegistration = async (data: RegistrationFormData) => {
    if (!selectedRegistration) return;

    try {
      const response = await fetch(getApiUrl(`/registrations/${selectedRegistration.RegistrationID}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 422) {
          const errorMessages = Object.entries(errorData.errors)
            .map(([field, messages]) => `${field}: ${(messages as string[]).join(', ')}`)
            .join('\n');
          toast.error(errorMessages);
          return;
        }
        throw new Error(errorData.error || 'Failed to update registration');
      }

      const updatedRegistration = await response.json();
      setRegistrations(prev => prev.map(reg => 
        reg.RegistrationID === updatedRegistration.RegistrationID ? updatedRegistration : reg
      ));
      setIsDialogOpen(false);
      toast.success('Registration updated successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update registration');
      console.error(err);
    }
  };

  const handleDeleteRegistration = async (registration: Registration) => {
    setRegistrationToDelete(registration);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!registrationToDelete) return;

    try {
      const response = await fetch(getApiUrl(`/registrations/${registrationToDelete.RegistrationID}`), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      setRegistrations(prev => prev.filter(reg => reg.RegistrationID !== registrationToDelete.RegistrationID));
      toast.success('Registration deleted successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete registration');
    } finally {
      setDeleteDialogOpen(false);
      setRegistrationToDelete(null);
    }
  };

  const handleExport = () => {
    // Transform registrations data for CSV export
    const exportData = registrations.map(reg => ({
      'First Name': reg.user.FirstName,
      'Last Name': reg.user.LastName,
      'Email': reg.user.Email,
      'Phone Number': reg.user.PhoneNumber,
      'Registration Date': new Date(reg.RegistrationDate).toLocaleDateString(),
      'Status': reg.RegistrationStatus,
      'Registration ID': reg.RegistrationID
    }));

    // Download CSV
    downloadCSV(exportData, `registrations-${new Date().toISOString().split('T')[0]}.csv`);
  };

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
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen && !selectedRegistration} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add Registration</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Registration</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="FirstName">First Name</Label>
                    <Input
                      id="FirstName"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="LastName">Last Name</Label>
                    <Input
                      id="LastName"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Email">Email</Label>
                  <Input
                    id="Email"
                    name="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="PhoneNumber">Phone Number</Label>
                  <Input
                    id="PhoneNumber"
                    name="PhoneNumber"
                    value={formData.PhoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="RegistrationStatus">Status</Label>
                  <select
                    id="RegistrationStatus"
                    name="RegistrationStatus"
                    value={formData.RegistrationStatus}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Registration</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                      {registration.user.FirstName} {registration.user.LastName}
                    </TableCell>
                    <TableCell>{registration.user.Email}</TableCell>
                    <TableCell>{registration.user.PhoneNumber}</TableCell>
                    <TableCell>{new Date(registration.RegistrationDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        registration.RegistrationStatus === 'pending' 
                          ? 'bg-yellow-50 text-yellow-700 ring-yellow-600/20' 
                          : registration.RegistrationStatus === 'cancelled'
                          ? 'bg-red-50 text-red-700 ring-red-600/20'
                          : 'bg-green-50 text-green-700 ring-green-600/20'
                      } ring-1 ring-inset`}>
                        {registration.RegistrationStatus.charAt(0).toUpperCase() + registration.RegistrationStatus.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditRegistration(registration)}
                        className="mr-2"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteRegistration(registration)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
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

      <ViewEditModal
        registration={selectedRegistration}
        isOpen={isDialogOpen && !!selectedRegistration}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedRegistration(null);
        }}
        onSave={handleSaveRegistration}
        mode={modalMode}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the registration for{' '}
              {registrationToDelete ? `${registrationToDelete.user.FirstName} ${registrationToDelete.user.LastName}` : ''}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

