"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { API_BASE_URL } from '@/app/config/api'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Recovery instructions have been sent to your email")
      } else {
        throw new Error(data.message || 'Failed to process request');
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to process request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex items-center justify-center text-2xl font-bold mb-8">
        <Heart className="h-10 w-10" />
        <span className="ml-2">MilesForHope</span>
      </div>

      <Card className="w-full max-w-md border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Password Recovery</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you instructions to reset your password
          </CardDescription>
        </CardHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@milesforhope.org"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Recovery Instructions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link href="/admin/login" className="flex items-center justify-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Link>
                </Button>
              </div>
            </CardContent>
          </form>
        ) : (
          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Check your email</h3>
                  <div className="mt-2 text-sm text-green-700">
                    We've sent recovery instructions to your email address. Please check your inbox and follow the instructions to reset your password.
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <Link href="/admin/login" className="flex items-center justify-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardContent>
        )}
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
  )
} 