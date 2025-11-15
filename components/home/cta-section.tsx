"use client";

import { ShipperQuoteModal } from "../shipper-quote-modal";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* Parent stagger animation */
const textParent: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ctaButton: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.25 },
  },
};

const CtaSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* TEXT ANIMATIONS */}
        <motion.div
          variants={textParent}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={fadeItem}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Ready to Transform Your Logistics?
          </motion.h2>

          <motion.p
            variants={fadeItem}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            Get a custom quote today and experience the Delta Prime difference
          </motion.p>
        </motion.div>

        {/* CTA BUTTON ANIMATION */}
        <motion.div
          variants={ctaButton}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex justify-center"
        >
          <ShipperQuoteModal />
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
