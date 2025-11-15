"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* -------------------------
   ANIMATIONS
------------------------- */
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonAnim: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

/* -------------------------
   COMPONENT
------------------------- */
const OurPartnersCTA = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    amount: 0.3,
    once: false, // Re-animate when scrolling up/down
  });

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          variants={parent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Title */}
          <motion.h2
            variants={fadeItem}
            className="text-4xl md:text-5xl font-bold mb-6 text-balance"
          >
            Ready to Partner With Us?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeItem}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed"
          >
            Join our network of successful partners and take your logistics
            business to the next level
          </motion.p>

          {/* Button */}
          <motion.div variants={buttonAnim} className="flex justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 flex items-center gap-2"
              >
                Contact Us Today
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurPartnersCTA;
