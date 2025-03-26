import Link from "next/link"
import { Heart } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about the MilesForHope charity run.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    When and where is the charity run taking place?
                  </AccordionTrigger>
                  <AccordionContent>
                    The MilesForHope charity run will take place on Saturday, October 15, 2023, starting at 7:00 AM. The
                    event will be held at City Park, 123 Runner's Lane, Hopeville, State 12345.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">How do I register for the run?</AccordionTrigger>
                  <AccordionContent>
                    You can register for the run by filling out the registration form on our website. Simply click the
                    "Register Now" button at the top of the page, or visit our registration page. You'll need to provide
                    your first name, last name, phone number, and email address.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">Is there a registration fee?</AccordionTrigger>
                  <AccordionContent>
                    No, registration for the MilesForHope Run is completely free. All participants will receive a
                    t-shirt, race bib, and refreshments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">What distance options are available?</AccordionTrigger>
                  <AccordionContent>
                    This year, we're offering a 5K run/walk that's suitable for participants of all fitness levels. The
                    course is designed to be accessible and enjoyable for everyone, whether you're an experienced runner
                    or a casual walker.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">What should I bring on the day of the run?</AccordionTrigger>
                  <AccordionContent>
                    We recommend bringing:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Comfortable running/walking shoes</li>
                      <li>Weather-appropriate clothing</li>
                      <li>Water bottle (water stations will also be available)</li>
                      <li>Sunscreen</li>
                      <li>Your registration confirmation (digital or printed)</li>
                      <li>A positive attitude!</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">Can I participate if I'm not a runner?</AccordionTrigger>
                  <AccordionContent>
                    The MilesForHope event welcomes participants of all fitness levels. You can walk, jog, or run at
                    your own pace. The most important thing is participating and supporting the cause.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">Where does the money raised go?</AccordionTrigger>
                  <AccordionContent>
                    All proceeds from the MilesForHope run go directly to supporting our community initiatives in
                    education, healthcare, and sustainable development. We're committed to transparency and publish an
                    annual report detailing how funds are allocated.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">Can I volunteer instead of participating?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We always need volunteers to help make the event a success. Volunteers can assist with
                    registration, water stations, course marshaling, and more. Please contact us through the form on our
                    website if you're interested in volunteering.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left">Is the event family-friendly?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the MilesForHope run is designed to be a family-friendly event. Children are welcome to
                    participate with parental supervision. We'll also have activities and entertainment suitable for all
                    ages.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left">What happens if it rains?</AccordionTrigger>
                  <AccordionContent>
                    The event will take place rain or shine. In case of severe weather conditions that might compromise
                    participants' safety, we may reschedule the event. Any changes will be communicated via email to
                    registered participants and posted on our website and social media channels.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Don't see your question answered here? Feel free to contact us.
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
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
