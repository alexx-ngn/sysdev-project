import Link from "next/link"
import { Heart, DollarSign, Award, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MobileNav } from "@/components/mobile-nav"

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-background/80">
        <div className="container max-w-[1400px] mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <div className="flex gap-6 md:gap-10">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="inline-block font-bold">MilesForHope</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/about"
                className="flex items-center text-sm font-medium text-muted-foreground nav-link"
              >
                About
              </Link>
              <Link
                href="/run"
                className="flex items-center text-sm font-medium text-muted-foreground nav-link"
              >
                Charity Run
              </Link>
              <Link
                href="/faq"
                className="flex items-center text-sm font-medium text-muted-foreground nav-link"
              >
                FAQ
              </Link>
              <Link
                href="/sponsors"
                className="flex items-center text-sm font-medium text-muted-foreground nav-link"
              >
                Sponsors
              </Link>
              <Link
                href="/donate"
                className="flex items-center text-sm font-medium text-muted-foreground nav-link"
              >
                Donate
              </Link>
              <Link
                href="/contact"
                className="flex items-center text-sm font-medium text-muted-foreground nav-link"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <Button asChild className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Support Our <span className="text-primary">Mission</span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your donation helps us support CHU Sainte-Justine and Montreal Children's Hospital, making a difference in children's healthcare in Montréal.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2 mb-16">
                <Card className="flex flex-col">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <DollarSign className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle>One-Time Donation</CardTitle>
                    <CardDescription>Support children's healthcare with a single contribution</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4">
                      Your one-time donation directly supports medical care, research, and equipment for children at CHU Sainte-Justine and Montreal Children's Hospital. Every dollar makes a difference in a child's life.
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <Button variant="outline">$25</Button>
                      <Button variant="outline">$50</Button>
                      <Button variant="outline">$100</Button>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="custom-amount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Custom Amount
                      </label>
                      <Input id="custom-amount" type="number" placeholder="Enter amount" min="1" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Donate Now</Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col border-primary">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Become a Sponsor</CardTitle>
                    <CardDescription>Support as an organization or business</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4">
                      Sponsorship opportunities provide visibility for your organization while supporting children's healthcare. Various levels are available to match your organization's goals.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>Logo on event materials</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>Recognition at the event</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>Social media mentions</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/90" asChild>
                      <Link href="/sponsors">Learn More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="border-t pt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">How Your Donation Helps</h2>
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">$25</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Medical Supplies</h3>
                    <p className="text-muted-foreground">
                      Provides essential medical supplies for pediatric care at the hospitals.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">$50</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Research Support</h3>
                    <p className="text-muted-foreground">
                      Helps fund pediatric medical research and innovative treatments.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">$100</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Equipment Fund</h3>
                    <p className="text-muted-foreground">
                      Contributes to specialized medical equipment for children's care.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Our Donation Team</h2>
                <p className="text-center text-muted-foreground mb-8">
                  Have questions about donating or want to discuss other ways to support children's healthcare? Our team is here to help.
                </p>
                <form className="max-w-2xl mx-auto grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Input id="name" placeholder="Your Name" />
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="Your Email" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <Textarea id="message" placeholder="Your Message" />
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
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
                <span className="text-lg font-bold">MilesForHope Run</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making a difference in communities worldwide through sustainable development, education, and healthcare
                initiatives.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-gray-800">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/run" className="text-sm text-muted-foreground hover:text-gray-800">
                    Charity Run
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-gray-800">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/sponsors" className="text-sm text-muted-foreground hover:text-gray-800">
                    Sponsors
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/donate" className="text-sm text-muted-foreground hover:text-gray-800">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-sm text-muted-foreground hover:text-gray-800">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-gray-800">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MilesForHope. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

