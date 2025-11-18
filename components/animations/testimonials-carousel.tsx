"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Global Manufacturing Inc.",
    role: "Supply Chain Director",
    content:
      "Delta Prime has transformed our logistics operations. Their real-time tracking and predictive analytics have reduced our delivery times by 30%.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    company: "TechCorp Solutions",
    role: "Operations Manager",
    content:
      "The level of professionalism and reliability is unmatched. We've been working with Delta Prime for 5 years and they never disappoint.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    company: "Retail Dynamics",
    role: "Logistics Coordinator",
    content:
      "Their dedicated fleet solutions have been a game-changer for our business. On-time delivery rate is consistently above 99%.",
    rating: 5,
  },
];

/* Smooth, responsive card animation */
const cardVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction === 1 ? 90 : -90,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction === 1 ? -90 : 90,
    scale: 0.95,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

/* Star animation */
const starVariant: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.15 + i * 0.07,
      duration: 0.35,
      ease: "easeOut",
    },
  }),
};

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.3 });

  const active = useMemo(() => testimonials[current], [current]);

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  /* ---------------------------------------------
     1️⃣  KEYBOARD CONTROLS 
     --------------------------------------------- */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  /* ---------------------------------------------
     2️⃣  AUTO-PLAY (only visible)
     --------------------------------------------- */
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [inView]);

  /* ---------------------------------------------
     3️⃣  MOUSE DRAG / SWIPE 
     --------------------------------------------- */
  const dragThreshold = 80;

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -dragThreshold) next();
    if (info.offset.x > dragThreshold) prev();
  };

  /* ---------------------------------------------
     RENDER
     --------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className="carousel-section relative mx-auto w-full max-w-3xl overflow-hidden"
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate={inView ? "center" : "enter"}
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          <Card className="w-full border shadow-md transition-all duration-300 hover:shadow-xl">
            <CardContent className="flex min-h-[280px] flex-col justify-between p-6 sm:min-h-[300px] sm:p-8 md:min-h-80 md:p-10 lg:min-h-[340px]">
              {/* Stars */}
              <div className="mb-3 flex justify-center gap-1">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <motion.div
                    key={i}
                    variants={starVariant}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={i}
                  >
                    <Star className="fill-accent text-accent" size={22} />
                  </motion.div>
                ))}
              </div>

              {/* Quote */}
              <motion.blockquote
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45 }}
                className="text-foreground mb-6 px-2 text-center text-base leading-relaxed sm:text-lg md:text-xl"
              >
                "{active.content}"
              </motion.blockquote>

              {/* Name / meta */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
              >
                <div className="text-lg font-bold">{active.name}</div>
                <div className="text-muted-foreground text-sm">
                  {active.role}
                </div>
                <div className="text-primary text-sm font-semibold">
                  {active.company}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        {/* Prev */}
        <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.15 }}>
          <Button
            role="button"
            variant="outline"
            size="icon"
            onClick={prev}
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
          >
            <ChevronLeft size={20} />
            <span className="sr-only">Previous Button</span>
          </Button>
        </motion.div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              role="button"
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              whileHover={{ scale: 1.4 }}
              className={`dots-button rounded-full transition-all ${
                idx === current ? "bg-primary h-2 w-8" : "bg-border h-2 w-2"
              }`}
            />
          ))}
        </div>

        {/* Next */}
        <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.15 }}>
          <Button
            role="button"
            variant="outline"
            size="icon"
            onClick={next}
            className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
          >
            <ChevronRight size={20} />
            <span className="sr-only">Next Button</span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
