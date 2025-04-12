"use client";

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
import { useLanguage } from "@/app/context/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useSettings } from "@/app/context/settings-context"

export function MobileNav() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  
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
          <SheetTitle className="text-gray-900">{settings.eventName}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-6">
          <Link
            href="/about"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            {t('nav.about')}
          </Link>
          <Link
            href="/run"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            {t('nav.charityRun')}
          </Link>
          <Link
            href="/faq"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            {t('nav.faq')}
          </Link>
          <Link
            href="/sponsors"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            {t('nav.sponsors')}
          </Link>
          <Link
            href="/donate"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            {t('nav.donate')}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-900 nav-link"
          >
            {t('nav.contact')}
          </Link>
          <div className="flex flex-col gap-4 pt-4">
            <div className="flex justify-center">
              <LanguageSwitcher />
            </div>
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/register">{t('nav.register')}</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 