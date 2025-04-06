import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

export default function AboutPage() {
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
            <Button
              asChild
              className="bg-pastel-blue text-pastel-blue-foreground hover:bg-pastel-blue/90"
            >
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
                  About Miles For Hope
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our student-led charity run brings together runners of all levels
                  to support children's hospitals in Montréal. Every kilometer run
                  contributes to positive change for children in need.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto w-full h-auto overflow-hidden rounded-xl">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="/images/illustrations/openpeeps2.png"
                    alt="Open Peeps Illustration"
                    className="w-auto h-auto max-w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Mission</h3>
                      <p className="text-muted-foreground">
                        To support children's hospitals in Montréal (CHU Sainte-Justine and Montreal Children's Hospital) through raising awareness and funds.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Vision</h3>
                      <p className="text-muted-foreground">
                        A world where every child has access to quality healthcare.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Values</h3>
                      <p className="text-muted-foreground">
                        We believe in the power of unity and collaboration to make a difference.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mx-auto max-w-5xl border-t pt-12">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Story</h2>
              <div className="prose max-w-none text-muted-foreground">
                <p className="mb-4">
                  MilesForHope began in 2015 when a small group of passionate
                  runners decided to combine their love for running with their
                  desire to make a positive impact in their community. What
                  started as a local 5K with just 50 participants has grown into
                  an annual event that attracts hundreds of runners from across
                  the region.
                </p>
                <p className="mb-4">
                  Our founders believed that physical activity could be a
                  powerful catalyst for social change. By bringing people
                  together through running, we create a community of individuals
                  committed to supporting important causes and making a
                  difference in the lives of others.
                </p>
                <p className="mb-4">
                  Over the years, MilesForHope has raised over $500,000 for
                  various community initiatives, focusing on education,
                  healthcare, and sustainable development. We've funded
                  scholarships for underprivileged students, supported local
                  health clinics, and contributed to environmental conservation
                  projects.
                </p>
                <p>
                  Today, MilesForHope continues to grow, but our core mission
                  remains the same: to harness the collective energy and
                  goodwill of runners to create positive change in our
                  communities. Every step taken in our charity run is a step
                  toward a better, more equitable world.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl border-t pt-12 mt-12">
              <h2 className="text-2xl font-bold mb-8 text-center">Our Team</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4">
                    <div className="open-peeps-illustration standing-figure-5 w-full h-full"></div>
                  </div>
                  <h3 className="text-lg font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">
                    Founder & Executive Director
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Marathon runner and community advocate with 15 years of
                    nonprofit experience.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4">
                    <div className="open-peeps-illustration standing-figure-12 w-full h-full"></div>
                  </div>
                  <h3 className="text-lg font-bold">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">
                    Event Director
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Former Olympic athlete dedicated to creating inclusive
                    sporting events.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 mb-4">
                    <div className="open-peeps-illustration standing-figure-19 w-full h-full"></div>
                  </div>
                  <h3 className="text-lg font-bold">Aisha Patel</h3>
                  <p className="text-sm text-muted-foreground">
                    Community Outreach Coordinator
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Social worker and running coach passionate about empowering
                    communities.
                  </p>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-5xl mt-12 text-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/register">Join Our Mission - Register Today</Link>
              </Button>
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
  );
}
