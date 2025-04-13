"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { useLanguage } from "@/app/context/language-context"
import { useSettings } from "@/app/context/settings-context"

export function Footer() {
  const { t } = useLanguage()
  const { settings } = useSettings()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container max-w-[1400px] mx-auto flex flex-col gap-6 py-8 md:py-12 lg:py-16 px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {settings.logo ? (
                <img src={settings.logo} alt={settings.organizationName} className="h-6 w-6 object-contain" />
              ) : (
                <Heart className="h-6 w-6 text-primary" />
              )}
              <span className="text-lg font-bold">{settings.organizationName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/run" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.charityRun')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.sponsors')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/donate" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.donate')}
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.register')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-gray-800">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  )
} 