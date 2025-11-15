import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Clock, Globe, BarChart, Shield, Headphones, CheckCircle, ArrowRight } from "lucide-react"
import { ShipperQuoteModal } from "@/components/modals/shipper-quote-modal"
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
                 98.5%+ on-time performance backed by real-time tracking and proactive communication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                  <Globe className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Nationwide Coverage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reliable shipping across all 48 states with access to major distribution hubs and regional networks.
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
                  Monitor your freight 24/7 with GPS tracking, instant updates, and transparent status notifications.
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
                 Comprehensive insurance coverage and strict secure-handling protocols for complete peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <Package className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Flexible Freight Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Custom solutions for LTL, FTL, dedicated routes, and expedited shipments — tailored to your business needs.
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
                  Dedicated account managers and round-the-clock customer support whenever you need us.
                </p>
              </CardContent>
            </Card>
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
                size="sm"
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
