"use client";

import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/app/context/language-context"

export default function Home() {
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
            <Button asChild className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
              <Link href="/register">{t('nav.register')}</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
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
                  <Button asChild size="lg" className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
                    <Link href="/register">{t('hero.register')}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/20">
                    <Link href="/run">{t('hero.learnMore')}</Link>
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

        {/* Featured Sections */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <Card className="flex flex-col border-pastel-blue">
                <CardHeader>
                  <CardTitle>{t('featured.about.title')}</CardTitle>
                  <CardDescription>{t('featured.about.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    {t('featured.about.content')}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/20">
                    <Link href="/about">{t('featured.about.readMore')}</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-pastel-yellow">
                <CardHeader>
                  <CardTitle>{t('featured.run.title')}</CardTitle>
                  <CardDescription>{t('featured.run.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    {t('featured.run.content')}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/20">
                    <Link href="/run">{t('featured.run.viewDetails')}</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-pastel-blue">
                <CardHeader>
                  <CardTitle>{t('featured.involved.title')}</CardTitle>
                  <CardDescription>{t('featured.involved.description')}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    {t('featured.involved.content')}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/20">
                    <Link href="/donate">{t('featured.involved.support')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t('cta.title')}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('cta.description')}
                </p>
              </div>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
                  <Link href="/register">{t('cta.register')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Highlight */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('sponsors.title')}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('sponsors.description')}
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
                <Button asChild className="bg-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/90">
                  <Link href="/sponsors">{t('sponsors.viewAll')}</Link>
                </Button>
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
                <Heart className="h-6 w-6 text-pink-500" />
                <span className="text-lg font-bold">MilesForHope Run</span>
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
    </div>
  )
}

