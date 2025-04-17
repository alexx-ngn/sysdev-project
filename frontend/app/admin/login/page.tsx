"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, Shield, Mail, Lock, KeyRound, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"credentials" | "2fa">("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const router = useRouter()

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep("2fa")
    }, 1000)
  }

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Set authentication flag in localStorage
      localStorage.setItem("milesforhope-admin-auth", "true")
      console.log("Auth flag set after 2FA:", localStorage.getItem("milesforhope-admin-auth"))
      router.replace("/admin")
    }, 1000)
  }

  const handleSkipAuth = () => {
    // Set auth flag and redirect immediately
    localStorage.setItem("milesforhope-admin-auth", "true")
    console.log("Auth flag set:", localStorage.getItem("milesforhope-admin-auth"))
    router.replace("/admin")
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
            <CardDescription className="text-center">Secure access to the MilesForHope admin panel</CardDescription>
          </CardHeader>

          {step === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@milesforhope.org"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <Link href="/admin/forgot-password" replace className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
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
              </CardFooter>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit}>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                  <p>A verification code has been sent to your email and authenticator app.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="2fa-code" className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Two-Factor Authentication Code
                  </Label>
                  <Input
                    id="2fa-code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="ghost" type="button" onClick={() => setStep("credentials")} disabled={isLoading}>
                    Back
                  </Button>
                  <Button variant="link" type="button" className="text-sm" disabled={isLoading}>
                    Resend code
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading || code.length !== 6}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify and Login"
                  )}
                </Button>
              </CardFooter>
            </form>
          )}
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
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Return to Website
          </Link>
        </div>
      </div>
    </div>
  )
}

