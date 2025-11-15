"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Package,
  Clock,
  Globe,
  BarChart,
  Shield,
  Headphones,
} from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* -------------------------------------------
   Animation Variants
-------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------------------------------
   Component
-------------------------------------------- */
export default function WhyShipWithUs() {
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    amount: 0.35,
    once: false,
  });

  const FEATURES = [
    {
      icon: Clock,
      color: "bg-accent text-accent-foreground",
      title: "On-Time Delivery",
      text: "98.5%+ on-time performance backed by real-time tracking and proactive communication.",
    },
    {
      icon: Globe,
      color: "bg-primary text-primary-foreground",
      title: "Nationwide Coverage",
      text: "Reliable shipping across all 48 states with access to major distribution hubs and regional networks.",
    },
    {
      icon: BarChart,
      color: "bg-accent text-accent-foreground",
      title: "Real-Time Tracking",
      text: "Monitor your freight 24/7 with GPS tracking, instant updates, and transparent notifications.",
    },
    {
      icon: Shield,
      color: "bg-primary text-primary-foreground",
      title: "Cargo Protection",
      text: "Comprehensive insurance and secure-handling protocols for full peace of mind.",
    },
    {
      icon: Package,
      color: "bg-accent text-accent-foreground",
      title: "Flexible Freight Solutions",
      text: "Custom LTL, FTL, dedicated, and expedited solutions tailored to your needs.",
    },
    {
      icon: Headphones,
      color: "bg-primary text-primary-foreground",
      title: "24/7 Support",
      text: "Dedicated account managers and nonstop customer support — anytime, anywhere.",
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">

      {/* FIXED background gradient (NO Z-INDEX 🤝) */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      {/* SAFE CONTENT LAYER */}
      <div
        ref={ref}
        className="relative z-2 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Heading */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeItem}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Why Ship With Delta Prime
          </motion.h2>

          <motion.p
            variants={fadeItem}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Technology-driven solutions that keep your business moving forward
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            max-w-7xl mx-auto
          "
        >
          {FEATURES.map((item, i) => (
            <motion.div key={i} variants={fadeItem} className="h-full">
              <Card className="border-2 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex">
                <CardContent className="p-6 flex flex-col h-full">
                  
                  <motion.div
                    variants={iconFloat}
                    initial="initial"
                    animate="animate"
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto ${item.color}`}
                  >
                    <item.icon size={32} />
                  </motion.div>

                  <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed text-center">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
