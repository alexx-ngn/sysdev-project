"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslations, useLocale } from 'next-intl'
import { useSettings } from "@/app/context/settings-context"
import { WebsiteSettings } from "@/app/components/website-settings"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import Link from "next/link"

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const { settings } = useSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <WebsiteSettings />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        {settings.showHeroSection && (
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
            <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      {t('hero.title')}
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      {t('hero.description')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href={`/${locale}/register`}>{t('hero.register')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/20">
                      <Link href={`/${locale}/run`}>{t('hero.learnMore')}</Link>
                    </Button>
                  </div>
                </div>
                <div className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover sm:w-[100%] lg:order-last">
                  <div className="w-full h-full flex items-center justify-center">
                    <img src="/images/illustrations/openpeeps1.png" alt="Open Peeps Illustration" className="w-[100%] h-[100%] object-contain scale-125" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Sections */}
        {settings.showFeaturedSections && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <CardTitle>{t('about.mission.title')}</CardTitle>
                    <CardDescription>{t('about.mission.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      {t('about.mission.description')}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/20">
                      <Link href={`/${locale}/about`}>{t('nav.about')}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <CardTitle>{t('nav.charityRun')}</CardTitle>
                    <CardDescription>{t('hero.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      {t('hero.description')}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/20">
                      <Link href={`/${locale}/run`}>{t('nav.charityRun')}</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <CardTitle>{t('nav.donate')}</CardTitle>
                    <CardDescription>{t('nav.donate')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      {t('nav.donate')}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/20">
                      <Link href={`/${locale}/donate`}>{t('nav.donate')}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Registration CTA Section */}
        {settings.showRegistrationCTA && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
            <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
              <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    {t('hero.title')}
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t('hero.description')}
                  </p>
                </div>
                <div className="mt-6">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href={`/${locale}/register`}>{t('hero.register')}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Sponsors Highlight */}
        {settings.showSponsorsHighlight && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
            <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('nav.sponsors')}</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t('nav.sponsors')}
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg w-32 h-32 flex items-center justify-center">
                      <span className="text-gray-400 font-bold">Sponsor {i}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Link href={`/${locale}/sponsors`}>{t('nav.sponsors')}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
} 