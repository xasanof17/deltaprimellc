"use client";

import { TestimonialsCarousel } from "../animations/testimonials-carousel";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const parent: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
      >
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.h2
            variants={item}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3"
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <TestimonialsCarousel />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
