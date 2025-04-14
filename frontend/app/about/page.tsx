"use client";

import { useLanguage } from "@/app/context/language-context";
import { WebsiteSettings } from "@/app/components/website-settings";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
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
                  {t('featured.about.title')}
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('featured.about.content')}
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto w-full h-auto overflow-hidden rounded-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="/images/illustrations/openpeeps2.png"
                    alt={t('about.illustrationAlt')}
                    className="w-auto h-auto max-w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">{t('about.mission.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('about.mission.description')}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">{t('about.vision.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('about.vision.description')}
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">{t('about.values.title')}</h3>
                      <p className="text-muted-foreground">
                        {t('about.values.description')}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mx-auto max-w-5xl border-t pt-12">
              <h2 className="text-2xl font-bold mb-8 text-center">{t('about.story.title')}</h2>
              <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">{t('about.story.paragraph1')}</p>
                <p className="mb-4">{t('about.story.paragraph2')}</p>
                <p className="mb-4">{t('about.story.paragraph3')}</p>
                <p>{t('about.story.paragraph4')}</p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl border-t pt-12 mt-12">
              <h2 className="text-2xl font-bold mb-8 text-center">{t('about.team.title')}</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4">
                    <div className="open-peeps-illustration standing-figure-5 w-full h-full"></div>
                  </div>
                  <h3 className="text-lg font-bold">{t('about.team.sarah.name')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.team.sarah.role')}</p>
                  <p className="mt-2 text-muted-foreground">{t('about.team.sarah.description')}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4">
                    <div className="open-peeps-illustration standing-figure-12 w-full h-full"></div>
                  </div>
                  <h3 className="text-lg font-bold">{t('about.team.michael.name')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.team.michael.role')}</p>
                  <p className="mt-2 text-muted-foreground">{t('about.team.michael.description')}</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4">
                    <div className="open-peeps-illustration standing-figure-19 w-full h-full"></div>
                  </div>
                  <h3 className="text-lg font-bold">{t('about.team.aisha.name')}</h3>
                  <p className="text-sm text-muted-foreground">{t('about.team.aisha.role')}</p>
                  <p className="mt-2 text-muted-foreground">{t('about.team.aisha.description')}</p>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-5xl mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/register">{t('nav.register')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
