"use client";

import { motion } from "framer-motion";

export function InfiniteBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-9999 bg-red-500 py-2 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Array(12)
          .fill("Earn a $500.00 driver referral bonus!")
          .map((text, i) => (
            <span key={i} className="mx-6 text-white text-sm font-medium">
              {text}
            </span>
          ))}
      </motion.div>
    </div>
  );
}
