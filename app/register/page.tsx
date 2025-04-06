import Link from "next/link"
import { Heart, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RegistrationForm } from "../components/registration-form"
import { MobileNav } from "@/components/mobile-nav"

export default function RegisterPage() {
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
              <Link href="/about" className="text-sm font-medium nav-link">
                About
              </Link>
              <Link href="/run" className="text-sm font-medium nav-link">
                Charity Run
              </Link>
              <Link href="/faq" className="text-sm font-medium nav-link">
                FAQ
              </Link>
              <Link href="/sponsors" className="text-sm font-medium nav-link">
                Sponsors
              </Link>
              <Link href="/donate" className="text-sm font-medium nav-link">
                Donate
              </Link>
              <Link href="/contact" className="text-sm font-medium nav-link">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
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
                  <span className="text-primary">Register</span> for the MilesForHope Run
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join us for a day of running, community, and making a difference. Complete the form below to secure
                  your spot.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2 mb-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Event Details</h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <Calendar className="h-6 w-6 text-gray-600" />
                        </div>
                        <CardTitle>Date & Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Saturday, October 15, 2023</p>
                        <p>Starting at 7:00 AM</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                          <MapPin className="h-6 w-6 text-gray-600" />
                        </div>
                        <CardTitle>Location</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>City Park</p>
                        <p>123 Runner's Lane</p>
                        <p>Hopeville, State 12345</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Registration Includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Official MilesForHope Run t-shirt</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Race bib with timing chip</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Finisher's medal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Post-race refreshments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Access to event photos</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
                  <RegistrationForm />
                </div>
              </div>

              <div className="border-t pt-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-bold mb-2">What should I bring on race day?</h3>
                    <p className="text-muted-foreground">
                      Comfortable running/walking shoes, weather-appropriate clothing, water bottle, sunscreen, and your
                      registration confirmation.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Is there parking available?</h3>
                    <p className="text-muted-foreground">
                      Yes, free parking is available at City Park. We recommend carpooling if possible to reduce
                      congestion.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Can I register on the day of the event?</h3>
                    <p className="text-muted-foreground">
                      Yes, same-day registration will be available starting at 6:00 AM, but we recommend registering in
                      advance to secure your spot and t-shirt size.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Is the course accessible for all fitness levels?</h3>
                    <p className="text-muted-foreground">
                      Yes, the 5K course is designed to be accessible for participants of all fitness levels, whether
                      you're running or walking.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    Have more questions? Check our comprehensive FAQ page or contact us.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <Button asChild variant="outline">
                      <Link href="/faq">View All FAQs</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/#contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
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
                <Heart className="h-6 w-6 text-gray-800" />
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

