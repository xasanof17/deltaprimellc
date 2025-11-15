"use client";

import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* -------------------------------
   ANIMATIONS
------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 40 },
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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------------------
   COMPONENT
------------------------------- */
const PartnerTypes = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.3,
    once: false, // re-animate when scrolling up/down
  });

  const CARDS = [
    {
      title: "Shippers & Businesses",
      text: "Work with Delta Prime to move your freight with safe, reliable, coast-to-coast trucking services.",
      points: [
        "Consistent nationwide coverage",
        "Real-time tracking & communication",
        "Flexible local, regional, and long-haul options",
      ],
    },
    {
      title: "Brokers & Logistics Providers",
      text: "Partner with us for dependable capacity, strong communication, and on-time performance.",
      points: [
        "Steady, high-volume capacity",
        "Fast, transparent payment terms",
        "24/7 operations & dispatch support",
      ],
    },
    {
      title: "Carriers & Owner-Operators",
      text: "Join our carrier network and access stable lanes, fair rates, and professional support.",
      points: [
        "Dedicated lanes and steady freight",
        "Fuel & route optimization support",
        "Safety-first operations and compliance",
      ],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeItem}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Partnership Opportunities
          </motion.h2>

          <motion.p
            variants={fadeItem}
            className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            We collaborate with trusted partners across the U.S. freight and
            logistics industry.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {CARDS.map((card, index) => (
            <motion.div key={index} variants={fadeItem}>
              <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border bg-card">
                <CardContent className="p-5 md:p-8 flex flex-col h-full">
                  {/* Title */}
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-4">
                    {card.title}
                  </h3>

                  {/* Text */}
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                    {card.text}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2 text-muted-foreground mt-auto">
                    {card.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <motion.div
                          variants={iconFloat}
                          initial="initial"
                          animate="animate"
                        >
                          <CheckCircle className="text-primary" size={18} />
                        </motion.div>
                        {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerTypes;
