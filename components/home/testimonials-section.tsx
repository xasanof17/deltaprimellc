"use client";

import { TestimonialsCarousel } from "../animations/testimonials-carousel";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* ---------------------------------------
   Animation Variants
---------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 35 },
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
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/* ---------------------------------------
   Component
---------------------------------------- */
const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // IMPORTANT: animate again when scrolling up/down
  const inView = useInView(ref, {
    amount: 0.4,
    once: false, // re-trigger animation every time section enters screen
  });

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* soft gradient accent */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
      >
        {/* Heading */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            variants={item}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Trusted by businesses worldwide
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 15 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <TestimonialsCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
