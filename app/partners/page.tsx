import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Handshake, TrendingUp, Shield, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PartnerCarousel } from "@/components/partner-carousel"

export default function PartnersPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Partner With Delta Prime</h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Join our global network of trusted logistics partners and grow your business with cutting-edge technology
              and unmatched support
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partner Network</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proud to work with industry-leading companies
            </p>
          </div>
          <PartnerCarousel />
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Partner With Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the benefits of working with an industry leader
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Global Reach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access to 150+ countries and established trade routes worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Growth Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Expand your business with our extensive client network
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Reliable Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  24/7 dedicated support team and comprehensive training
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Fair Terms</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Competitive rates and transparent partnership agreements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Partnership Benefits</h2>
              <div className="space-y-4">
                {[
                  "Access to advanced logistics technology platform",
                  "Real-time tracking and reporting systems",
                  "Dedicated account management team",
                  "Marketing and business development support",
                  "Competitive commission structure",
                  "Comprehensive insurance coverage",
                  "Regular training and certification programs",
                  "Priority access to new routes and opportunities",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src="/logistics-partnership-handshake-business-meeting.jpg"
                alt="Partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We work with various types of partners across the logistics ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Freight Forwarders</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Expand your service offerings with our comprehensive freight forwarding network and technology
                  platform.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Global network access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Technology integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Competitive rates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Carriers & Trucking Companies</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Join our carrier network and get consistent loads with fair rates and reliable payment terms.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Steady freight volume
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Quick payment processing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Route optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Warehouse & Distribution</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Partner with us to provide warehousing and distribution services to our extensive client base.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Increased utilization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    WMS integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Long-term contracts
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join our network of successful partners and take your logistics business to the next level
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
            >
              Contact Us Today <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
