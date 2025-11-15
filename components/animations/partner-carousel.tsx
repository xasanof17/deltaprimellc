"use client";

import { useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const partners = [
  { name: "Amazon Freight", logo: "/partners/amazon.png" },
  { name: "AmTrust", logo: "/partners/amtrust-logo.svg" },
  { name: "Flock Freight", logo: "/partners/flock-freight.svg" },
  { name: "Arrive Logistics", logo: "/partners/arrive-logistics.webp" },
  { name: "FedEx", logo: "/partners/fedex.svg" },
  { name: "Fusion", logo: "/partners/fusion-logo.png" },
  { name: "Freightliner", logo: "/partners/freightliner-logo.png" },
  { name: "Coyote Logistics", logo: "/partners/coyote-logistics.svg" },
  { name: "BestPass", logo: "/partners/best-pass.png" },
  { name: "Armstrong", logo: "/partners/armstrong.png" },
  { name: "CH Robinson", logo: "/partners/ch-robinson.svg" },
  { name: "Uber", logo: "/partners/uber.svg" },
  { name: "Trans Chicago", logo: "/partners/trans-chicago.png" },
  { name: "QuickManage", logo: "/partners/quickmanage.svg" },
  { name: "RPM", logo: "/partners/rpm.svg" },
  { name: "Volvo", logo: "/partners/volvo.svg" },
  { name: "TT ELD", logo: "/partners/tt-eld.svg" },
  { name: "RFX", logo: "/partners/rfx.svg" },
  { name: "Samsara", logo: "/partners/samsara.svg" },
  { name: "Triumph", logo: "/partners/triumph-logo.svg" },
  { name: "Mercer", logo: "/partners/mercer.svg" },
  { name: "NTG", logo: "/partners/ntg-logo.svg" },
  { name: "Molo", logo: "/partners/molo-logo.png" },
  { name: "JB Hunt", logo: "/partners/jb-hunt.svg" },
  { name: "PrePass", logo: "/partners/pre-pass.svg" },
  { name: "Pilot Flying J", logo: "/partners/pilot-flying-j.svg" },
];

export function PartnerCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  // CONSTANT SIZES → perfectly equal logos
  const ITEM_W = 240; // fixed width for logos
  const ITEM_H = 120;
  const GAP = 60;

  const fullItem = ITEM_W + GAP;

  // 🔥 EXTEND x6 (perfect seamless loop)
  const extended = Array(6).fill(partners).flat();

  const TOTAL_WIDTH = partners.length * fullItem;

  /* ---------------------------------------------
     AUTO-SCROLL LOOP (always runs, no disappearance)
  ----------------------------------------------*/
  useAnimationFrame((t, delta) => {
    if (!paused) {
      let newX = x.get() - delta * 0.12;

      // Perfect seamless reset
      if (newX <= -TOTAL_WIDTH) {
        newX += TOTAL_WIDTH;
      }

      x.set(newX);
    }
  });

  return (
    <div className="relative w-full overflow-hidden py-14">
      {/* Left → Fade */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />

      {/* Right → Fade */}
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

      {/* TRACK */}
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="flex items-center gap-20 cursor-grab active:cursor-grabbing"
        drag="x"
        dragElastic={0.06}
        dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onDragStart={() => setPaused(true)}
        onDragEnd={() => setPaused(false)}
      >
        {extended.map((partner, i) => (
          <motion.div
            key={`${partner.name}-${i}`}
            className="shrink-0 w-40 h-20 sm:w-48 sm:h-24 md:w-56 md:h-28 flex items-center justify-center"
            whileHover={{ scale: 1.12 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={ITEM_W}
              height={ITEM_H}
              className="object-contain max-w-full max-h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
