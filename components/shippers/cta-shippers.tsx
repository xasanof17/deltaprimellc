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
    <section className="bg-primary text-primary-foreground relative overflow-hidden py-20">
      {/* subtle background shine */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0" />
      </div>

      <div
        ref={ref}
        className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h2
            variants={fadeItem}
            className="mb-6 text-4xl font-bold text-balance md:text-5xl"
          >
            Ready to Optimize Your Shipping?
          </motion.h2>

          <motion.p
            variants={fadeItem}
            className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed opacity-90"
          >
            Join thousands of businesses that trust Delta Prime for their
            logistics needs
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeItem}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <ShipperQuoteModal />

            <Link href="/about">
              <Button
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full border-2 bg-transparent font-semibold md:w-auto"
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
