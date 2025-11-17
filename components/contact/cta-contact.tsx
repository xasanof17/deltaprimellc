"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

/* -------------------------------------------
   Animations — one time only
-------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
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

const phonePulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function CTAContact() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="bg-primary text-primary-foreground py-20">
      <motion.div
        ref={ref}
        variants={parent}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="container mx-auto px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Title */}
        <motion.h2
          variants={fadeItem}
          className="mb-6 text-2xl font-bold text-balance sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Need Immediate Assistance?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeItem}
          className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed opacity-90 sm:text-base md:text-lg lg:text-xl"
        >
          Our 24/7 support team is always ready to help with urgent trucking and
          logistics needs
        </motion.p>

        {/* Button — phone call */}
        <motion.a
          variants={fadeItem}
          href="tel:+17089072006"
          className="inline-block"
        >
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-sm font-semibold sm:text-base md:text-lg"
          >
            <motion.span
              variants={phonePulse}
              initial="initial"
              animate="animate"
              className="mr-2 flex items-center"
            >
              <Phone size={20} />
            </motion.span>
            Call Now: +1 (708) 907-2006
          </Button>
        </motion.a>
      </motion.div>
    </section>
  );
}
