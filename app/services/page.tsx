"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Truck,
  Cpu,
  FileCheck,
  Package,
  TrendingUp,
  CheckCircle,
  MapPin,
  Route,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

/* ---------------------------------------------------
   ANIMATIONS
--------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" },
  }),
};

/* ---------------------------------------------------
   SERVICES DATA
--------------------------------------------------- */

const services = [
  {
    icon: MapPin,
    title: "Local Trucking",
    subtitle: "Fast, Reliable Delivery in Your Area",
    description:
      "Our local trucking services are designed for short-distance transportation — same-city or county. Perfect for businesses needing same-day deliveries.",
    badge: "Same Day",
    image: "/card1.jpg",
  },
  {
    icon: Route,
    title: "Regional Trucking",
    subtitle: "Dependable Service Across the Region",
    description:
      "Efficient, cost-effective multi-state transportation with experienced regional drivers and optimized routing.",
    badge: "Flexible",
    image: "/card2.jpg",
  },
  {
    icon: Globe2,
    title: "Long Distance Trucking",
    subtitle: "Nationwide Freight Solutions You Can Trust",
    description:
      "Reliable coast-to-coast shipping with a modern fleet, real-time tracking, and professional long-haul drivers.",
    badge: "Coast to Coast",
    image: "/card3.jpg",
  },
  {
    icon: FileCheck,
    title: "Expedited & Same-Day Freight",
    description:
      "Priority nonstop transportation for time-critical freight using team drivers and optimized high-speed routing.",
    features: [
      "Same-day & next-day delivery",
      "Team-driver service",
      "Priority dispatch",
      "24/7 real-time tracking",
    ],
  },
  {
    icon: Package,
    title: "Dedicated Fleet Solutions",
    description:
      "Custom long-term truck & driver assignments designed exclusively for your business operations.",
    features: [
      "Dedicated trucks & drivers",
      "Flexible scheduling",
      "Custom routing",
      "Performance reports",
    ],
  },
  {
    icon: TrendingUp,
    title: "Real-Time Tracking & Analytics",
    description:
      "Advanced logistics visibility with GPS tracking, automated updates, and detailed performance analytics.",
    features: ["GPS tracking 24/7", "Smart notifications", "Dashboards", "History insights"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">

      {/* HERO SECTION */}
      <section className="relative py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Our Services
            </h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Comprehensive transportation solutions tailored to your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">

            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="h-full"
                variants={cardAnim}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                custom={idx}
              >
                <Card
                  className="flex flex-col h-full overflow-hidden border hover:border-primary transition-all duration-300 hover:shadow-xl group bg-card rounded-xl"
                >
                  {/* IMAGE */}
                  {service.image && (
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-md text-xs font-semibold">
                        {service.badge}
                      </div>

                      <div className="absolute top-3 right-3 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <service.icon size={20} className="text-primary-foreground" />
                      </div>
                    </div>
                  )}

                  {/* CONTENT */}
                  <CardContent className="p-5 flex flex-col grow">

                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {service.title}
                    </h3>

                    {service.subtitle && (
                      <p className="text-xs font-semibold text-primary mb-3">
                        {service.subtitle}
                      </p>
                    )}

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Bottom aligned area */}
                    <div className="mt-auto">
                      {service.features ? (
                        <div className="space-y-2">
                          {service.features.map((feature, fidx) => (
                            <div key={fidx} className="flex items-center gap-2">
                              <CheckCircle className="text-accent shrink-0" size={16} />
                              <span className="text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Link href="/contact">
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          >
                            Learn More
                          </Button>
                        </Link>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-primary text-primary-foreground">
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How Can We Assist You Today?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
            Our team is ready to support your freight needs with fast response time.
          </p>

          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
