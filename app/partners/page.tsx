import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Handshake,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { PartnerCarousel } from "@/components/partner-carousel";

export default function PartnersPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Partner With Delta Prime
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              Partner with Delta Prime and grow your business with dependable
              freight solutions, real-time visibility, and dedicated support
              teams.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Partner Network
            </h2>
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Partner With Us
            </h2>
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
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Nationwide Coverage
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reliable coast-to-coast service across all 48 continental
                  states.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Growth Opportunities
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Expand your business with our large and continuously growing
                  network of shippers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Fair & Transparent Terms
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Competitive rates, honest communication, and clear partnership
                  agreements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="text-accent-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  24/7 Partner Support
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Round-the-clock assistance from experienced dispatch and
                  operations teams.
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
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Partnership Benefits
              </h2>
              <div className="space-y-4">
                {[
                  "Access to real-time GPS tracking and shipment visibility",
                  "Dedicated account and dispatch support 24/7",
                  "Consistent freight opportunities across all 48 states",
                  "Modern, well-maintained fleet with advanced safety technology",
                  "Transparent pricing and long-term partnership agreements",
                  "Reliable, on-time delivery backed by performance analytics",
                  "Driver and equipment safety compliance built into every load",
                  "Priority access to capacity during peak seasons",
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-accent shrink-0 mt-1"
                      size={24}
                    />
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We collaborate with trusted partners across the U.S. freight and
              logistics industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Shippers & Businesses
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Work with Delta Prime to move your freight with safe,
                  reliable, coast-to-coast trucking services.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Consistent nationwide coverage
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Real-time tracking & communication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Flexible local, regional, and long-haul options{" "}
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Brokers & Logistics Providers
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Partner with us for dependable capacity, strong communication,
                  and on-time performance.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Steady, high-volume capacity
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Fast, transparent payment terms
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    24/7 operations & dispatch support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Carriers & Owner-Operators{" "}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Join our carrier network and access stable lanes, fair rates,
                  and professional support.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Dedicated lanes and steady freight
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Fuel & route optimization support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="text-primary" size={16} />
                    Safety-first operations and compliance
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join our network of successful partners and take your logistics
            business to the next level
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
  );
}
