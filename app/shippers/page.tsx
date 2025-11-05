import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Clock, Globe, BarChart, Shield, Headphones, CheckCircle, ArrowRight } from "lucide-react"
import { ShipperQuoteModal } from "@/components/shipper-quote-modal"
import Link from "next/link"

export default function ShippersPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-primary via-primary to-primary/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Ship Smarter, Ship Faster</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Experience seamless logistics solutions powered by cutting-edge technology. From local deliveries to
                international freight, we've got you covered.
              </p>
              <ShipperQuoteModal />
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/shipping-containers-and-logistics-warehouse-operat.jpg"
                alt="Shipping operations"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Ship With Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Why Ship With Delta Prime</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technology-driven solutions that keep your business moving forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">On-Time Delivery</h3>
                <p className="text-muted-foreground leading-relaxed">
                  98.5% on-time delivery rate backed by real-time tracking and proactive communication
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Globe className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Global Network</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ship anywhere with our extensive network covering 150+ countries and all major trade routes
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <BarChart className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Real-Time Tracking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor your shipments 24/7 with our advanced tracking platform and instant notifications
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Shield className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Cargo Protection</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Comprehensive insurance coverage and secure handling protocols for complete peace of mind
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Package className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Flexible Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From LTL to FTL, air to ocean freight - customized solutions for every shipping need
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Headphones className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dedicated account managers and round-the-clock customer support whenever you need us
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Comprehensive Shipping Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              End-to-end logistics solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Domestic Shipping</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Fast, reliable ground transportation across the United States with flexible delivery options.
                </p>
                <ul className="space-y-2">
                  {["Less-than-truckload (LTL)", "Full truckload (FTL)", "Expedited shipping", "Same-day delivery"].map(
                    (item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="text-primary" size={16} />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">International Freight</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Global shipping solutions with customs clearance and door-to-door delivery worldwide.
                </p>
                <ul className="space-y-2">
                  {["Air freight", "Ocean freight", "Customs brokerage", "International documentation"].map(
                    (item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="text-primary" size={16} />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Supply Chain Solutions</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Integrated logistics management to optimize your entire supply chain operations.
                </p>
                <ul className="space-y-2">
                  {[
                    "Warehousing & distribution",
                    "Inventory management",
                    "Order fulfillment",
                    "Returns processing",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="text-primary" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Specialized Services</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Expert handling for cargo requiring special care, equipment, or regulatory compliance.
                </p>
                <ul className="space-y-2">
                  {[
                    "Temperature-controlled shipping",
                    "Hazardous materials",
                    "Oversized cargo",
                    "White glove delivery",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Platform */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src="/logistics-technology-dashboard-with-real-time-trac.jpg"
                alt="Technology platform"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Advanced Technology Platform</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our proprietary logistics platform gives you complete visibility and control over your shipments with
                powerful features designed for modern businesses.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time GPS tracking and ETA updates",
                  "Automated booking and documentation",
                  "Digital proof of delivery",
                  "Analytics and reporting dashboard",
                  "API integration with your systems",
                  "Mobile app for on-the-go management",
                  "Automated alerts and notifications",
                  "Historical shipment data and insights",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-accent shrink-0 mt-1" size={24} />
                    <p className="text-lg text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Quote */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Transparent, Competitive Pricing</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Get instant quotes with no hidden fees. Our pricing is straightforward and competitive, with volume
              discounts available for regular shippers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="text-accent mx-auto mb-3" size={40} />
                  <h3 className="font-bold text-foreground mb-2">No Hidden Fees</h3>
                  <p className="text-sm text-muted-foreground">What you see is what you pay</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="text-accent mx-auto mb-3" size={40} />
                  <h3 className="font-bold text-foreground mb-2">Volume Discounts</h3>
                  <p className="text-sm text-muted-foreground">Save more as you ship more</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="text-accent mx-auto mb-3" size={40} />
                  <h3 className="font-bold text-foreground mb-2">Flexible Payment</h3>
                  <p className="text-sm text-muted-foreground">Net terms available for qualified businesses</p>
                </CardContent>
              </Card>
            </div>
            <ShipperQuoteModal />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Optimize Your Shipping?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join thousands of businesses that trust Delta Prime for their logistics needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShipperQuoteModal />
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                View Services <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
