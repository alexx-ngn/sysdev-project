"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/app/context/language-context";

export function Navbar() {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-background/80">
      <div className="container max-w-[1400px] mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
        <div className="flex gap-6 md:gap-10">
          <MobileNav />
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="inline-block font-bold">MilesForHope</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground nav-link"
            >
              {t('nav.about')}
            </Link>
            <Link
              href="/run"
              className="flex items-center text-sm font-medium text-muted-foreground nav-link"
            >
              {t('nav.charityRun')}
            </Link>
            <Link
              href="/faq"
              className="flex items-center text-sm font-medium text-muted-foreground nav-link"
            >
              {t('nav.faq')}
            </Link>
            <Link
              href="/sponsors"
              className="flex items-center text-sm font-medium text-muted-foreground nav-link"
            >
              {t('nav.sponsors')}
            </Link>
            <Link
              href="/donate"
              className="flex items-center text-sm font-medium text-muted-foreground nav-link"
            >
              {t('nav.donate')}
            </Link>
            <Link
              href="/contact"
              className="flex items-center text-sm font-medium text-muted-foreground nav-link"
            >
              {t('nav.contact')}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button
            asChild
            className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90"
          >
            <Link href="/register">{t('nav.register')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 