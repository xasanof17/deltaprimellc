import {
  Globe,
  Cpu,
  Truck,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Package,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;
