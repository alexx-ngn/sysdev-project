"use client";

import Link from "next/link"
import { Heart, DollarSign, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { useLanguage } from "@/app/context/language-context"
import { WebsiteSettings } from "@/app/components/website-settings"
import { Header } from "@/app/components/header"
import { Footer } from "@/app/components/footer"
import { useState } from "react"
import { toast } from "sonner"

export default function DonatePage() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handlePresetAmount = (value: string) => {
    setAmount(value);
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleDonation = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      // First, find or create a user
      const userResponse = await fetch('http://localhost:8000/api/users/find-or-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email
        }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to find or create user');
      }

      const userData = await userResponse.json();
      const userId = userData.UserID;

      // Then create the donation
      const donationData = {
        UserID: userId,
        Amount: parseFloat(amount),
        DonationDate: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
        ConfirmationID: Math.random().toString(36).substring(2, 15)
      };

      console.log('Sending donation data:', donationData);

      const response = await fetch('http://localhost:8000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(donationData),
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to process donation');
      }

      toast.success("Thank you for your donation!");
      setAmount("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error('Donation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to process donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                  {t('donate.title')} <span className="text-primary">{t('donate.titleHighlight')}</span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('donate.description')}
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
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
                    <Button 
                      variant={amount === "25" ? "default" : "outline"}
                      onClick={() => handlePresetAmount("25")}
                    >
                      $25
                    </Button>
                    <Button 
                      variant={amount === "50" ? "default" : "outline"}
                      onClick={() => handlePresetAmount("50")}
                    >
                      $50
                    </Button>
                    <Button 
                      variant={amount === "100" ? "default" : "outline"}
                      onClick={() => handlePresetAmount("100")}
                    >
                      $100
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="custom-amount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.oneTime.customAmount')}
                      </label>
                      <Input 
                        id="custom-amount" 
                        type="text"
                        value={amount}
                        onChange={handleCustomAmount}
                        placeholder={t('donate.oneTime.enterAmount')} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Input 
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleDonation}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : t('donate.oneTime.button')}
                  </Button>
                </CardFooter>
              </Card>

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

      <Footer />
    </div>
  );
}

