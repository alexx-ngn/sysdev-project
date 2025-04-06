import Link from "next/link"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Miles For Hope: Supporting children's hospitals in Montréal.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A student-led charity run raising funds for CHU Sainte-Justine and Montreal Children's Hospital. Every step you take helps build a better future for children in need.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
                    <Link href="/register">Register Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/20">
                    <Link href="/run">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover sm:w-[100%] lg:order-last">
                <div className="w-full h-full flex items-center justify-center">
                  <img src="/images/illustrations/openpeeps1.png" alt="Open Peeps Illustration" className="w-[100%] h-[100%] object-contain scale-125" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Sections */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              <Card className="flex flex-col border-pastel-blue">
                <CardHeader>
                  <CardTitle>About Us</CardTitle>
                  <CardDescription>Learn about our mission and impact</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    MilesForHope is a student-led charity run dedicated to raising funds for children's hospitals in Montréal, specifically supporting CHU Sainte-Justine and Montreal Children's Hospital.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/20">
                    <Link href="/about">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-pastel-yellow">
                <CardHeader>
                  <CardTitle>Charity Run</CardTitle>
                  <CardDescription>Event details and schedule</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground">
                    Join us for a day of running, community, and making a difference. Participants can win medals, merchandise, and other goods while supporting a great cause. Every step counts!
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full border-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/20">
                    <Link href="/run">View Details</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-pastel-blue">
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
                  <Button asChild variant="outline" className="w-full border-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/20">
                    <Link href="/donate">Support Us</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Registration CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to <span className="text-pastel-blue-foreground underline decoration-pastel-blue">Join Us</span>?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Register today for the MilesForHope Run and be part of something meaningful. Every participant makes a
                  difference.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild size="lg" className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90">
                  <Link href="/register">Register Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Highlight */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our <span className="text-pastel-yellow-foreground underline decoration-pastel-yellow">Sponsors</span></h2>
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
                <Button asChild className="bg-pastel-yellow text-pastel-yellow-foreground hover:bg-pastel-yellow/90">
                  <Link href="/sponsors">View All Sponsors</Link>
                </Button>
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

