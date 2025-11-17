"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "glass" | "parallax" | "video" | "silhouette";
  bg?: string; // image url for default/silhouette
  videoBg?: string; // mp4 video for video variant
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
      className="bg-primary text-primary-foreground relative flex h-[52vh] min-h-[420px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background Layer */}
      {variant === "parallax" && bg && (
        <motion.img
          src={bg}
          style={{ y: yParallax }}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}

      {variant === "default" && (
        <div className="from-primary via-primary/90 to-background absolute inset-0 bg-linear-to-br" />
      )}

      {variant === "glass" && (
        <div className="from-primary/95 to-background absolute inset-0 bg-linear-to-b" />
      )}

      {variant === "video" && videoBg && (
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}

      {variant === "silhouette" && bg && (
        <>
          <img
            src={bg}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.35]"
          />
          <div className="from-primary/60 to-background/90 absolute inset-0 bg-linear-to-b" />
        </>
      )}

      {/* Shine Sweep */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/2 h-[120%] w-[60%] -translate-x-1/2 rotate-12 bg-white/10 blur-[90px]" />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn}
        className="relative z-20 container mx-auto px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Optional glass badge */}
        {variant === "glass" && (
          <motion.div
            className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 shadow-lg backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm tracking-wide uppercase">Delta Prime</span>
          </motion.div>
        )}

        <h1 className="text-4xl leading-tight font-bold tracking-tight drop-shadow-xl sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed opacity-90 sm:text-xl">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Bottom fade */}
      <div className="from-background/95 absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t to-transparent" />
    </section>
  );
}
