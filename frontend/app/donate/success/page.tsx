"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
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
            <p className="text-muted-foreground">{t('donate.success.verifying')}</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function DonationSuccessContent() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setError("Invalid session ID");
        setIsVerifying(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to verify payment");
        }

        setIsVerifying(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to verify payment");
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <WebsiteSettings />
      <Header />

      <main className="flex-1 container max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">
              {t('donate.success.title')}
            </CardTitle>
            <CardDescription className="text-center">
              {t('donate.success.subtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isVerifying ? (
              <p className="text-center text-muted-foreground">
                {t('donate.success.verifying')}
              </p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <p className="text-center text-muted-foreground">
                {t('donate.success.message')}
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push('/donate')}>
              {t('donate.success.backButton')}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DonationSuccessContent />
    </Suspense>
  );
} 