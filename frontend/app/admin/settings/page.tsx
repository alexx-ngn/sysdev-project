'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Heart, Plus, CheckCircle, X, Upload, Loader2, QrCode } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSettings } from "@/app/context/settings-context"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { handleFileUpload } from "@/lib/upload-utils"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { API_ENDPOINTS } from "@/app/config/api"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { QRCodeSVG } from 'qrcode.react'

interface AdminUser {
  AdminID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  '2FASecret': string | null;
  updated_at: string;
}

export default function SettingsPage() {
  const { settings, updateSettings, isLoading } = useSettings()
  const [formData, setFormData] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [isLoadingAdmins, setIsLoadingAdmins] = useState(false)
  const [adminError, setAdminError] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editFormData, setEditFormData] = useState<Partial<AdminUser>>({})
  const [isUpdating, setIsUpdating] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addFormData, setAddFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
    Password_confirmation: '',
  })
  const [isAdding, setIsAdding] = useState(false)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [qrCodeData, setQrCodeData] = useState<{
    qr_code_url: string;
    secret: string;
    admin: AdminUser;
  } | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false
  })
  const [activeTab, setActiveTab] = useState('general')
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({
    general: false,
    social: false,
    appearance: false,
    layout: false,
    notifications: false
  })
  const [verifyingStates, setVerifyingStates] = useState<Record<string, boolean>>({
    general: false,
    social: false,
    appearance: false,
    layout: false,
    notifications: false
  })
  const [verificationResults, setVerificationResults] = useState<Record<string, { success: boolean; message: string }>>({})

  // Fetch admin users
  const fetchAdminUsers = async () => {
    setIsLoadingAdmins(true)
    setAdminError(null)
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN.LIST}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch admin users')
      }

      const data = await response.json()
      setAdminUsers(data.admins)
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : 'Failed to fetch admin users')
      toast.error('Failed to fetch admin users')
    } finally {
      setIsLoadingAdmins(false)
    }
  }

  // Fetch admin users on component mount
  useEffect(() => {
    fetchAdminUsers()
  }, [])

  // Format date to local string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

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
      async (url) => {
        const updatedSettings = { ...formData, favicon: url }
        setFormData(updatedSettings)
        await updateSettings({ favicon: url })
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

    // Validate admin email
    if (!validateEmail(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid admin email address'
    }

    // Validate notification email if notifications are enabled
    if (formData.sendAdminNotifications && !validateEmail(formData.notificationEmail)) {
      newErrors.notificationEmail = 'Please enter a valid notification email address'
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

  // Handle edit admin user
  const handleEditUser = (user: AdminUser) => {
    setEditingUser(user)
    setEditFormData({
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
    })
    setIsEditModalOpen(true)
  }

  // Handle edit form changes
  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle edit form submission
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingUser) return

    setIsUpdating(true)
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN.UPDATE}/${editingUser.AdminID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
        },
        body: JSON.stringify(editFormData),
      })

      if (!response.ok) {
        throw new Error('Failed to update admin user')
      }

      await fetchAdminUsers()
      setIsEditModalOpen(false)
      toast.success('Admin user updated successfully')
    } catch (error) {
      toast.error('Failed to update admin user')
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle remove admin user
  const handleRemoveUser = async (userId: number) => {
    if (!confirm('Are you sure you want to remove this admin user?')) {
      return
    }

    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN.DELETE}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to remove admin user')
      }

      // Refresh the admin users list
      await fetchAdminUsers()
      toast.success('Admin user removed successfully')
    } catch (error) {
      toast.error('Failed to remove admin user')
    }
  }

  // Handle add form changes
  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddFormData(prev => ({ ...prev, [name]: value }))

    // Update password validation checks
    if (name === 'Password') {
      setPasswordChecks(prev => ({
        ...prev,
        length: value.length >= 12,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        match: value === addFormData.Password_confirmation
      }))
    } else if (name === 'Password_confirmation') {
      setPasswordChecks(prev => ({
        ...prev,
        match: value === addFormData.Password
      }))
    }
  }

  // Handle add form submission
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if all password requirements are met
    if (!Object.values(passwordChecks).every(check => check)) {
      toast.error('Please meet all password requirements')
      return
    }

    setIsAdding(true)
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
        },
        body: JSON.stringify(addFormData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to add admin user')
      }

      const responseData = await response.json()
      
      // Show QR code for 2FA setup if provided
      if (responseData.qr_code_url) {
        setQrCodeData({
          qr_code_url: responseData.qr_code_url,
          secret: responseData.secret,
          admin: responseData.admin,
        })
        setShow2FAModal(true)
      }

      await fetchAdminUsers()
      setIsAddModalOpen(false)
      setAddFormData({
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        Password_confirmation: '',
      })
      setPasswordChecks({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        match: false
      })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add admin user')
    } finally {
      setIsAdding(false)
    }
  }

  // Handle 2FA verification
  const handle2FAVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!qrCodeData) return

    setIsVerifying(true)
    try {
      const response = await fetch(`${API_ENDPOINTS.ADMIN.VERIFY_2FA}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('milesforhope-admin-token')}`,
        },
        body: JSON.stringify({
          email: qrCodeData.admin.Email,
          code: verificationCode,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to verify 2FA code')
      }

      setShow2FAModal(false)
      setQrCodeData(null)
      setVerificationCode('')
      toast.success('Admin user added successfully')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify 2FA code')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSave = async (section: string, sectionSettings: any) => {
    try {
      setSavingStates(prev => ({ ...prev, [section]: true }));
      let payload = {};
      if (section === 'general') {
        payload = {
          organizationName: sectionSettings.organizationName,
          eventName: sectionSettings.eventName,
          contactEmail: sectionSettings.contactEmail,
          contactPhone: sectionSettings.contactPhone,
          address: sectionSettings.address,
          aboutOrganization: sectionSettings.aboutOrganization,
        };
      } else if (section === 'social') {
        payload = {
          facebook: sectionSettings.facebook,
          instagram: sectionSettings.instagram,
          twitter: sectionSettings.twitter,
        };
      } else if (section === 'appearance') {
        payload = {
          primaryColor: sectionSettings.primaryColor,
          secondaryColor: sectionSettings.secondaryColor,
          logo: sectionSettings.logo,
          favicon: sectionSettings.favicon,
        };
      } else if (section === 'layout') {
        payload = {
          showHeroSection: sectionSettings.showHeroSection,
          showFeaturedSections: sectionSettings.showFeaturedSections,
          showRegistrationCTA: sectionSettings.showRegistrationCTA,
          showSponsorsHighlight: sectionSettings.showSponsorsHighlight,
        };
      } else if (section === 'notifications') {
        payload = {
          sendRegistrationConfirmation: sectionSettings.sendRegistrationConfirmation,
          sendDonationReceipt: sectionSettings.sendDonationReceipt,
          sendEventReminders: sectionSettings.sendEventReminders,
          sendAdminNotifications: sectionSettings.sendAdminNotifications,
          notificationEmail: sectionSettings.notificationEmail,
        };
      }
      await updateSettings(payload);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSavingStates(prev => ({ ...prev, [section]: false }));
    }
  };

  const handleVerify = async (section: string) => {
    try {
      setVerifyingStates(prev => ({ ...prev, [section]: true }));
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVerificationResults(prev => ({
        ...prev,
        [section]: { success: true, message: 'Settings verified successfully' }
      }));
    } catch (error) {
      setVerificationResults(prev => ({
        ...prev,
        [section]: { success: false, message: 'Verification failed' }
      }));
    } finally {
      setVerifyingStates(prev => ({ ...prev, [section]: false }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings.general}
            onSave={(sectionSettings) => handleSave('general', sectionSettings)}
            onVerify={() => handleVerify('general')}
            isSaving={savingStates.general}
            isVerifying={verifyingStates.general}
            verificationResult={verificationResults.general}
          />
        );
      case 'social':
        return (
          <SocialMediaSettings
            settings={settings.social}
            onSave={(sectionSettings) => handleSave('social', sectionSettings)}
            onVerify={() => handleVerify('social')}
            isSaving={savingStates.social}
            isVerifying={verifyingStates.social}
            verificationResult={verificationResults.social}
          />
        );
      case 'appearance':
        return (
          <AppearanceSettings
            settings={settings.appearance}
            onSave={(sectionSettings) => handleSave('appearance', sectionSettings)}
            onVerify={() => handleVerify('appearance')}
            isSaving={savingStates.appearance}
            isVerifying={verifyingStates.appearance}
            verificationResult={verificationResults.appearance}
          />
        );
      case 'layout':
        return (
          <LayoutSettings
            settings={settings.layout}
            onSave={(sectionSettings) => handleSave('layout', sectionSettings)}
            onVerify={() => handleVerify('layout')}
            isSaving={savingStates.layout}
            isVerifying={verifyingStates.layout}
            verificationResult={verificationResults.layout}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings.notifications}
            onSave={(sectionSettings) => handleSave('notifications', sectionSettings)}
            onVerify={() => handleVerify('notifications')}
            isSaving={savingStates.notifications}
            isVerifying={verifyingStates.notifications}
            verificationResult={verificationResults.notifications}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your website and event settings.</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex w-full overflow-x-auto space-x-2 p-1">
          <TabsTrigger value="general" className="shrink-0">General</TabsTrigger>
          <TabsTrigger value="appearance" className="shrink-0">Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="shrink-0">Notifications</TabsTrigger>
          <TabsTrigger value="users" className="shrink-0">Users</TabsTrigger>
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
                <Label htmlFor="contactEmail">Admin Email</Label>
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
                  This email will be used for admin communications
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
                  onClick={() => handleSave('general', formData)} 
                  disabled={savingStates.general}
                >
                  {savingStates.general ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
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
                  onClick={() => handleSave('social', formData)} 
                  disabled={savingStates.social}
                >
                  {savingStates.social ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
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
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="showHeroSection"
                      checked={formData.showHeroSection}
                      onChange={(e) => handleSwitchChange('showHeroSection', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="showHeroSection" className="text-base cursor-pointer">Hero Section</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Main banner at the top of the homepage</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="showFeaturedSections"
                      checked={formData.showFeaturedSections}
                      onChange={(e) => handleSwitchChange('showFeaturedSections', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="showFeaturedSections" className="text-base cursor-pointer">Featured Sections</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Cards highlighting key areas of the site</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="showRegistrationCTA"
                      checked={formData.showRegistrationCTA}
                      onChange={(e) => handleSwitchChange('showRegistrationCTA', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="showRegistrationCTA" className="text-base cursor-pointer">Registration CTA</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Call to action for event registration</p>
                </div>
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
              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="sendRegistrationConfirmation"
                      checked={formData.sendRegistrationConfirmation}
                      onChange={(e) => handleSwitchChange('sendRegistrationConfirmation', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="sendRegistrationConfirmation" className="text-base cursor-pointer">Registration Confirmation</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Send confirmation email when someone registers</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="sendDonationReceipt"
                      checked={formData.sendDonationReceipt}
                      onChange={(e) => handleSwitchChange('sendDonationReceipt', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="sendDonationReceipt" className="text-base cursor-pointer">Donation Receipt</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Send receipt email for donations</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="sendEventReminders"
                      checked={formData.sendEventReminders}
                      onChange={(e) => handleSwitchChange('sendEventReminders', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="sendEventReminders" className="text-base cursor-pointer">Event Reminders</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Send reminder emails before the event</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="sendAdminNotifications"
                      checked={formData.sendAdminNotifications}
                      onChange={(e) => handleSwitchChange('sendAdminNotifications', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="sendAdminNotifications" className="text-base cursor-pointer">Admin Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">Notify admins of new registrations and donations</p>
                </div>
                {formData.sendAdminNotifications && (
                  <div className="ml-4 w-72">
                    <Input 
                      id="notificationEmail" 
                      type="email" 
                      value={formData.notificationEmail} 
                      onChange={handleInputChange}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address (e.g., example@domain.com)"
                      placeholder="Notification email"
                      required
                      className={errors.notificationEmail ? "border-red-500" : ""}
                    />
                    {errors.notificationEmail && (
                      <p className="text-sm text-red-500 mt-1">{errors.notificationEmail}</p>
                    )}
                  </div>
                )}
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
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingAdmins ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="ml-2">Loading admin users...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : adminError ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-red-500">
                          {adminError}
                        </TableCell>
                      </TableRow>
                    ) : adminUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                          No admin users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      adminUsers.map((user) => (
                        <TableRow key={user.AdminID}>
                          <TableCell className="font-medium">{user.FirstName}</TableCell>
                          <TableCell>{user.LastName}</TableCell>
                          <TableCell>{user.Email}</TableCell>
                          <TableCell>{user.PhoneNumber}</TableCell>
                          <TableCell>{formatDate(user.updated_at)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditUser(user)}
                            >
                              Edit
                            </Button>
                            {user.Email !== "dev@milesforhope.org" && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveUser(user.AdminID)}
                              >
                                Remove
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-end">
                <Button 
                  className="flex items-center gap-2"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>
              Update the admin user's information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="FirstName">First Name</Label>
              <Input
                id="FirstName"
                name="FirstName"
                value={editFormData.FirstName || ''}
                onChange={handleEditFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="LastName">Last Name</Label>
              <Input
                id="LastName"
                name="LastName"
                value={editFormData.LastName || ''}
                onChange={handleEditFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input
                id="Email"
                name="Email"
                type="email"
                value={editFormData.Email || ''}
                onChange={handleEditFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="PhoneNumber">Phone Number</Label>
              <Input
                id="PhoneNumber"
                name="PhoneNumber"
                value={editFormData.PhoneNumber || ''}
                onChange={handleEditFormChange}
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Updating...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Admin User</DialogTitle>
            <DialogDescription>
              Create a new admin user account.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="addFirstName">First Name</Label>
              <Input
                id="addFirstName"
                name="FirstName"
                value={addFormData.FirstName}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addLastName">Last Name</Label>
              <Input
                id="addLastName"
                name="LastName"
                value={addFormData.LastName}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addEmail">Email</Label>
              <Input
                id="addEmail"
                name="Email"
                type="email"
                value={addFormData.Email}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addPhoneNumber">Phone Number</Label>
              <Input
                id="addPhoneNumber"
                name="PhoneNumber"
                value={addFormData.PhoneNumber}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addPassword">Password</Label>
              <Input
                id="addPassword"
                name="Password"
                type="password"
                value={addFormData.Password}
                onChange={handleAddFormChange}
                required
                minLength={12}
              />
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`h-4 w-4 ${passwordChecks.length ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${passwordChecks.length ? 'text-green-500' : 'text-gray-500'}`}>
                    At least 12 characters long
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`h-4 w-4 ${passwordChecks.uppercase ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${passwordChecks.uppercase ? 'text-green-500' : 'text-gray-500'}`}>
                    Contains uppercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`h-4 w-4 ${passwordChecks.lowercase ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${passwordChecks.lowercase ? 'text-green-500' : 'text-gray-500'}`}>
                    Contains lowercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`h-4 w-4 ${passwordChecks.number ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${passwordChecks.number ? 'text-green-500' : 'text-gray-500'}`}>
                    Contains number
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className={`h-4 w-4 ${passwordChecks.special ? 'text-green-500' : 'text-gray-400'}`} />
                  <span className={`text-sm ${passwordChecks.special ? 'text-green-500' : 'text-gray-500'}`}>
                    Contains special character
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="addPasswordConfirmation">Confirm Password</Label>
              <Input
                id="addPasswordConfirmation"
                name="Password_confirmation"
                type="password"
                value={addFormData.Password_confirmation}
                onChange={handleAddFormChange}
                required
              />
              <div className="flex items-center space-x-2 mt-2">
                <CheckCircle className={`h-4 w-4 ${passwordChecks.match ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${passwordChecks.match ? 'text-green-500' : 'text-gray-500'}`}>
                  Passwords match
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isAdding}>
                {isAdding ? 'Adding...' : 'Add User'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2FA Setup Modal */}
      <Dialog open={show2FAModal} onOpenChange={setShow2FAModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app to set up 2FA for {qrCodeData?.admin.FirstName} {qrCodeData?.admin.LastName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex justify-center">
              {qrCodeData?.qr_code_url ? (
                <QRCodeSVG value={qrCodeData.qr_code_url} size={200} />
              ) : (
                <QrCode className="w-48 h-48 text-gray-300" />
              )}
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>Or enter this code manually:</p>
              <p className="font-mono bg-muted p-2 rounded-md mt-2">{qrCodeData?.secret}</p>
            </div>

            <form onSubmit={handle2FAVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                  disabled={isVerifying}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}