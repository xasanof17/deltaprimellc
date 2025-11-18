"use client";

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

import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/button";

const MotionButton = motion(Button);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

const ServicesSection = () => {
  const services = [
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
      desc: "Priority, time-critical deliveries with team drivers and nonstop coast-to-coast movement.",
    },
    {
      title: "Freight Management & Dispatch",
      icon: TrendingUp,
      desc: "Professional dispatch, route planning, optimization, and customer support for seamless operations.",
    },
    {
      title: "High-Value / Secured Freight Services",
      icon: Package,
      desc: "Enhanced security protocols, locked/sealed trailers, GPS tracking, controlled driver assignments.",
    },
  ];

  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Animation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          variants={fadeUp}
          custom={0}
          className="mb-12 text-center"
        >
          <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Our Services
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Comprehensive logistics solutions tailored to your needs
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={cardAnim}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.2, once: false }}
              custom={idx + 1}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="rounded-xl shadow-sm transition-shadow hover:shadow-xl">
                <CardContent className="p-4 md:p-6">
                  <service.icon className="text-primary mb-4" size={40} />
                  <h3 className="text-foreground mb-2 text-xl font-bold">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0.3}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center"
        >
          <Link href="/services">
            <MotionButton
              className="w-full font-semibold sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96, y: 0 }}
            >
              View All Services <ArrowRight className="ml-2" size={20} />
            </MotionButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
