"use client";

import { useMotionValue, useAnimationFrame } from "framer-motion";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const items = [
  { label: "Earn a $500 driver referral bonus!", tag: "HOT" },
  { label: "Now hiring OTR company drivers", tag: "NEW" },
  { label: "24/7 Dispatch & Safety Support", tag: "INFO" },
  { label: "New trucks arriving monthly", tag: "NEW" },
];

export function InfiniteBanner() {
  const x = useMotionValue(0);
  const SPEED = 0.06; // smaller = slower

  // visual spacing unit (doesn't have to be exact px)
  const ITEM_W = 260;
  const GAP = 80;
  const FULL_ITEM = ITEM_W + GAP;

  // repeat content for seamless loop
  const extended = Array(6).fill(items).flat();
  const TOTAL_WIDTH = items.length * FULL_ITEM;

  useAnimationFrame((t, delta) => {
    let newX = x.get() - delta * SPEED;

    if (newX <= -TOTAL_WIDTH) {
      newX += TOTAL_WIDTH;
    }

    x.set(newX);
  });

  return (
    <div className="fixed top-0 right-0 left-0 z-50 overflow-hidden bg-red-600 py-2 shadow-md select-none dark:bg-red-700">
      {/* Left fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-linear-to-r from-red-600 to-transparent sm:w-20 dark:from-red-700" />
      {/* Right fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-linear-to-l from-red-600 to-transparent sm:w-20 dark:from-red-700" />

      <motion.div
        style={{ x }}
        className="flex cursor-grab items-center gap-20 whitespace-nowrap will-change-transform active:cursor-grabbing"
        drag="x"
        dragElastic={0.08}
        dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
      >
        {extended.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className="mx-4 flex items-center gap-3 text-xs font-semibold tracking-wide text-white sm:text-sm md:text-base dark:text-white"
          >
            <Megaphone size={16} className="shrink-0 opacity-80" />

            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${
                item.tag === "HOT" &&
                "bg-yellow-300 text-black dark:bg-yellow-400"
              } ${
                item.tag === "NEW" && "bg-white text-black dark:bg-gray-200"
              } ${
                item.tag === "INFO" &&
                "border border-white/20 bg-black/25 text-white dark:bg-white/20"
              } `}
            >
              {item.tag}
            </span>

            <span className="opacity-95">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
