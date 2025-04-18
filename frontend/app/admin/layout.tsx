"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Heart, Users, DollarSign, Award, Settings, BarChart, Calendar, LogOut, Menu, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/context/auth-context"
import { getAuthToken } from "@/app/utils/auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, checkAuth, logout } = useAuth()

  // Check if we're on the login page, register page, or forgot password page
  const isAuthPage = pathname === "/admin/login" || 
                    pathname === "/admin/register" || 
                    pathname === "/admin/forgot-password"

  useEffect(() => {
    const checkAuthAndAdmins = async () => {
      try {
        // Skip checks for auth pages
        if (isAuthPage) {
          setIsChecking(false)
          return
        }

        // First check authentication
        const isAuth = checkAuth()

        // If not authenticated, redirect to login
        if (!isAuth) {
          router.replace("/admin/login")
          setIsChecking(false)
          return
        }

        // Only check admin status if authenticated and not on an auth page
        const response = await fetch('http://localhost:8000/api/admin/check', {
          headers: {
            'Authorization': `Bearer ${getAuthToken()}`
          }
        })
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to check admin status')
        }

        // If no admins exist, redirect to register
        if (!data.has_admins) {
          router.replace('/admin/register')
          return
        }

        // If on register page and admins exist, redirect to login
        if (pathname === '/admin/register' && data.has_admins) {
          router.replace('/admin/login')
          return
        }
      } catch (error) {
        console.error("Error during auth check:", error)
        // On error, redirect to login if not on an auth page
        if (!isAuthPage) {
          router.replace("/admin/login")
        }
      } finally {
        setIsChecking(false)
      }
    }

    checkAuthAndAdmins()
  }, [pathname, isAuthPage]) // Only re-run when pathname or isAuthPage changes

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

  // If we're on an auth page, just render the children without the admin layout
  if (isAuthPage) {
    return <>{children}</>
  }

  // If not authenticated, show loading state (will be redirected by the effect)
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout() // Use the auth context's logout function
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-gray-800/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
          <button className="p-1 rounded-md hover:bg-gray-800 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <BarChart className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/registrations"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Users className="h-5 w-5" />
                <span>Registrations</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/donations"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <DollarSign className="h-5 w-5" />
                <span>Donations</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/sponsors"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Award className="h-5 w-5" />
                <span>Sponsors</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/events"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Calendar className="h-5 w-5" />
                <span>Event Management</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white border-b h-16 flex items-center px-4 lg:px-6 shadow-sm">
          <button className="p-2 rounded-md hover:bg-gray-100 lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <h1 className="text-xl font-semibold">MilesForHope Admin</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">A</span>
              </div>
              <span className="text-sm font-medium hidden sm:inline">Admin User</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

