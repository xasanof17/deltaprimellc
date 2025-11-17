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
    <section className="bg-background py-20">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={fadeItem}
            className="text-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl"
          >
            Partnership Opportunities
          </motion.h2>

          <motion.p
            variants={fadeItem}
            className="text-muted-foreground mx-auto max-w-2xl text-lg lg:text-xl"
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
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {CARDS.map((card, index) => (
            <motion.div key={index} variants={fadeItem}>
              <Card className="bg-card h-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="flex h-full flex-col p-5 md:p-8">
                  {/* Title */}
                  <h3 className="text-foreground mb-4 text-lg font-bold md:text-xl lg:text-2xl">
                    {card.title}
                  </h3>

                  {/* Text */}
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed lg:text-lg">
                    {card.text}
                  </p>

                  {/* Points */}
                  <ul className="text-muted-foreground mt-auto space-y-2">
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
