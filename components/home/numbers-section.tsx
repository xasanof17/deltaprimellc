"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/use-count";

const NumbersSection = () => {
  const ref = useRef(null);

  // Trigger every time user scrolls into view (not once!)
  const isInView = useInView(ref, {
    amount: 0.4, // 40% visibility
  });

  // Cooldown to prevent spam triggering
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
    } else {
      // Reset numbers when leaving viewport
      setShouldAnimate(false);
    }
  }, [isInView]);

  // Count-up values
  const fleet = useCountUp(0, 500, shouldAnimate);
  const shipments = useCountUp(0, 250000, shouldAnimate);
  const clients = useCountUp(0, 1200, shouldAnimate);
  const years = useCountUp(0, 5, shouldAnimate);

  const items = [
    { value: fleet, suffix: "+", label: "Fleet Vehicles", color: "text-primary" },
    { value: shipments, suffix: "+", label: "Shipments Delivered", color: "text-accent" },
    { value: clients, suffix: "+", label: "Clients Served", color: "text-primary" },
    { value: years, suffix: "+", label: "Years Experience", color: "text-accent" },
  ];

  return (
    <section className="py-20 bg-muted" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            By the Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our track record speaks for itself
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="text-center"
            >
              <div className={`text-5xl md:text-6xl font-bold ${item.color} mb-2`}>
                {item.value.toLocaleString()}
                {item.suffix}
              </div>
              <div className="text-lg text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
