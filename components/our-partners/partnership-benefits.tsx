"use client";

import { CheckCircle } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* -------------------------------
   Animations
-------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

/* -------------------------------
   Component
-------------------------------- */
const PartnershipBenefits = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const inView = useInView(ref, {
    amount: 0.3,
    once: false, // re-animate on scroll up + down
  });

  const benefits = [
    "Access to real-time GPS tracking and shipment visibility",
    "Dedicated account and dispatch support 24/7",
    "Consistent freight opportunities across all 48 states",
    "Modern, well-maintained fleet with advanced safety technology",
    "Transparent pricing and long-term partnership agreements",
    "Reliable, on-time delivery backed by performance analytics",
    "Driver and equipment safety compliance built into every load",
    "Priority access to capacity during peak seasons",
  ];

  return (
    <section className="bg-muted py-20">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT TEXT SIDE */}
          <motion.div
            variants={parent}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.h2
              variants={item}
              className="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              Partnership Benefits
            </motion.h2>

            <motion.div variants={parent} className="space-y-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={item}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    variants={iconFloat}
                    initial="initial"
                    animate="animate"
                  >
                    <CheckCircle
                      className="text-accent mt-1 shrink-0"
                      size={24}
                    />
                  </motion.div>

                  <p className="text-foreground text-base leading-relaxed md:text-lg">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE SIDE */}
          <motion.div
            variants={imageReveal}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative h-[360px] overflow-hidden rounded-xl shadow-xl sm:h-[440px] lg:h-[500px]"
          >
            <img
              src="/logistics-partnership-handshake-business-meeting.jpg"
              alt="Partnership"
              className="h-full w-full scale-105 object-cover transition-all duration-700 hover:scale-100"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;
