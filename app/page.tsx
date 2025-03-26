import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-gray-800" />
              <span className="inline-block font-bold">MilesForHope Run</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-gray-600">
                About
              </Link>
              <Link href="/run" className="text-sm font-medium transition-colors hover:text-gray-600">
                Charity Run
              </Link>
              <Link href="/faq" className="text-sm font-medium transition-colors hover:text-gray-600">
                FAQ
              </Link>
              <Link href="/sponsors" className="text-sm font-medium transition-colors hover:text-gray-600">
                Sponsors
              </Link>
              <Link href="/donate" className="text-sm font-medium transition-colors hover:text-gray-600">
                Donate
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-gray-600">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Run for Hope: Annual Charity Marathon
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join us in our mission to create positive change. Every step you take helps build a better future.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/register">Register Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/run">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="open-peeps-illustration standing-figure-1"></div>
                  <div className="open-peeps-illustration standing-figure-23"></div>
                  <div className="open-peeps-illustration standing-figure-24"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>About Us</CardTitle>
                  <CardDescription>Learn about our mission and impact</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    MilesForHope is dedicated to empowering communities through sustainable development, education, and
                    healthcare initiatives.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/about">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Charity Run</CardTitle>
                  <CardDescription>Event details and schedule</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    Join us on October 15, 2023 for a day of running, community, and making a difference. Every step
                    counts!
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/run">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Get Involved</CardTitle>
                  <CardDescription>Ways to support our cause</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    There are many ways to support MilesForHope - register for the run, make a donation, or become a
                    sponsor.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/donate">Support Us</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to <span className="text-primary">Join Us</span>?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Register today for the MilesForHope Run and be part of something meaningful. Every participant makes a
                  difference.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">Register Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Highlight */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Sponsors</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're grateful to the organizations that make our charity run possible.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-lg w-32 h-32 flex items-center justify-center">
                    <span className="text-gray-400 font-bold">Sponsor {i}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button asChild>
                  <Link href="/sponsors">View All Sponsors</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:py-12 lg:py-16 px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
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
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-gray-800">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-gray-800">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-gray-800">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MilesForHope. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              MilesForHope is a registered 501(c)(3) nonprofit organization.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

