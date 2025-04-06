import Link from "next/link"
import { Heart, MapPin, Calendar, Clock, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"

export default function RunPage() {
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
          <div className="flex flex-1 items-center justify-end space-x-4">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Charity Run Details</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our student-led charity run for a day of running, community, and making a difference. Every step you take helps us raise funds for CHU Sainte-Justine and Montreal Children's Hospital.
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
                    <CardTitle>Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Saturday, October 15, 2023</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <CardTitle>Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Check-in: 6:00 AM</p>
                    <p>Race Start: 7:00 AM</p>
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

              <div className="bg-gray-50 p-8 rounded-lg mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Course Information</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-bold mb-4">5K Run/Walk</h3>
                    <p className="text-muted-foreground mb-4">
                      Our 5K course is designed to be accessible for participants of all fitness levels. The route takes
                      you through scenic City Park with beautiful views of the lake and gardens.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Mostly flat terrain with gentle inclines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Paved paths throughout the course</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Water stations at the 1.5K and 3K marks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-1">•</span>
                        <span>Medical support available along the route</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="aspect-square w-full max-w-md bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Course Map</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">6:00 AM</div>
                    <div>
                      <p className="font-medium">Check-in & Registration Opens</p>
                      <p className="text-muted-foreground">Pick up your race packet and t-shirt</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">6:45 AM</div>
                    <div>
                      <p className="font-medium">Pre-Race Warm-up</p>
                      <p className="text-muted-foreground">Join our fitness instructor for a group warm-up</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">7:00 AM</div>
                    <div>
                      <p className="font-medium">Race Start</p>
                      <p className="text-muted-foreground">5K run/walk begins</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">8:30 AM</div>
                    <div>
                      <p className="font-medium">Awards Ceremony</p>
                      <p className="text-muted-foreground">Recognition of top finishers and fundraisers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">9:00 AM</div>
                    <div>
                      <p className="font-medium">Post-Race Celebration</p>
                      <p className="text-muted-foreground">Refreshments, music, and community activities</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-24 font-bold">11:00 AM</div>
                    <div>
                      <p className="font-medium">Event Concludes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 mb-12">
                <div>
                  <h2 className="text-2xl font-bold mb-6">What to Bring</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Comfortable running/walking shoes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Weather-appropriate clothing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Water bottle (water stations will also be available)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Sunscreen and hat</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Registration confirmation (digital or printed)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>A positive attitude!</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Amenities</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Free parking at City Park</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Bag check service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Water stations along the course</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Post-race refreshments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Medical support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      <span>Professional photography</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg mb-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Awards & Recognition</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Trophy className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>Top Finishers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Awards for the top three male and female finishers in various age categories.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Users className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>Team Spirit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Recognition for the largest team and the team with the most creative theme.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                        <Heart className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>Top Fundraisers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Special recognition for individuals and teams who raise the most funds for our cause.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6">Ready to Join Us?</h2>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">Register Now</Link>
                </Button>
                <p className="mt-4 text-muted-foreground">
                  Registration is free and includes a t-shirt, race bib, and access to all event activities.
                </p>
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

