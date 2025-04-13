"use client";

import Link from "next/link"
import { Heart } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/context/language-context"
import { useSettings } from "@/app/context/settings-context"
import { WebsiteSettings } from "@/app/components/website-settings"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"

export default function FAQPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('faq.title')}</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('faq.description')}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    {t('faq.q1.question')}
                  </AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q1.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">{t('faq.q2.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q2.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">{t('faq.q3.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q3.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">{t('faq.q4.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q4.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">{t('faq.q5.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q5.answer')}
                    <ul className="list-disc pl-6 mt-2">
                      <li>{t('faq.q5.item1')}</li>
                      <li>{t('faq.q5.item2')}</li>
                      <li>{t('faq.q5.item3')}</li>
                      <li>{t('faq.q5.item4')}</li>
                      <li>{t('faq.q5.item5')}</li>
                      <li>{t('faq.q5.item6')}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">{t('faq.q6.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q6.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">{t('faq.q7.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q7.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">{t('faq.q8.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q8.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left">{t('faq.q9.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q9.answer')}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left">{t('faq.q10.question')}</AccordionTrigger>
                  <AccordionContent>
                    {t('faq.q10.answer')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {t('faq.contactPrompt')}
                </p>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t('faq.contactButton')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

