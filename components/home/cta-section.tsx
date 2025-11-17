"use client";

import { ShipperQuoteModal } from "../shipper-quote-modal";
import { motion, type Variants } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

/* ---------------------------------------------
   Animation Variants
---------------------------------------------- */
const textParent: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
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

const ctaButton: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------------------------------------------
   Component
---------------------------------------------- */
const CTASection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // IMPORTANT: re-animate on scroll up/down
  const inView = useInView(ref, {
    amount: 0.5,
    once: false, // re-triggers every time
  });

  return (
    <section className="bg-primary text-primary-foreground relative overflow-hidden py-24">
      {/* Subtle glow background */}
      <div className="from-primary/30 via-primary/20 to-primary/10 pointer-events-none absolute inset-0 bg-linear-to-b" />

      <motion.div
        ref={ref}
        variants={textParent}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8"
      >
        {/* TITLE */}
        <motion.h2
          variants={fadeItem}
          className="mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl"
        >
          Ready to Transform Your Logistics?
        </motion.h2>

        {/* PARAGRAPH */}
        <motion.p
          variants={fadeItem}
          className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed opacity-90"
        >
          Get a custom quote today and experience the Delta Prime difference
        </motion.p>

        {/* CTA BUTTON */}
        <motion.div
          variants={ctaButton}
          className="flex justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <ShipperQuoteModal />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
