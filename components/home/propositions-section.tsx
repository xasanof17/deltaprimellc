"use client";

import { LocateFixedIcon, MapIcon, Truck } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, type Variants } from "framer-motion";

/* ---------------------------------------------------
   FIX: Tailwind-safe color map (no dynamic class error)
--------------------------------------------------- */
const colorMap: { [key: string]: string } = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
};

const items = [
  {
    icon: MapIcon,
    color: "primary",
    title: "Nationwide Coverage",
    desc: "Reliable freight delivery across the entire United States with a strong network of shippers, warehouses, and distribution centers ensuring on-time deliveries coast to coast.",
  },
  {
    icon: LocateFixedIcon,
    color: "accent",
    title: "Smart Dispatch & Tracking Technology",
    desc: "AI-powered dispatching, real-time GPS tracking, ELD integration, and predictive analytics that keep you updated and ensure every load stays on schedule.",
  },
  {
    icon: Truck,
    color: "primary",
    title: "Dedicated Fleet & Professional Drivers",
    desc: "A modern, well-maintained fleet operated by experienced, safety-certified drivers committed to delivering exceptional and damage-free service every time.",
  },
];

/* ---------------------------------------------------
   Card animation variants
--------------------------------------------------- */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function PropositionsSection() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card className="hover:border-primary flex h-full flex-col border-2 transition-all duration-300 hover:shadow-xl">
                <CardContent className="flex grow flex-col p-6 text-center sm:p-8">
                  {/* ICON */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                    className={`mx-auto mb-6 flex items-center justify-center rounded-full ${colorMap[item.color]} h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20`}
                  >
                    <item.icon
                      size={26}
                      className="sm:h-8 sm:w-8 lg:h-9 lg:w-9"
                    />
                  </motion.div>

                  {/* TITLE */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                    className="text-foreground mb-4 flex min-h-14 items-center justify-center text-lg font-bold text-balance sm:text-xl lg:text-2xl"
                  >
                    {item.title}
                  </motion.h3>

                  {/* DESCRIPTION */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.55 }}
                    className="text-muted-foreground text-sm leading-relaxed sm:text-base lg:text-lg xl:text-xl"
                  >
                    {item.desc}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
