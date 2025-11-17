"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import DriverTestimonialsCarousel from "../animations/driver-testimonials-carousel";

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

const underline: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function DriverTestimonials() {
  const ref = useRef<HTMLDivElement | null>(null);

  // animate again when scrolling up/down
  const inView = useInView(ref, {
    amount: 0.35,
    once: false,
  });

  return (
    <section className="bg-background relative overflow-hidden py-20">
      {/* background soft accent */}
      <div className="pointer-events-none absolute inset-0" />

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
            className="text-foreground mb-3 text-4xl font-bold md:text-5xl"
          >
            What Our Drivers Say
          </motion.h2>

          <motion.div
            variants={underline}
            className="from-primary via-accent to-primary mx-auto mb-4 h-[3px] w-20 rounded-full bg-linear-to-r sm:w-28"
          />

          <motion.p
            variants={item}
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
          >
            Real stories from the professionals behind the wheel
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={
            inView
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.94, y: 10 }
          }
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <DriverTestimonialsCarousel />
        </motion.div>
      </div>
    </section>
  );
}
