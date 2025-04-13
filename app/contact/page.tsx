"use client";

import { useLanguage } from "@/app/context/language-context"
import { useSettings } from "@/app/context/settings-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import Link from "next/link"
import { WebsiteSettings } from "@/app/components/website-settings"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"

export default function ContactPage() {
  const { t } = useLanguage();
  const { settings } = useSettings();

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

      <Footer />
    </div>
  );
}

