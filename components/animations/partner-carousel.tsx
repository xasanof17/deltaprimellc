"use client";

import { useMotionValue, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  const ITEM_W = 160;
  const ITEM_H = 80;
  const GAP = 40;
  const fullItem = ITEM_W + GAP;

  const extended = Array(6).fill(partners).flat();
  const TOTAL_WIDTH = partners.length * fullItem;

  useAnimationFrame((t, delta) => {
    if (!paused) {
      let newX = x.get() - delta * 0.12;
      if (newX <= -TOTAL_WIDTH) newX += TOTAL_WIDTH;
      x.set(newX);
    }
  });

  return (
    <TooltipProvider delayDuration={0}>
      <div className="relative w-full overflow-hidden py-14">
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-linear-to-r to-transparent" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-linear-to-l to-transparent" />

        <motion.div
          style={{ x }}
          className="flex cursor-grab items-center gap-20 active:cursor-grabbing"
          drag="x"
          dragElastic={0.06}
          dragConstraints={{ left: -TOTAL_WIDTH, right: 0 }}
        >
          {extended.map((partner, i) => {
            const [open, setOpen] = useState(false);
            const timer = useRef<NodeJS.Timeout | null>(null);

            return (
              <Tooltip key={i} open={open}>
                <TooltipTrigger
                  asChild
                  onMouseEnter={() => {
                    timer.current = setTimeout(() => {
                      setOpen(true);
                      setPaused(true); // pause ONLY when tooltip is open
                    }, 900);
                  }}
                  onMouseLeave={() => {
                    if (timer.current) clearTimeout(timer.current);
                    setOpen(false);
                    setPaused(false);
                  }}
                >
                  <motion.div
                    className="flex h-14 w-28 shrink-0 translate-z-0 items-center justify-center will-change-transform sm:h-16 sm:w-32 md:h-20 md:w-40"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={ITEM_W}
                      height={ITEM_H}
                      draggable={false}
                      className="max-h-full max-w-full object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                    />
                  </motion.div>
                </TooltipTrigger>

                <TooltipContent
                  side="bottom"
                  className="translate-z-0 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-base text-black shadow-xl backdrop-blur-md will-change-transform dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                >
                  {partner.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
