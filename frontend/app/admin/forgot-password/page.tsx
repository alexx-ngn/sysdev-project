"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/admin/forgot-password', {
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Heart className="h-10 w-10 text-gray-800" />
          <span className="ml-2 text-2xl font-bold">MilesForHope</span>
        </div>

        <Card className="border-2">
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
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Recovery Instructions"
                  )}
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/admin/login">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Back to Login
                  </Link>
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We've sent password recovery instructions to:
                  <br />
                  <strong className="text-foreground">{email}</strong>
                </p>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/admin/login">
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                    Return to Login
                  </Link>
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="mt-6 text-center">
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