import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Globe,
  Cpu,
  Truck,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Package,
  Star,
  Shield,
  Clock,
  LocateFixedIcon,
  MapIcon,
} from "lucide-react";
import Link from "next/link";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { ShipperQuoteModal } from "@/components/shipper-quote-modal";
import { PartnerCarousel } from "@/components/partner-carousel";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/in_video.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img
              src="/modern-freight-truck-on-highway-at-sunset-with-mot.jpg"
              alt="Logistics"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20 self-end">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 text-balance animate-fade-in drop-shadow-lg">
            DELTA PRIME LLC
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Reliable, safe, and efficient nationwide trucking solutions. We
            ensure your freight reaches its destination on time, every time —
            backed by modern equipment, professional drivers, and 24/7 support
            you can trust
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Star className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
              <span className="text-primary-foreground font-medium">
                5-Star Service
              </span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Shield className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">
                Fully Insured
              </span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20">
              <Clock className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-medium">
                24/7 Support
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ShipperQuoteModal />
            <Link href="/about">
              <Button
                variant="outline"
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Global Network */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapIcon className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Nationwide Coverage
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Reliable freight delivery across the entire United States with
                  a strong network of shippers, warehouses, and distribution
                  centers ensuring on-time deliveries coast to coast.
                </p>
              </CardContent>
            </Card>

            {/* Smart Technology */}
            <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <LocateFixedIcon
                    className="text-accent-foreground"
                    size={32}
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Smart Dispatch & Tracking Technology
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered dispatching, real-time GPS tracking, ELD
                  integration, and predictive analytics that keep you updated
                  and ensure every load stays on schedule.
                </p>
              </CardContent>
            </Card>

            {/* Dedicated Fleet */}
            <Card className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Dedicated Fleet & Professional Drivers
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A modern, well-maintained fleet operated by experienced,
                  safety-certified drivers committed to delivering exceptional
                  and damage-free service every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our track record speaks for itself
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-lg text-muted-foreground">
                Fleet Vehicles
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">
                250K+
              </div>
              <div className="text-lg text-muted-foreground">
                Shipments Delivered
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                1.2K+
              </div>
              <div className="text-lg text-muted-foreground">
                Clients Served
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">
                5+
              </div>
              <div className="text-lg text-muted-foreground">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Trusted Partners
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Working with industry leaders to deliver excellence
            </p>
          </div>
          <PartnerCarousel />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive logistics solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Domestic Trucking",
                icon: Globe,
                desc: "Reliable nationwide dry van, reefer, and specialized freight transportation across all 48 states.",
              },
              {
                title: "Dedicated Fleet Solutions",
                icon: Truck,
                desc: "Long-term, dedicated routes and custom fleet services designed exclusively for your business needs.",
              },
              {
                title: "Real-Time Tracking",
                icon: Cpu,
                desc: "Live GPS tracking, ELD-integrated visibility, and real-time shipment status updates 24/7.",
              },
              {
                title: "Expedited & Same-Day Freight",
                icon: CheckCircle,
                desc: "Priority, time-critical deliveries with team drivers and nonstop coast-to-coast movement",
              },
              {
                title: "Freight Management & Dispatch",
                icon: TrendingUp,
                desc: "Professional dispatch, load planning, route optimization, and customer support for seamless operations.",
              },
              {
                title: "High-Value / Secured Freight Services",
                icon: Package,
                desc: "Our operations include enhanced security protocols, locked and sealed trailers, real-time GPS tracking, controlled driver assignments, and strict chain-of-custody procedures.",
              },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <service.icon className="text-primary mb-4" size={40} />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button className="font-semibold w-full sm:w-auto">
                View All Services <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reliability in Motion */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Reliability in <span className="text-accent">Motion</span>
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
              We believe that every mile matters, and every delivery reflects
              our commitment to excellence. From local routes to long-distance
              hauls, we combine dependable service, professional drivers, and
              modern equipment to keep your business moving forward — safely and
              on time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  5+
                </div>
                <div className="text-primary-foreground/70">
                  Years Experience
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  1.2K+
                </div>
                <div className="text-primary-foreground/70">Happy Clients</div>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  99%
                </div>
                <div className="text-primary-foreground/70">
                  On-Time Delivery
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  A
                </div>
                <div className="text-primary-foreground/70">Safety Rating</div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/contact">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg">
                Speak With an Expert <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by businesses worldwide
            </p>
          </div>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Get a custom quote today and experience the Delta Prime difference
          </p>
          <ShipperQuoteModal />
        </div>
      </section>
    </main>
  );
}
