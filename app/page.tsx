import Link from "next/link"
import { Heart, ArrowRight, MapPin, MonitorIcon as Running, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SecondaryButton } from "./components/secondary-button"
import { RegistrationForm } from "./components/registration-form"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="inline-block font-bold">MilesForHope Run</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link href="#run" className="text-sm font-medium transition-colors hover:text-primary">
                Charity Run
              </Link>
              <Link href="#impact" className="text-sm font-medium transition-colors hover:text-primary">
                Impact
              </Link>
              <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link href="#register">Register Now</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-accent">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Run for Hope: Annual Charity Marathon
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join us in our mission to create positive change. Every step you take helps build a better future.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="#register">Register Now</Link>
                  </Button>
                  <SecondaryButton
                    href="#run"
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Learn More
                  </SecondaryButton>
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

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About MilesForHope Run</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our annual charity run brings together runners of all levels to support vital community initiatives.
                  Every kilometer run contributes to positive change.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="open-peeps-illustration sitting-figure-1"></div>
                  <div className="open-peeps-illustration sitting-figure-2"></div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Mission</h3>
                      <p className="text-muted-foreground">
                        To empower communities through sustainable development, education, and healthcare initiatives.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Vision</h3>
                      <p className="text-muted-foreground">
                        A world where every individual has access to basic necessities, quality education, and
                        healthcare.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Our Values</h3>
                      <p className="text-muted-foreground">
                        Integrity, compassion, inclusivity, and sustainability guide all our actions and decisions.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Charity Run Section */}
        <section id="run" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Charity Run Details</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join us for a day of running, community, and making a difference. Choose your distance and help us
                  reach our fundraising goal.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Running className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Run Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>5K Fun Run</li>
                    <li>10K Challenge</li>
                    <li>Half Marathon</li>
                    <li>Full Marathon</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Event Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Saturday, October 15, 2023</p>
                  <p>Starting at 7:00 AM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <MapPin className="h-6 w-6 text-primary" />
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
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Register for the Run</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Sign up now to secure your spot in the HopeCharity Run. Every registration helps us get closer to our
                  fundraising goal.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-lg mt-8">
              <RegistrationForm />
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Our <span className="text-secondary">Impact</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Through the generosity of our donors and volunteers, we've made significant progress in our mission.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-8">
                <div className="open-peeps-illustration standing-figure-5"></div>
                <div className="text-4xl font-bold text-primary">50+</div>
                <p className="text-xl font-medium">Communities Served</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-8">
                <div className="open-peeps-illustration standing-figure-12"></div>
                <div className="text-4xl font-bold text-primary">10,000+</div>
                <p className="text-xl font-medium">Lives Impacted</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 border rounded-lg p-8">
                <div className="open-peeps-illustration standing-figure-19"></div>
                <div className="text-4xl font-bold text-primary">$2M+</div>
                <p className="text-xl font-medium">Funds Raised</p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h3 className="text-2xl font-bold">Success Stories</h3>
              <div className="space-y-6">
                <div className="border rounded-lg p-6">
                  <p className="italic text-muted-foreground mb-4">
                    "Thanks to MilesForHope's education program, I was able to complete my schooling and pursue higher
                    education. Today, I'm a teacher in my community, helping other children achieve their dreams."
                  </p>
                  <p className="font-medium">- Sarah, Program Beneficiary</p>
                </div>
                <div className="border rounded-lg p-6">
                  <p className="italic text-muted-foreground mb-4">
                    "The healthcare initiative by MilesForHope has transformed our village. We now have access to basic
                    medical facilities and regular health check-ups, which has significantly improved the overall health
                    of our community."
                  </p>
                  <p className="font-medium">- Michael, Community Leader</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="#contact">Contact Sales</Link>
              </Button>
              <SecondaryButton href="#" variant="outline">
                Learn more
              </SecondaryButton>
            </div>
          </div>
        </section>

        {/* Donation Section */}
        <section id="donate" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Make a <span className="text-secondary">Donation</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your contribution, no matter how small, can make a significant difference in someone's life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>One-Time Donation</CardTitle>
                  <CardDescription>Support our cause with a single contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-2">
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Donate Now</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Donation</CardTitle>
                  <CardDescription>Provide ongoing support to our programs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline">$10/mo</Button>
                      <Button variant="outline">$25/mo</Button>
                      <Button variant="outline">$50/mo</Button>
                    </div>
                    <div className="grid gap-2">
                      <label
                        htmlFor="custom-monthly"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Custom Monthly Amount
                      </label>
                      <Input id="custom-monthly" type="number" placeholder="Enter amount" min="1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Become a Monthly Donor</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Volunteer Section */}
        <section id="volunteer" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Volunteer <span className="text-secondary">With Us</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our team of dedicated volunteers and contribute your time and skills to make a difference.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-4">
                <h3 className="text-2xl font-bold">Current Opportunities</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold">Education Mentor</h4>
                    <p className="text-muted-foreground">Help students with their studies and provide guidance.</p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <Link href="#contact" className="flex items-center">
                        Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold">Healthcare Assistant</h4>
                    <p className="text-muted-foreground">Support medical camps and health awareness programs.</p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <Link href="#contact" className="flex items-center">
                        Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold">Environmental Activist</h4>
                    <p className="text-muted-foreground">
                      Participate in conservation efforts and awareness campaigns.
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <Link href="#contact" className="flex items-center">
                        Apply Now <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex" />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-accent">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Contact <span className="text-primary">Us</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or want to get involved? Reach out to us.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl py-12">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
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
                        htmlFor="subject"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subject
                      </label>
                      <Input id="subject" placeholder="Subject" />
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
                    <Button className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="open-peeps-illustration standing-figure-21"></div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Stay <span className="text-secondary">Updated</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter to receive updates on our projects, events, and ways to get involved.
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
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
                <Heart className="h-6 w-6 text-primary" />
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
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#run" className="text-sm text-muted-foreground hover:text-primary">
                    Charity Run
                  </Link>
                </li>
                <li>
                  <Link href="#impact" className="text-sm text-muted-foreground hover:text-primary">
                    Impact
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Volunteer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Events
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
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

