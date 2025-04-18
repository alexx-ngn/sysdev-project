"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      // Store authentication state
      localStorage.setItem("milesforhope-admin-auth", "true")
      localStorage.setItem("milesforhope-admin-info", JSON.stringify(data.admin))

      // Redirect to admin dashboard
      window.location.href = "/admin"
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkipAuth = () => {
    localStorage.setItem("milesforhope-admin-auth", "true")
    window.location.href = "/admin"
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

          <CardContent>
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

