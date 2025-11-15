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
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-primary/10 to-transparent pointer-events-none" />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35 }} // 🔥 re-animates scroll up/down
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* ICON */}
          <motion.div
            variants={fadeItem}
            className="mx-auto mb-6 flex items-center justify-center"
          >
            <motion.div
              variants={iconFloat}
              initial="initial"
              animate="animate"
              className="w-20 h-20 rounded-2xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm flex items-center justify-center shadow-xl"
            >
              <TrendingUp size={42} className="text-primary-foreground" />
            </motion.div>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            variants={fadeItem}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Technology-Driven Excellence
          </motion.h2>

          {/* TEXT */}
          <motion.p
            variants={fadeItem}
            className="text-lg md:text-xl leading-relaxed opacity-90 mb-10 max-w-3xl mx-auto"
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
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-[1.04] transition-all duration-300"
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
