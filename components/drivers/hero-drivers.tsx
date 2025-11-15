"use client";

import { DriverApplicationModal } from "../driver-application-modal";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

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
const HeroDriversSection = () => {
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
              className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-tight font-bold mb-6 text-balance"
            >
              Drive With Delta Prime
            </motion.h1>

            <motion.p
              variants={fadeItem}
              className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed"
            >
              Join a professional team that values your experience, respects
              your time, and rewards your hard work. Enjoy steady miles, modern
              equipment, and reliable support from a company committed to driver
              success.
            </motion.p>

            <motion.div variants={fadeItem}>
              <DriverApplicationModal />
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
              src="/card2.jpg"
              alt="Professional driver"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroDriversSection;
