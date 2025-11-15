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
    { value: shipments, suffix: "+", label: "Shipments Delivered", color: "accent" },
    { value: clients, suffix: "+", label: "Clients Served", color: "primary" },
    { value: years, suffix: "+", label: "Years Experience", color: "accent" },
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            By the Numbers
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Our track record speaks for itself
          </p>
        </motion.div>

        {/* Number Blocks */}
        <div
          className="
            grid grid-cols-2 
            lg:grid-cols-4 
            gap-10 sm:gap-12 lg:gap-16 xl:gap-20
            justify-items-center
          "
        >
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
              className="text-center min-w-40 xl:min-w-[200px]"
            >
              <div
                className={`
                  font-bold 
                  ${colorMap[item.color]}
                  text-4xl sm:text-5xl md:text-5xl xl:text-[64px]
                  mb-2
                `}
              >
                {item.value.toLocaleString()}
                {item.suffix}
              </div>

              <div className="text-sm sm:text-base md:text-lg text-muted-foreground">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
