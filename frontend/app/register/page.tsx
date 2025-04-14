"use client";

import Link from "next/link"
import { Heart, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistrationForm } from "../components/registration-form"
import { MobileNav } from "@/components/mobile-nav"
import { useLanguage } from '@/app/context/language-context'
import { LanguageSwitcher } from "@/components/language-switcher"
import { WebsiteSettings } from "@/app/components/website-settings"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"

export default function RegisterPage() {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <WebsiteSettings />
      <Header />

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

      <Footer />
    </div>
  )
}

