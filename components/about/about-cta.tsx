"use client";

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, type Variants } from "framer-motion";

/* -------------------------------------------------
   ANIMATIONS
-------------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.15,
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
  initial: { y: 0, scale: 1 },
  animate: {
    y: [-6, 6, -6],
    scale: [1, 1.04, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------------------------------------
   COMPONENT
-------------------------------------------------- */
const AboutCTA = () => {
  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden py-24">
      {/* Soft gradient overlay */}
      <div className="from-primary/20 via-primary/10 pointer-events-none absolute inset-0 bg-linear-to-b to-transparent" />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35 }} // 🔥 re-animates scroll up/down
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* ICON */}
          <motion.div
            variants={fadeItem}
            className="mx-auto mb-6 flex items-center justify-center"
          >
            <motion.div
              variants={iconFloat}
              initial="initial"
              animate="animate"
              className="bg-primary-foreground/10 border-primary-foreground/20 flex h-20 w-20 items-center justify-center rounded-2xl border shadow-xl backdrop-blur-sm"
            >
              <TrendingUp size={42} className="text-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            variants={fadeItem}
            className="mb-6 text-4xl leading-tight font-bold md:text-5xl"
          >
            Technology-Driven Excellence
          </motion.h2>

          {/* TEXT */}
          <motion.p
            variants={fadeItem}
            className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed opacity-90 md:text-xl"
          >
            Our proprietary logistics platform uses machine learning algorithms
            to optimize routes, predict potential delays, and automate
            documentation. Real-time analytics provide unmatched transparency,
            while our mobile apps keep your supply chain connected 24/7.
          </motion.p>

          {/* BUTTON */}
          <motion.div variants={fadeItem}>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-xl"
              >
                Contact Us to Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutCTA;
