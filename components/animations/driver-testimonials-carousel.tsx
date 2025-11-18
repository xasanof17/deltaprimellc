"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  type Variants,
} from "framer-motion";

const testimonials = [
  {
    name: "Mike Johnson",
    role: "OTR Driver • 3 Years",
    content:
      "Best company I've worked for. Modern trucks, great support, and I'm home every other weekend just like promised.",
  },
  {
    name: "Sarah Martinez",
    role: "Regional Driver • 5 Years",
    content:
      "Delta Prime actually cares about drivers. Fair pay, real work-life balance, and amazing dispatchers.",
  },
  {
    name: "David Chen",
    role: "Dedicated Route • 2 Years",
    content:
      "Steady miles, predictable schedule, and a team that treats you with respect. Couldn't ask for better.",
  },
];

const cardVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir === 1 ? 100 : -100,
    scale: 0.93,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir === 1 ? -100 : 100,
    scale: 0.93,
    transition: { duration: 0.4, ease: "easeIn" },
  }),
};

export default function DriverTestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  const current = useMemo(() => testimonials[index], [index]);

  const next = () => {
    setDir(1);
    setIndex((i) => (i + 1) % testimonials.length);
  };

  const prev = () => {
    setDir(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  /* Keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Auto-play */
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [inView]);

  /* Drag/swipe */
  const dragEnd = (_: any, info: any) => {
    if (info.offset.x < -60) next();
    if (info.offset.x > 60) prev();
  };

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-3xl">
      <AnimatePresence custom={dir} mode="popLayout">
        <motion.div
          key={index}
          custom={dir}
          variants={cardVariants}
          initial="enter"
          animate={inView ? "center" : "enter"}
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={dragEnd}
        >
          <Card className="bg-card border shadow-md transition-all hover:shadow-xl">
            <CardContent className="flex min-h-[290px] flex-col justify-between p-3 sm:p-10 md:p-8">
              <div className="mb-2 flex justify-center md:mb-4">
                <Quote className="text-accent h-10 w-10 opacity-80" />
              </div>

              <p className="text-foreground mb-6 px-3 text-center text-lg italic sm:text-xl md:leading-relaxed">
                "{current.content}"
              </p>

              <div className="text-center">
                <p className="text-lg font-bold">{current.name}</p>
                <p className="text-muted-foreground text-sm">{current.role}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.1 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="h-10 w-10 rounded-full"
          >
            <ChevronLeft size={22} />
          </Button>
        </motion.div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              whileHover={{ scale: 1.3 }}
              className={`dots-button rounded-full transition-all ${
                i === index
                  ? "bg-primary h-2 w-8"
                  : "bg-border h-2 w-2 opacity-60"
              }`}
            />
          ))}
        </div>

        <motion.div whileTap={{ scale: 0.92 }} whileHover={{ scale: 1.1 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="h-10 w-10 rounded-full"
          >
            <ChevronRight size={22} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
