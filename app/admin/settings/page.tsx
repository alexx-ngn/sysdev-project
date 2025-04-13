'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Heart, Plus, CheckCircle, X, Upload } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSettings } from "@/app/context/settings-context"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { handleFileUpload } from "@/lib/upload-utils"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function SettingsPage() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [formData, setFormData] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)

  // Update form data when settings change
  useEffect(() => {
    setFormData(settings)
  }, [settings])

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    if (id === 'contactPhone') {
      // Format phone number as user types
      const formatted = formatPhoneNumber(value)
      setFormData(prev => ({ ...prev, [id]: formatted }))
    } else {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
  }

  // Handle switch changes
  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [id]: checked }))
  }

  // Handle color changes
  const handleColorChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  // Handle file upload for logo
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(
      e,
      async (url) => {
        const updatedSettings = { ...formData, logo: url }
        setFormData(updatedSettings)
        await updateSettings({ logo: url })
        toast.success('Logo uploaded successfully')
      },
      (error) => {
        toast.error(`Failed to upload logo: ${error}`)
      }
    )
  }

  // Handle file upload for favicon
  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await handleFileUpload(
      e,
      (url) => {
        setFormData(prev => ({ ...prev, favicon: url }))
        toast.success('Favicon uploaded successfully')
      },
      (error) => {
        toast.error(`Failed to upload favicon: ${error}`)
      }
    )
  }

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '')
    // Check if it's exactly 10 digits
    return digits.length === 10
  }

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '')
    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  // Handle save changes
  const handleSaveChanges = async (section: string) => {
    // Reset errors
    setErrors({})

    // Validate email and phone
    const newErrors: Record<string, string> = {}
    
    if (formData.contactEmail && !validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address'
    }
    
    if (formData.contactPhone && !validatePhone(formData.contactPhone)) {
      newErrors.contactPhone = 'Please enter a valid phone number in the format (XXX) XXX-XXXX'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fix the validation errors before saving', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
      })
      return
    }

    setIsSaving(true)
    try {
      await updateSettings(formData)
      toast.success(`${section} settings saved successfully`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#22c55e',
          color: 'white',
          border: 'none',
        },
      })
    } catch (error) {
      toast.error(`Failed to save ${section} settings`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your website and event settings.</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic information about your organization and event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="organizationName">Organization Name</Label>
                <Input 
                  id="organizationName" 
                  value={formData.organizationName} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input 
                  id="eventName" 
                  value={formData.eventName} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input 
                  id="contactEmail" 
                  type="email" 
                  value={formData.contactEmail} 
                  onChange={handleInputChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address (e.g., example@domain.com)"
                  placeholder="example@domain.com"
                  required
                  className={errors.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-500">{errors.contactEmail}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Enter a valid email address
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input 
                  id="contactPhone" 
                  type="tel" 
                  value={formData.contactPhone} 
                  onChange={handleInputChange}
                  pattern="^\(\d{3}\) \d{3}-\d{4}$"
                  title="Please enter a valid phone number in the format (XXX) XXX-XXXX"
                  placeholder="(XXX) XXX-XXXX"
                  maxLength={14}
                  required
                  className={errors.contactPhone ? "border-red-500" : ""}
                />
                {errors.contactPhone && (
                  <p className="text-sm text-red-500">{errors.contactPhone}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Enter a valid phone number in the format (XXX) XXX-XXXX
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutOrganization">About Organization</Label>
                <Textarea
                  id="aboutOrganization"
                  value={formData.aboutOrganization}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveChanges('General')} 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Connect your social media accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input 
                  id="facebook" 
                  value={formData.facebook} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input 
                  id="instagram" 
                  value={formData.instagram} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input 
                  id="twitter" 
                  value={formData.twitter} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveChanges('Social Media')} 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div 
                        className="h-10 w-10 rounded-md cursor-pointer border"
                        style={{ backgroundColor: formData.primaryColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none">
                      <HexColorPicker 
                        color={formData.primaryColor} 
                        onChange={(color) => handleColorChange('primaryColor', color)} 
                      />
                    </PopoverContent>
                  </Popover>
                  <Input 
                    value={formData.primaryColor} 
                    className="w-32" 
                    onChange={(e) => handleColorChange('primaryColor', e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div 
                        className="h-10 w-10 rounded-md cursor-pointer border"
                        style={{ backgroundColor: formData.secondaryColor }}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none">
                      <HexColorPicker 
                        color={formData.secondaryColor} 
                        onChange={(color) => handleColorChange('secondaryColor', color)} 
                      />
                    </PopoverContent>
                  </Popover>
                  <Input 
                    value={formData.secondaryColor} 
                    className="w-32" 
                    onChange={(e) => handleColorChange('secondaryColor', e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="h-12 w-12 object-contain" />
                    ) : (
                      <Heart className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      ref={logoInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => logoInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload New Logo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
                    {formData.favicon ? (
                      <img src={formData.favicon} alt="Favicon" className="h-6 w-6 object-contain" />
                    ) : (
                      <Heart className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      ref={faviconInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFaviconUpload}
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => faviconInputRef.current?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload New Favicon
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveChanges('Appearance')} 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Homepage Layout</CardTitle>
              <CardDescription>Configure which sections appear on your homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hero Section</Label>
                  <p className="text-sm text-muted-foreground">Main banner at the top of the homepage</p>
                </div>
                <Switch 
                  checked={formData.showHeroSection} 
                  onCheckedChange={(checked) => handleSwitchChange('showHeroSection', checked)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Featured Sections</Label>
                  <p className="text-sm text-muted-foreground">Cards highlighting key areas of the site</p>
                </div>
                <Switch 
                  checked={formData.showFeaturedSections} 
                  onCheckedChange={(checked) => handleSwitchChange('showFeaturedSections', checked)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registration CTA</Label>
                  <p className="text-sm text-muted-foreground">Call to action for event registration</p>
                </div>
                <Switch 
                  checked={formData.showRegistrationCTA} 
                  onCheckedChange={(checked) => handleSwitchChange('showRegistrationCTA', checked)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sponsors Highlight</Label>
                  <p className="text-sm text-muted-foreground">Showcase of event sponsors</p>
                </div>
                <Switch 
                  checked={formData.showSponsorsHighlight} 
                  onCheckedChange={(checked) => handleSwitchChange('showSponsorsHighlight', checked)} 
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveChanges('Homepage Layout')} 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure automated emails sent to participants and administrators.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Registration Confirmation</Label>
                  <p className="text-sm text-muted-foreground">Send confirmation email when someone registers</p>
                </div>
                <Switch 
                  checked={formData.sendRegistrationConfirmation} 
                  onCheckedChange={(checked) => handleSwitchChange('sendRegistrationConfirmation', checked)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Donation Receipt</Label>
                  <p className="text-sm text-muted-foreground">Send receipt email for donations</p>
                </div>
                <Switch 
                  checked={formData.sendDonationReceipt} 
                  onCheckedChange={(checked) => handleSwitchChange('sendDonationReceipt', checked)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Event Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminder emails before the event</p>
                </div>
                <Switch 
                  checked={formData.sendEventReminders} 
                  onCheckedChange={(checked) => handleSwitchChange('sendEventReminders', checked)} 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Admin Notifications</Label>
                  <p className="text-sm text-muted-foreground">Notify admins of new registrations and donations</p>
                </div>
                <Switch 
                  checked={formData.sendAdminNotifications} 
                  onCheckedChange={(checked) => handleSwitchChange('sendAdminNotifications', checked)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationEmail">Notification Email</Label>
                <Input 
                  id="notificationEmail" 
                  type="email" 
                  value={formData.notificationEmail} 
                  onChange={handleInputChange} 
                />
                <p className="text-sm text-muted-foreground">Admin notifications will be sent to this email</p>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSaveChanges('Notifications')} 
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage users who have access to the admin panel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        name: "Admin User",
                        email: "admin@milesforhope.org",
                        role: "Administrator",
                        lastLogin: "Today, 11:32 AM",
                      },
                      {
                        name: "Sarah Johnson",
                        email: "sarah@milesforhope.org",
                        role: "Editor",
                        lastLogin: "Yesterday, 3:15 PM",
                      },
                      {
                        name: "Michael Chen",
                        email: "michael@milesforhope.org",
                        role: "Editor",
                        lastLogin: "Sep 22, 2023",
                      },
                      {
                        name: "David Kim",
                        email: "david@milesforhope.org",
                        role: "Viewer",
                        lastLogin: "Sep 20, 2023",
                      },
                    ].map((user, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          {user.name !== "Admin User" && (
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Roles</CardTitle>
              <CardDescription>Configure permissions for different user roles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Administrator</h3>
                <p className="text-sm text-muted-foreground mb-2">Full access to all features and settings</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Manage Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Edit Settings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Manage Content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Manage Registrations</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Editor</h3>
                <p className="text-sm text-muted-foreground mb-2">Can edit content and manage registrations</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Manage Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Edit Settings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Manage Content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Manage Registrations</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Viewer</h3>
                <p className="text-sm text-muted-foreground mb-2">Read-only access to data</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Manage Users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Edit Settings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Manage Content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Manage Registrations</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Edit Role Permissions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

