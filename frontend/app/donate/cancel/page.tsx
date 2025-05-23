"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useLanguage } from "@/app/context/language-context";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { WebsiteSettings } from "@/app/components/website-settings";

function LoadingFallback() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen">
      <WebsiteSettings />
      <Header />
      <main className="flex-1 container max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">{t('donate.cancel.message')}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function DonationCancelContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col min-h-screen">
      <WebsiteSettings />
      <Header />

      <main className="flex-1 container max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-center text-2xl">
              {t('donate.cancel.title')}
            </CardTitle>
            <CardDescription className="text-center">
              {t('donate.cancel.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              {t('donate.cancel.message')}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => router.push('/donate')}>
              {t('donate.cancel.backButton')}
            </Button>
            <Button onClick={() => router.push('/contact')}>
              {t('donate.cancel.supportButton')}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default function DonationCancelPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DonationCancelContent />
    </Suspense>
  );
} 