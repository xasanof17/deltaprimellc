"use client";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Megaphone } from "lucide-react";

const items = [
  { label: "Earn a $500 driver referral bonus!", tag: "HOT" },
  { label: "Now hiring OTR company drivers", tag: "NEW" },
  { label: "24/7 Dispatch & Safety Support", tag: "INFO" },
  { label: "New trucks arriving monthly", tag: "NEW" },
];

export function InfiniteBanner() {
  const trackARef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const dragOffset = useMotionValue(0);
  const speed = 0.06;

  const [w, setW] = useState(0);
  const [paused, setPaused] = useState(false);

  // ❗ Measure ONLY Track A width (never the container)
  useEffect(() => {
    if (trackARef.current) {
      setW(trackARef.current.scrollWidth);
    }
  }, []);

  // Infinity loop logic
  useAnimationFrame((_, delta) => {
    if (!w || paused) return;

    const move = speed * delta + dragOffset.get() * delta;
    let next = x.get() - move;

    // When Track A leaves fully, cycle instantly
    if (next <= -w) next += w;
    if (next >= 0) next -= w;

    x.set(next);

    // Decrease drag inertia smoothly
    dragOffset.set(dragOffset.get() * 0.92);
  });

  function handleDrag(_: any, info: { delta: { x: number } }) {
    dragOffset.set(-info.delta.x / 1000);
  }

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 overflow-hidden bg-[#E3000F] py-2 shadow-md select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-linear-to-r from-[#E3000F] to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-linear-to-l from-[#E3000F] to-transparent md:w-20" />

      {/* CONVEYOR SYSTEM */}
      <motion.div
        className="flex cursor-grab whitespace-nowrap will-change-transform active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragElastic={0.0001}
        dragMomentum={false}
        onDrag={handleDrag}
      >
        {/* TRACK A (real items) */}
        <div ref={trackARef} className="flex gap-20">
          {items.map((item, i) => (
            <BannerItem item={item} key={"A-" + i} />
          ))}
        </div>

        {/* TRACK B (cloned items, positioned seamlessly) */}
        <div className="flex gap-20">
          {items.map((item, i) => (
            <BannerItem item={item} key={"B-" + i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function BannerItem({ item }: { item: { label: string; tag: string } }) {
  return (
    <div className="mx-10 flex items-center gap-2 text-sm font-bold text-white">
      <Megaphone size={20} />

      <span
        className={`rounded-md px-2 py-0.5 text-center text-[10px] font-bold ${
          item.tag === "HOT"
            ? "bg-yellow-300 text-black dark:bg-yellow-400"
            : item.tag === "NEW"
              ? "bg-white text-black dark:bg-gray-200"
              : "border border-white/20 bg-black/25 text-white dark:bg-white/20"
        }`}
      >
        {item.tag}
      </span>

      <span>{item.label}</span>
    </div>
  );
}
