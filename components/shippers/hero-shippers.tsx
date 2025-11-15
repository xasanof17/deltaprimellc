"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { ShipperQuoteModal } from "../shipper-quote-modal";

/* ------------------------------------------
   ANIMATION VARIANTS
------------------------------------------- */
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
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const imageAnim: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: 60 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ------------------------------------------
   COMPONENT
------------------------------------------- */
const HeroShippersSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <section className="relative py-20 bg-linear-to-r from-primary to-primary/80">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: TEXT */}
          <motion.div
            variants={parent}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="text-primary-foreground"
          >
            <motion.h1
              variants={fadeItem}
              className="text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight font-bold mb-6 text-balance md:max-w-[400px]"
            >
              Ship Smarter, Ship Faster
            </motion.h1>

            <motion.p
              variants={fadeItem}
              className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
            >
              Experience seamless logistics solutions powered by cutting-edge
              technology. From local deliveries to international freight, we've
              got you covered.
            </motion.p>

            <motion.div variants={fadeItem}>
              <ShipperQuoteModal />
            </motion.div>
          </motion.div>

          {/* RIGHT: IMAGE */}
          <motion.div
            variants={imageAnim}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src="/card3.jpg"
              alt="Professional shipper"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroShippersSection;
