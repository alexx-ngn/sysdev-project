"use client";

import Link from "next/link"
import { Heart, MapPin, Calendar, Clock, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/app/context/language-context"
import { WebsiteSettings } from "@/app/components/website-settings"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import CourseMap from "@/app/components/CourseMap"

export default function RunPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('run.title')}</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('run.description')}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Calendar className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle>{t('run.date.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t('run.date.value')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle>{t('run.time.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t('run.time.checkin')}</p>
                    <p>{t('run.time.start')}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <MapPin className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle>{t('run.location.title')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{t('run.location.address1')}</p>
                    <p>{t('run.location.address2')}</p>
                    <p>{t('run.location.address3')}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('run.courseInfo.title')}</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-bold mb-4">{t('run.courseInfo.subtitle')}</h3>
                    <p className="text-muted-foreground mb-4">
                      {t('run.courseInfo.description')}
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('run.courseInfo.terrain')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('run.courseInfo.paths')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>{t('run.courseInfo.waterStations')}</span>
                      </li>
     
                    </ul>
                  </div>
                  <div className="flex items-center justify-center z-10">
                    <CourseMap 
                      geojsonPath="/maps/charity-run-route.json"
                      zoom={13}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('run.schedule.title')}</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">{t('run.schedule.checkin.time')}</div>
                    <div>
                      <p className="font-medium">{t('run.schedule.checkin.title')}</p>
                      <p className="text-muted-foreground">{t('run.schedule.checkin.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">{t('run.schedule.warmup.time')}</div>
                    <div>
                      <p className="font-medium">{t('run.schedule.warmup.title')}</p>
                      <p className="text-muted-foreground">{t('run.schedule.warmup.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">{t('run.schedule.start.time')}</div>
                    <div>
                      <p className="font-medium">{t('run.schedule.start.title')}</p>
                      <p className="text-muted-foreground">{t('run.schedule.start.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">{t('run.schedule.awards.time')}</div>
                    <div>
                      <p className="font-medium">{t('run.schedule.awards.title')}</p>
                      <p className="text-muted-foreground">{t('run.schedule.awards.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">{t('run.schedule.celebration.time')}</div>
                    <div>
                      <p className="font-medium">{t('run.schedule.celebration.title')}</p>
                      <p className="text-muted-foreground">{t('run.schedule.celebration.description')}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">{t('run.schedule.end.time')}</div>
                    <div>
                      <p className="font-medium">{t('run.schedule.end.title')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 mb-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('run.bring.title')}</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.bring.shoes')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.bring.clothing')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.bring.water')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.bring.sunscreen')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.bring.confirmation')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.bring.attitude')}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">{t('run.amenities.title')}</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.amenities.parking')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.amenities.waterStations')}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>{t('run.amenities.refreshments')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6">{t('run.readyToJoin')}</h2>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">{t('run.registerNow')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

