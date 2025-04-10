"use client";

import Link from "next/link"
import { Heart, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistrationForm } from "../components/registration-form"
import { MobileNav } from "@/components/mobile-nav"
import { useLanguage } from '@/app/context/language-context'
import { LanguageSwitcher } from "@/components/language-switcher"

export default function RegisterPage() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-background/80">
        <div className="container max-w-[1400px] mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <div className="flex gap-6 md:gap-10">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="inline-block font-bold">MilesForHope</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/about" className="text-sm font-medium nav-link">
                {t('nav.about')}
              </Link>
              <Link href="/run" className="text-sm font-medium nav-link">
                {t('nav.charityRun')}
              </Link>
              <Link href="/faq" className="text-sm font-medium nav-link">
                {t('nav.faq')}
              </Link>
              <Link href="/sponsors" className="text-sm font-medium nav-link">
                {t('nav.sponsors')}
              </Link>
              <Link href="/donate" className="text-sm font-medium nav-link">
                {t('nav.donate')}
              </Link>
              <Link href="/contact" className="text-sm font-medium nav-link">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
              <Link href="/register">{t('nav.register')}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  <span className="text-primary">{t('register.title')}</span> {t('register.titleHighlight')}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('register.description')}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2 mb-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('register.eventDetails.title')}</h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <Calendar className="h-6 w-6 text-gray-600" />
                        </div>
                        <CardTitle>{t('register.eventDetails.dateTime.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{t('register.eventDetails.dateTime.value1')}</p>
                        <p>{t('register.eventDetails.dateTime.value2')}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <MapPin className="h-6 w-6 text-gray-600" />
                        </div>
                        <CardTitle>{t('register.eventDetails.location.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{t('register.eventDetails.location.value1')}</p>
                        <p>{t('register.eventDetails.location.value2')}</p>
                        <p>{t('register.eventDetails.location.value3')}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">{t('register.includes.title')}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('register.includes.item1')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('register.includes.item2')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('register.includes.item3')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('register.includes.item4')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('register.includes.item5')}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">{t('register.form.title')}</h2>
                  <RegistrationForm />
                </div>
              </div>

              <div className="border-t pt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('register.faq.title')}</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold mb-2">{t('register.faq.q1.question')}</h3>
                    <p className="text-muted-foreground">
                      {t('register.faq.q1.answer')}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">{t('register.faq.q2.question')}</h3>
                    <p className="text-muted-foreground">
                      {t('register.faq.q2.answer')}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">{t('register.faq.q3.question')}</h3>
                    <p className="text-muted-foreground">
                      {t('register.faq.q3.answer')}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">{t('register.faq.q4.question')}</h3>
                    <p className="text-muted-foreground">
                      {t('register.faq.q4.answer')}
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    {t('register.faq.moreQuestions')}
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <Button asChild variant="outline">
                      <Link href="/faq">{t('register.faq.viewAll')}</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/#contact">{t('register.faq.contact')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container max-w-[1400px] mx-auto flex flex-col gap-6 py-8 md:py-12 lg:py-16 px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-gray-800" />
                <span className="text-lg font-bold">{t('footer.organization')}</span>
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
                    {t('footer.about')}
                  </Link>
                </li>
                <li>
                  <Link href="/run" className="text-sm text-muted-foreground hover:text-gray-800">
                    {t('footer.charityRun')}
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-gray-800">
                    {t('footer.faq')}
                  </Link>
                </li>
                <li>
                  <Link href="/sponsors" className="text-sm text-muted-foreground hover:text-gray-800">
                    {t('footer.sponsors')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">{t('footer.resources')}</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/donate" className="text-sm text-muted-foreground hover:text-gray-800">
                    {t('footer.donate')}
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-sm text-muted-foreground hover:text-gray-800">
                    {t('footer.register')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-gray-800">
                    {t('footer.contact')}
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
    </div>
  )
}

