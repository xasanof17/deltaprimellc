"use client";

import { ShipperQuoteModal } from "../shipper-quote-modal";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* -------------------------------
   Animation Variants
-------------------------------- */
const parent: Variants = {
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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function CTAShippers() {
  const ref = useRef<HTMLDivElement | null>(null);

  // re-trigger animation every time it enters the screen
  const inView = useInView(ref, { amount: 0.35, once: false });

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* subtle background shine */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" />
      </div>

      <div
        ref={ref}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2
            variants={fadeItem}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Ready to Optimize Your Shipping?
          </motion.h2>

          <motion.p
            variants={fadeItem}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            Join thousands of businesses that trust Delta Prime for their
            logistics needs
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeItem}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ShipperQuoteModal />

            <Link href="/about">
              <Button
                variant="outline"
                className="w-full md:w-auto bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold"
              >
                View Services <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
