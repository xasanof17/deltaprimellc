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
    features: [
      "GPS tracking 24/7",
      "Smart notifications",
      "Dashboards",
      "History insights",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* HERO SECTION */}
      <section className="bg-primary text-primary-foreground relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="mb-6 text-5xl font-bold text-balance md:text-6xl">
              Our Services
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
              Comprehensive transportation solutions tailored to your business
              needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <Card className="hover:border-primary group bg-card flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl">
                  {/* IMAGE */}
                  {service.image && (
                    <div className="relative h-48 shrink-0 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <div className="bg-primary text-primary-foreground absolute top-3 left-3 rounded-md px-3 py-1 text-xs font-semibold">
                        {service.badge}
                      </div>

                      <div className="bg-primary absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-lg">
                        <service.icon
                          size={20}
                          className="text-primary-foreground"
                        />
                      </div>
                    </div>
                  )}

                  {/* CONTENT */}
                  <CardContent className="flex grow flex-col p-5">
                    <h3 className="text-foreground mb-1 text-xl font-bold">
                      {service.title}
                    </h3>

                    {service.subtitle && (
                      <p className="text-primary mb-3 text-xs font-semibold">
                        {service.subtitle}
                      </p>
                    )}

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Bottom aligned area */}
                    <div className="mt-auto">
                      {service.features ? (
                        <div className="space-y-2">
                          {service.features.map((feature, fidx) => (
                            <div key={fidx} className="flex items-center gap-2">
                              <CheckCircle
                                className="text-accent shrink-0"
                                size={16}
                              />
                              <span className="text-xs">{feature}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Link href="/contact">
                          <Button
                            variant="outline"
                            className="group-hover:bg-primary group-hover:text-primary-foreground w-full transition-colors"
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
      <section className="bg-primary text-primary-foreground py-20">
        <motion.div
          className="container mx-auto px-4 text-center sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            How Can We Assist You Today?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed opacity-90">
            Our team is ready to support your freight needs with fast response
            time.
          </p>

          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
