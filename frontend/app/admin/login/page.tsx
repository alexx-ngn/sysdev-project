"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Mail, Lock, ArrowRight, ArrowLeft, Loader2, KeyRound } from "lucide-react"
import { setAuth } from "@/app/utils/auth"
import Cookies from 'js-cookie'
import { toast } from "sonner"
import { API_ENDPOINTS } from '@/app/config/api'

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [requires2FA, setRequires2FA] = useState(false)
  const [tempToken, setTempToken] = useState("")
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Clear any existing auth data when the login page is loaded
    localStorage.removeItem('milesforhope-admin-token');
    localStorage.removeItem('milesforhope-admin-info');
    Cookies.remove('milesforhope-admin-token');

    // Check if any admins exist
    const checkAdmins = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.ADMIN.CHECK, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          // Add credentials if your API requires it
          credentials: 'include',
        });

        if (!response.ok) {
          // If response is not ok, we'll still continue but log the error
          console.warn('Admin check failed:', response.status, response.statusText);
          setIsChecking(false);
          return;
        }

        const data = await response.json();
        
        // If no admins exist, redirect to register
        if (!data.has_admins) {
          router.replace('/admin/register');
          return;
        }
        
        setIsChecking(false);
      } catch (error) {
        // Log the error but don't prevent access to the login page
        console.error('Error checking admin status:', error);
        setIsChecking(false);
      }
    };

    checkAdmins();
  }, [router]);

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

  const handleSuccessfulLogin = (token: string, admin: any) => {
    setAuth(token, admin);
    Cookies.set('milesforhope-admin-token', token, { path: '/' });
    toast.success('Login successful');
    
    // Add a small delay to ensure state is updated before navigation
    setTimeout(() => {
      router.replace('/admin');
    }, 100);
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(API_ENDPOINTS.ADMIN.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      if (data.requires_2fa) {
        setRequires2FA(true)
        setTempToken(data.temp_token)
        setIsLoading(false)
        return
      }

      handleSuccessfulLogin(data.token, data.admin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login")
      setIsLoading(false)
    }
  }

  const handle2FAVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(API_ENDPOINTS.ADMIN.LOGIN_2FA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${tempToken}`
        },
        body: JSON.stringify({ email, code: verificationCode }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "2FA verification failed")
      }

      handleSuccessfulLogin(data.token, data.admin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "2FA verification failed")
      setIsLoading(false)
    }
  }

  const handleSkipAuth = () => {
    // Create mock admin data for development
    const mockToken = 'dev-mode-token';
    const mockAdmin = {
      id: 0,
      email: 'dev@milesforhope.org',
      name: 'Developer Mode'
    };

    // Use the same auth mechanism as regular login
    handleSuccessfulLogin(mockToken, mockAdmin);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Heart className="h-10 w-10 text-gray-800" />
          <span className="ml-2 text-2xl font-bold">MilesForHope</span>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Admin Authentication</CardTitle>
            <CardDescription className="text-center">
              {requires2FA ? "Enter your 2FA code" : "Secure access to the MilesForHope admin panel"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {!requires2FA ? (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@milesforhope.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Link href="/admin/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handle2FAVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode" className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Verification Code
                  </Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
                    {error}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify Code
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Button onClick={handleSkipAuth} variant="outline">
            Skip Authentication (Dev Mode)
          </Button>
        </div>

        <div className="mt-6 text-center">
          <div className="text-sm text-muted-foreground mb-2">
            Having trouble logging in?{" "}
            <Link href="#" className="text-primary hover:underline">
              Contact support
            </Link>
          </div>
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

