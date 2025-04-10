"use client";

import Link from "next/link"
import { Heart, DollarSign, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/app/context/language-context"

export default function DonatePage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t('donate.title')} <span className="text-primary">{t('donate.titleHighlight')}</span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('donate.description')}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2 mb-16">
                <Card className="flex flex-col">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <DollarSign className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle>{t('donate.oneTime.title')}</CardTitle>
                    <CardDescription>{t('donate.oneTime.subtitle')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4">
                      {t('donate.oneTime.description')}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <Button variant="outline">$25</Button>
                      <Button variant="outline">$50</Button>
                      <Button variant="outline">$100</Button>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="custom-amount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.oneTime.customAmount')}
                      </label>
                      <Input 
                        id="custom-amount" 
                        type="number" 
                        placeholder={t('donate.oneTime.enterAmount')} 
                        min="1" 
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">{t('donate.oneTime.button')}</Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{t('donate.sponsor.title')}</CardTitle>
                    <CardDescription>{t('donate.sponsor.subtitle')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4">
                      {t('donate.sponsor.description')}
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>{t('donate.sponsor.benefit1')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>{t('donate.sponsor.benefit2')}</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>{t('donate.sponsor.benefit3')}</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/90" asChild>
                      <Link href="/sponsors">{t('donate.sponsor.button')}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="border-t pt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('donate.impact.title')}</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">$25</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{t('donate.impact.supplies.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('donate.impact.supplies.description')}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">$50</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{t('donate.impact.research.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('donate.impact.research.description')}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">$100</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{t('donate.impact.equipment.title')}</h3>
                    <p className="text-muted-foreground">
                      {t('donate.impact.equipment.description')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('donate.contact.title')}</h2>
                <p className="text-center text-muted-foreground mb-8">
                  {t('donate.contact.description')}
                </p>
                <form className="max-w-2xl mx-auto grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.name')}
                      </label>
                      <Input id="name" placeholder={t('donate.contact.namePlaceholder')} />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.email')}
                      </label>
                      <Input id="email" type="email" placeholder={t('donate.contact.emailPlaceholder')} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('donate.contact.message')}
                    </label>
                    <Textarea id="message" placeholder={t('donate.contact.messagePlaceholder')} />
                  </div>
                  <Button type="submit">{t('donate.contact.button')}</Button>
                </form>
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
                <span className="text-lg font-bold">{t('footer.milesForHope')}</span>
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
  );
}

