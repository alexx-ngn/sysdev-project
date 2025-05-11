"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeartHandshake, Shield, ArrowLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'
import { api, API_ENDPOINTS } from '@/lib/api'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  password_confirmation: string
}

export default function AdminRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<'registration' | '2fa'>('registration')
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    password_confirmation: '',
  })
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [secret, setSecret] = useState<string>('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAdmins = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ADMIN.CHECK, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to check admin status')
        }

        // If admins exist, redirect to login
        if (data.has_admins) {
          toast.error('Admin account already exists')
          router.replace('/admin/login')
          return
        }
        setIsChecking(false)
      } catch (error) {
        console.error('Error checking admin status:', error)
        setIsChecking(false)
      }
    }

    checkAdmins()
  }, [router])

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking system status...</p>
        </div>
      </div>
    )
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const data = await api.post(API_ENDPOINTS.ADMIN.REGISTER, formData)
      setQrCodeUrl(data.qr_code_url)
      setSecret(data.secret)
      setStep('2fa')
      toast.success('Registration successful! Please set up 2FA')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handle2FAVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const data = await api.post(API_ENDPOINTS.ADMIN.VERIFY_2FA, {
        email: formData.email,
        code: verificationCode,
      })

      toast.success('2FA setup complete! You can now log in')
      router.push('/admin/login')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '2FA verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <HeartHandshake className="h-10 w-10 text-gray-800" />
          <span className="ml-2 text-2xl font-bold">MilesForHope</span>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">
              {step === 'registration' ? 'Create Admin Account' : 'Set Up Two-Factor Authentication'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'registration' 
                ? 'Set up the first administrator account'
                : 'Scan the QR code with your authenticator app'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {step === 'registration' ? (
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="1234567890"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={formData.password_confirmation}
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <QRCodeSVG value={qrCodeUrl} size={200} />
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Or enter this code manually:</p>
                  <p className="font-mono bg-muted p-2 rounded-md mt-2">{secret}</p>
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
                      disabled={isLoading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </Button>
                </form>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-gray-900 hover:underline inline-flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Website
          </Link>
        </div>
      </div>
    </div>
  )
} 