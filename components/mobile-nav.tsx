import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 !bg-white border-r">
        <SheetHeader className="text-left">
          <SheetTitle className="text-gray-900">MilesForHope Run</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            About
          </Link>
          <Link
            href="/run"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            Charity Run
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            FAQ
          </Link>
          <Link
            href="/sponsors"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            Sponsors
          </Link>
          <Link
            href="/donate"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            Donate
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            Contact
          </Link>
          <div className="pt-4">
            <Button asChild className="w-full bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 