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
    <section className="bg-background relative overflow-hidden py-20">
      {/* soft gradient accent */}
      <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-b via-transparent" />

      <div
        ref={ref}
        className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={item}
            className="text-foreground mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            variants={item}
            className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl"
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
