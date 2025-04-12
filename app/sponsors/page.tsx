"use client";

import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/app/context/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Building, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/app/context/settings-context";
import { useState } from "react";

export default function SponsorsPage() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t('sponsors.title')}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('sponsors.description')}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold mb-8 text-center">{t('sponsors.platinum.title')}</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                <Card className="flex flex-col items-center text-center p-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <Building className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">TechCorp</h3>
                  <p className="text-muted-foreground text-sm mb-2">{t('sponsors.sponsor')}</p>
                  <p className="text-muted-foreground mb-6">
                    {t('sponsors.platinum.techcorp.description')}
                  </p>
                  <Button variant="link" className="text-gray-600 mt-auto">
                    {t('sponsors.visitWebsite')}
                  </Button>
                </Card>

                <Card className="flex flex-col items-center text-center p-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <Building className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">HealthFirst</h3>
                  <p className="text-muted-foreground text-sm mb-2">{t('sponsors.sponsor')}</p>
                  <p className="text-muted-foreground mb-6">
                    {t('sponsors.platinum.healthfirst.description')}
                  </p>
                  <Button variant="link" className="text-gray-600 mt-auto">
                    {t('sponsors.visitWebsite')}
                  </Button>
                </Card>

                <Card className="flex flex-col items-center text-center p-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                    <Building className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">SportsFit</h3>
                  <p className="text-muted-foreground text-sm mb-2">{t('sponsors.sponsor')}</p>
                  <p className="text-muted-foreground mb-6">
                    {t('sponsors.platinum.sportsfit.description')}
                  </p>
                  <Button variant="link" className="text-gray-600 mt-auto">
                    {t('sponsors.visitWebsite')}
                  </Button>
                </Card>
              </div>

              <h2 className="text-2xl font-bold mb-8 text-center">{t('sponsors.gold.title')}</h2>
              <div className="grid gap-6 md:grid-cols-4 mb-16 justify-items-center">
                {['FitLife', 'SportsGear', 'WellnessPlus', 'GreenEnergy'].map((sponsor) => (
                  <Card key={sponsor} className="flex flex-col items-center text-center p-6 w-full">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-base font-semibold">{sponsor}</h3>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-8 text-center">{t('sponsors.silver.title')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-16 justify-items-center">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">{t('sponsors.silver.sponsor')} {i}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">{t('sponsors.become.title')}</h2>
                <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                  {t('sponsors.become.description')}
                </p>

                <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto justify-items-center">
                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>{t('sponsors.packages.platinum.title')}</CardTitle>
                      <CardDescription>{t('sponsors.packages.platinum.price')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        {['benefit1', 'benefit2', 'benefit3', 'benefit4', 'benefit5'].map((benefit) => (
                          <li key={benefit} className="flex items-center">
                            <span className="mr-2">•</span>
                            <span>{t(`sponsors.packages.platinum.${benefit}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        {t('sponsors.contactUs')}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>{t('sponsors.packages.gold.title')}</CardTitle>
                      <CardDescription>{t('sponsors.packages.gold.price')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        {['benefit1', 'benefit2', 'benefit3', 'benefit4'].map((benefit) => (
                          <li key={benefit} className="flex items-center">
                            <span className="mr-2">•</span>
                            <span>{t(`sponsors.packages.gold.${benefit}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        {t('sponsors.contactUs')}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>{t('sponsors.packages.silver.title')}</CardTitle>
                      <CardDescription>{t('sponsors.packages.silver.price')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        {['benefit1', 'benefit2', 'benefit3'].map((benefit) => (
                          <li key={benefit} className="flex items-center">
                            <span className="mr-2">•</span>
                            <span>{t(`sponsors.packages.silver.${benefit}`)}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        {t('sponsors.contactUs')}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    {t('sponsors.become.contact')}
                  </p>
                  <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Link href="/#contact" className="inline-flex items-center">
                      {t('sponsors.become.contactTeam')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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

