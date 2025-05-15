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
import { loadStripe } from '@stripe/stripe-js'
import { getApiUrl } from '../config/api'

export default function DonatePage() {
  const { t } = useLanguage();
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [donationName, setDonationName] = useState("");
  const [donationEmail, setDonationEmail] = useState("");
  const [donationPhone, setDonationPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [donationLoading, setDonationLoading] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handlePresetAmount = (value: string) => {
    const input = document.getElementById('custom-amount') as HTMLInputElement;
    if (input) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setDonationAmount(""); // allow clearing the input
      return;
    }
    if (/^\d+(\.\d{0,2})?$/.test(value)) {
      const numValue = parseFloat(value);
      if (numValue <= 25000) {
        setDonationAmount(value);
      } else {
        toast.error('Maximum donation amount is $25,000');
      }
    }
  };

  const handleDonation = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error(t('donate.contact.invalidAmount'));
      return;
    }

    if (parseFloat(donationAmount) > 25000) {
      toast.error('Maximum donation amount is $25,000');
      return;
    }

    if (!donationName.trim()) {
      toast.error(t('donate.contact.invalidName'));
      return;
    }

    if (!donationEmail.trim()) {
      toast.error(t('donate.contact.invalidEmail'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donationEmail)) {
      toast.error(t('donate.contact.invalidEmail'));
      return;
    }

    if (parseFloat(donationAmount) < 0.01) {
      toast.error(t('donate.contact.minimumAmount'));
      return;
    }

    setDonationLoading(true);

    try {
      const userResponse = await fetch(getApiUrl('/users/find-or-create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: donationName.split(' ')[0],
          LastName: donationName.split(' ').slice(1).join(' ') || donationName.split(' ')[0],
          Email: donationEmail,
          PhoneNumber: donationPhone.trim()
        }),
      });

      const userData = await userResponse.json();
      
      if (!userResponse.ok) {
        throw new Error(userData.message);
      }

      const userId = userData.UserID;

      const donationData = {
        UserID: userId,
        Amount: parseFloat(donationAmount),
        DonationDate: new Date().toISOString().split('T')[0],
        ConfirmationID: `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: 'One-time donation'
      };

      const response = await fetch(getApiUrl('/donations'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 422 && responseData.errors) {
          const errorMessages = Object.entries(responseData.errors)
            .map(([field, messages]) => `${field}: ${messages}`)
            .join(', ');
          throw new Error(errorMessages);
        }
        throw new Error(responseData.message || 'Failed to process donation');
      }

      toast.success(`Thank you for your donation of $${donationAmount}! Your confirmation ID is ${donationData.ConfirmationID}`);
      setDonationAmount("");
      setDonationName("");
      setDonationEmail("");
      setDonationPhone("");
    } catch (error) {
      console.error('Donation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to process donation. Please try again.");
    } finally {
      setDonationLoading(false);
    }
  };

  const handleStripeDonation = async () => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    if (!donationName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!donationEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setDonationLoading(true);

    try {
      console.log('Sending request with data:', {
        amount: parseFloat(donationAmount),
        name: donationName,
        email: donationEmail,
        phoneNumber: donationPhone.trim(),
      });
      
      const response = await fetch(getApiUrl('/create-checkout-session'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          amount: parseFloat(donationAmount),
          name: donationName,
          email: donationEmail,
          phoneNumber: donationPhone.trim(),
        }),
      });

      const data = await response.json();
      console.log('Response from server:', data);
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to create checkout session');
      }

      const stripe = await loadStripe('pk_test_51RGss0D6lPUkmN5DgD3K2MDsOwMLSxbAd4YwVriFa3G3anxTpi1c9Ogeyrr8uqSMQbVDAejSAe4Xi78PojnZHmou00x7WfQNGy');
      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Stripe donation error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to process donation. Please try again.");
    } finally {
      setDonationLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: 'Donation Page Contact',
          message: contactMessage,
          phone: contactPhone
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success(t('contact.success.title'), {
        description: t('contact.success.message'),
      });

      // Reset form
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch (error) {
      toast.error(t('contact.error.title'), {
        description: t('contact.error.message')
      });
    } finally {
      setContactLoading(false);
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
                      variant={donationAmount === "5" ? "default" : "outline"}
                      onClick={() => handlePresetAmount("5")}
                      className="relative overflow-hidden"
                    >
                      <span className={donationAmount === "5" ? "text-white" : ""}>$5</span>
                      {donationAmount === "5" && (
                        <span className="absolute inset-0 bg-primary opacity-10"></span>
                      )}
                    </Button>
                    <Button 
                      variant={donationAmount === "10" ? "default" : "outline"}
                      onClick={() => handlePresetAmount("10")}
                      className="relative overflow-hidden"
                    >
                      <span className={donationAmount === "10" ? "text-white" : ""}>$10</span>
                      {donationAmount === "10" && (
                        <span className="absolute inset-0 bg-primary opacity-10"></span>
                      )}
                    </Button>
                    <Button 
                      variant={donationAmount === "20" ? "default" : "outline"}
                      onClick={() => handlePresetAmount("20")}
                      className="relative overflow-hidden"
                    >
                      <span className={donationAmount === "20" ? "text-white" : ""}>$20</span>
                      {donationAmount === "20" && (
                        <span className="absolute inset-0 bg-primary opacity-10"></span>
                      )}
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
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input 
                          id="custom-amount" 
                          type="text"
                          value={donationAmount}
                          onChange={handleCustomAmount}
                          className="pl-7"
                          min="0.01"
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="donation-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.name')}
                      </label>
                      <Input 
                        id="donation-name"
                        type="text"
                        value={donationName}
                        onChange={(e) => setDonationName(e.target.value)}
                        placeholder={t('donate.contact.namePlaceholder')}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="donation-email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.email')}
                      </label>
                      <Input 
                        id="donation-email"
                        type="email"
                        value={donationEmail}
                        onChange={(e) => setDonationEmail(e.target.value)}
                        placeholder={t('donate.contact.emailPlaceholder')}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="donation-phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.phone.title')}
                      </label>
                      <Input
                        id="donation-phone"
                        type="tel"
                        value={donationPhone}
                        onChange={(e) => setDonationPhone(e.target.value)}
                        placeholder={t('donate.contact.phone.placeholder')}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={handleStripeDonation}
                    disabled={donationLoading}
                  >
                    {donationLoading ? t('donate.oneTime.buttonLoading') : t('donate.oneTime.buttonWithAmount').replace('{{amount}}', donationAmount || '0')}
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-16 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">{t('donate.contact.title')}</h2>
                <p className="text-center text-muted-foreground mb-8">
                  {t('donate.contact.description')}
                </p>
                <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="contact-name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.name')}
                      </label>
                      <Input 
                        id="contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={t('donate.contact.namePlaceholder')}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t('donate.contact.email')}
                      </label>
                      <Input 
                        id="contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder={t('donate.contact.emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="contact-phone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('donate.contact.phone.title')}
                    </label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder={t('donate.contact.phone.placeholder')}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('donate.contact.message')}
                    </label>
                    <Textarea 
                      id="message" 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={t('donate.contact.messagePlaceholder')} 
                    />
                  </div>
                  <Button type="submit" disabled={contactLoading}>
                    {contactLoading ? t('contact.form.submitting') : t('contact.form.submit')}
                  </Button>
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

