"use client";

import { DriverApplicationModal } from "../driver-application-modal";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* ---------------------------------------
   Animation Variants
---------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 30 },
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

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const buttonVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.15 },
  },
};

export default function CTADrivers() {
  const ref = useRef<HTMLDivElement | null>(null);

  // animate again when scrolling up & down
  const inView = useInView(ref, {
    amount: 0.4,
    once: false,
  });

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" />

      <div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        {/* Animated Title + Subtitle */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Ready to Start Your Journey?
          </motion.h2>

          <motion.p
            variants={item}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            Join the Delta Prime family today and experience what it’s like to
            drive for a company that puts drivers first.
          </motion.p>
        </motion.div>

        {/* Button Animation */}
        <motion.div
          variants={buttonVariant}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex justify-center"
        >
          <DriverApplicationModal />
        </motion.div>
      </div>
    </section>
  );
}
