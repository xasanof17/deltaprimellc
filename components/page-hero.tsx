"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "glass" | "parallax" | "video" | "silhouette";
  bg?: string;         // image url for default/silhouette
  videoBg?: string;    // mp4 video for video variant
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function PageHero({
  title,
  subtitle,
  variant = "default",
  bg,
  videoBg,
}: PageHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative h-[52vh] min-h-[420px] w-full overflow-hidden flex items-center justify-center bg-primary text-primary-foreground"
    >
      {/* Background Layer */}
      {variant === "parallax" && bg && (
        <motion.img
          src={bg}
          style={{ y: yParallax }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}

      {variant === "default" && (
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary/90 to-background" />
      )}

      {variant === "glass" && (
        <div className="absolute inset-0 bg-linear-to-b from-primary/95 to-background" />
      )}

      {variant === "video" && videoBg && (
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
      )}

      {variant === "silhouette" && bg && (
        <>
          <img
            src={bg}
            className="absolute inset-0 w-full h-full object-cover opacity-[0.35]"
          />
          <div className="absolute inset-0 bg-linear-to-b from-primary/60 to-background/90" />
        </>
      )}

      {/* Shine Sweep */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[120%] rotate-12 bg-white/10 blur-[90px]" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Optional glass badge */}
        {variant === "glass" && (
          <motion.div
            className="inline-block mb-6 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm tracking-wide uppercase">Delta Prime</span>
          </motion.div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-xl leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mt-4 opacity-90 leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background/95 to-transparent" />
    </section>
  );
}
