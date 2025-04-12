"use client";

import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/app/context/language-context"
import { useSettings } from "@/app/context/settings-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t('contact.title')}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('contact.description')}
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('contact.form.title')}</CardTitle>
                    <CardDescription>{t('contact.form.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('contact.form.name')}</Label>
                          <Input id="name" placeholder={t('contact.form.namePlaceholder')} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('contact.form.email')}</Label>
                          <Input id="email" type="email" placeholder={t('contact.form.emailPlaceholder')} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                        <Input id="subject" placeholder={t('contact.form.subjectPlaceholder')} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t('contact.form.message')}</Label>
                        <Textarea
                          id="message"
                          placeholder={t('contact.form.messagePlaceholder')}
                          className="min-h-[150px]"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {t('contact.send')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('contact.info.title')}</CardTitle>
                    <CardDescription>{t('contact.info.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{t('contact.info.email')}</p>
                        <p className="text-muted-foreground">{settings.contactEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{t('contact.info.phone')}</p>
                        <p className="text-muted-foreground">{settings.contactPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{t('contact.info.address')}</p>
                        <p className="text-muted-foreground">{settings.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('contact.social.title')}</CardTitle>
                    <CardDescription>{t('contact.social.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      {settings.facebook && (
                        <Button variant="outline" size="icon" asChild>
                          <Link href={settings.facebook}>
                            <Facebook className="h-5 w-5" />
                            <span className="sr-only">{t('contact.social.facebook')}</span>
                          </Link>
                        </Button>
                      )}
                      {settings.twitter && (
                        <Button variant="outline" size="icon" asChild>
                          <Link href={settings.twitter}>
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">{t('contact.social.twitter')}</span>
                          </Link>
                        </Button>
                      )}
                      {settings.instagram && (
                        <Button variant="outline" size="icon" asChild>
                          <Link href={settings.instagram}>
                            <Instagram className="h-5 w-5" />
                            <span className="sr-only">{t('contact.social.instagram')}</span>
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
                <Heart className="h-6 w-6 text-primary" />
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
    </div>
  );
}

