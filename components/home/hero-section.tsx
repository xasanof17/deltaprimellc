"use client";

import { Button } from "@/components/ui/button";
import { Star, Shield, Clock } from "lucide-react";
import { ShipperQuoteModal } from "@/components/shipper-quote-modal";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

// Fade-up with custom delay
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Gentle floating animation for title
const floatTitle: Variants = {
  initial: { y: 0 },
  float: {
    y: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-svh flex items-center justify-center overflow-hidden pt-[70px]">
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/in_video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/40 to-black/25" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="
          relative z-10 
          container mx-auto 
          px-4 sm:px-6 lg:px-8
          flex flex-col
          justify-end
          pb-5 md:pb-20   /* FIX: Extra breathing room for mobile */
          text-center
          min-h-[75vh]     /* FIX: Controls spacing tightly */
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="
            text-3xl 
            md:text-5xl 
            lg:text-6xl 
            font-bold 
            text-primary-foreground 
            mb-3 sm:mb-4 
            leading-tight sm:leading-tight 
            drop-shadow-lg
          "
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <motion.span variants={floatTitle} initial="initial" animate="float">
            DELTA PRIME LLC
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="
            text-sm 
            md:text-lg 
            lg:text-xl 
            text-primary-foreground/90 
            mb-5 sm:mb-6 
            max-w-3xl mx-auto 
            leading-relaxed 
            drop-shadow-md
          "
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
        >
          Reliable, safe, and efficient nationwide trucking solutions. We ensure
          your freight reaches its destination on time, every time — backed by
          modern equipment, professional drivers, and 24/7 support.
        </motion.p>

        {/* Badges */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
        >
          {[
            { icon: Star, text: "5-Star Service" },
            { icon: Shield, text: "Fully Insured" },
            { icon: Clock, text: "24/7 Support" },
          ].map((badge, i) => (
            <motion.div
              key={badge.text}
              className="
                flex items-center gap-2 
                bg-white/10 backdrop-blur-sm 
                px-3 py-1.5 
                rounded-full 
                border border-white/20
              "
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.12,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <badge.icon className="w-4 h-4 text-white" />
              <span className="text-white text-xs sm:text-sm font-medium">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <ShipperQuoteModal />

          <Link href="/about">
            <Button
              variant="outline"
              className="
                bg-transparent
                border-2 border-primary-foreground 
                text-primary-foreground
                hover:bg-primary-foreground 
                hover:text-primary 
                font-semibold
                w-full sm:w-auto
              "
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
