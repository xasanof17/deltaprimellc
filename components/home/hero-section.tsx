"use client";

import { Button } from "@/components/ui/button";
import { Star, Shield, Clock } from "lucide-react";
import { ShipperQuoteModal } from "@/components/shipper-quote-modal";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

// Fade-up with custom delay
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom,
      duration: 0.3,
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
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden pt-[70px]">
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
          className="h-full w-full object-cover"
        >
          <source src="/in_video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/40 to-black/25" />
      </motion.div>

      {/* Main Content */}
      <div
        className="relative z-10 container mx-auto flex min-h-[75vh] flex-col justify-end px-4 pb-5 text-center sm:px-6 md:pb-20 lg:px-8"
      >
        {/* Title */}
        <motion.h1
          className="text-primary-foreground mb-3 text-3xl leading-tight font-bold drop-shadow-lg sm:mb-4 sm:leading-tight md:text-5xl lg:text-6xl"
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
          className="text-primary-foreground/90 mx-auto mb-5 max-w-3xl text-sm leading-relaxed drop-shadow-md sm:mb-6 md:text-lg lg:text-xl"
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
          className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3"
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
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.12,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <badge.icon className="h-4 w-4 text-white" />
              <span className="text-xs font-medium text-white sm:text-sm">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col justify-center gap-4 sm:flex-row"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          <ShipperQuoteModal />

          <Link href="/about">
            <Button
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full border-2 bg-transparent font-semibold sm:w-auto"
            >
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
