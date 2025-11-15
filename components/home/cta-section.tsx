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
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-primary/20 to-primary/10 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={textParent}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* TITLE */}
        <motion.h2
          variants={fadeItem}
          className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-balance"
        >
          Ready to Transform Your Logistics?
        </motion.h2>

        {/* PARAGRAPH */}
        <motion.p
          variants={fadeItem}
          className="text-xl max-w-2xl mx-auto opacity-90 mb-10 leading-relaxed"
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
