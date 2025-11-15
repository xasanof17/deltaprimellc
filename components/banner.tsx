"use client";

import { motion } from "framer-motion";

export function InfiniteBanner() {
  return (
    <div className="w-full overflow-hidden bg-red-600 text-white py-2">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <span className="mx-8">
          Earn a $500.00 driver referral bonus!
        </span>
        <span className="mx-8">
          Earn a $500.00 driver referral bonus!
        </span>
        <span className="mx-8">
          Earn a $500.00 driver referral bonus!
        </span>
      </motion.div>
    </div>
  );
}
