import type React from "react"
import Link from "next/link"
import { Heart, Users, DollarSign, Award, Settings, BarChart, Calendar, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/admin"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <BarChart className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/registrations"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Registrations</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/donations"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <DollarSign className="h-5 w-5" />
                <span>Donations</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/sponsors"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Award className="h-5 w-5" />
                <span>Sponsors</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/events"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>Event Management</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
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
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-16 flex items-center px-6">
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
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  )
}

