"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/use-count";

/* -----------------------------------------
   FIX: Tailwind-safe color map
----------------------------------------- */
const colorMap: { [key: string]: string } = {
  primary: "text-primary",
  accent: "text-accent",
};

export default function NumbersSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Detect visibility on every scroll in/out
  const inView = useInView(sectionRef, { amount: 0.5 });

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
    else setStart(false);
  }, [inView]);

  /* -----------------------------------------
     Count-up values (synced speed)
  ----------------------------------------- */
  const fleet = useCountUp(0, 500, start, 1.2);
  const shipments = useCountUp(0, 250000, start, 1.2);
  const clients = useCountUp(0, 1200, start, 1.2);
  const years = useCountUp(0, 5, start, 1.2);

  const items = [
    { value: fleet, suffix: "+", label: "Fleet Vehicles", color: "primary" },
    {
      value: shipments,
      suffix: "+",
      label: "Shipments Delivered",
      color: "accent",
    },
    { value: clients, suffix: "+", label: "Clients Served", color: "primary" },
    { value: years, suffix: "+", label: "Years Experience", color: "accent" },
  ];

  return (
    <section ref={sectionRef} className="bg-muted py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center sm:mb-12"
        >
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            By the Numbers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            Our track record speaks for itself
          </p>
        </motion.div>

        {/* Number Blocks */}
        <div className="grid grid-cols-2 justify-items-center gap-10 sm:gap-12 lg:grid-cols-4 lg:gap-16 xl:gap-20">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="min-w-40 text-center xl:min-w-[200px]"
            >
              <div
                className={`font-bold ${colorMap[item.color]} mb-2 text-4xl sm:text-5xl md:text-5xl xl:text-[64px]`}
              >
                {item.value.toLocaleString()}
                {item.suffix}
              </div>

              <div className="text-muted-foreground text-sm sm:text-base md:text-lg">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
