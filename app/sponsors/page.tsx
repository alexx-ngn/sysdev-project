import Link from "next/link"
import { Heart, Building, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SponsorsPage() {
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
              <Link href="/#about" className="text-sm font-medium transition-colors hover:text-gray-600">
                About
              </Link>
              <Link href="/#run" className="text-sm font-medium transition-colors hover:text-gray-600">
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
              <Link href="/#contact" className="text-sm font-medium transition-colors hover:text-gray-600">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Our <span className="text-primary">Sponsors</span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're grateful to the organizations that make our charity run possible.
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold mb-8 text-center">Platinum Sponsors</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Building className="h-16 w-16 text-gray-400" />
                    </div>
                    <CardTitle>Acme Corporation</CardTitle>
                    <CardDescription>Technology Partner</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      Supporting our mission since 2018, Acme Corporation has been instrumental in providing technology
                      solutions.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-gray-600">
                      Visit Website
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Building className="h-16 w-16 text-gray-400" />
                    </div>
                    <CardTitle>Global Health Inc.</CardTitle>
                    <CardDescription>Healthcare Partner</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      Global Health Inc. provides essential healthcare support for our initiatives and medical
                      assistance during events.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-gray-600">
                      Visit Website
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Building className="h-16 w-16 text-gray-400" />
                    </div>
                    <CardTitle>Metro Bank</CardTitle>
                    <CardDescription>Financial Partner</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">
                      Metro Bank's financial support and expertise have been crucial in managing our funds and
                      maximizing our impact.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-gray-600">
                      Visit Website
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <h2 className="text-2xl font-bold mb-8 text-center">Gold Sponsors</h2>
              <div className="grid gap-6 md:grid-cols-4 mb-16">
                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-base">Fitness First</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-base">Green Energy Co.</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-base">City News</CardTitle>
                  </CardHeader>
                </Card>

                <Card className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Building className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardTitle className="text-base">Fresh Foods</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <h2 className="text-2xl font-bold mb-8 text-center">Silver Sponsors</h2>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-16">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                      <Building className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">Sponsor {i}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Become a Sponsor</h2>
                <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Join our community of sponsors and help make a difference. We offer various sponsorship packages
                  designed to provide visibility for your organization while supporting our charitable mission.
                </p>

                <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>Platinum</CardTitle>
                      <CardDescription>$5,000+</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Premium logo placement</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Speaking opportunity</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>10 free registrations</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Social media promotion</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Booth at the event</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Us</Button>
                    </CardFooter>
                  </Card>

                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>Gold</CardTitle>
                      <CardDescription>$2,500+</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Logo on event materials</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>5 free registrations</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Social media mention</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Booth at the event</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Us</Button>
                    </CardFooter>
                  </Card>

                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Award className="h-6 w-6 text-gray-600" />
                      </div>
                      <CardTitle>Silver</CardTitle>
                      <CardDescription>$1,000+</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Logo on event website</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>2 free registrations</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          <span>Social media mention</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Contact Us</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="text-center mt-8">
                  <p className="text-muted-foreground mb-4">
                    Interested in becoming a sponsor? Contact our sponsorship team to discuss options.
                  </p>
                  <Button asChild>
                    <Link href="/#contact" className="inline-flex items-center">
                      Contact Sponsorship Team <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
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
                  <Link href="/#about" className="text-sm text-muted-foreground hover:text-gray-800">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/#run" className="text-sm text-muted-foreground hover:text-gray-800">
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
                  <Link href="#" className="text-sm text-muted-foreground hover:text-gray-800">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-gray-800">
                    Events
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

