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
    <section className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card className="h-full border-2 hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col">
                <CardContent className="p-6 sm:p-8 flex flex-col grow text-center">

                  {/* ICON */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                    className={`mx-auto mb-6 rounded-full flex items-center justify-center 
                    ${colorMap[item.color]} 
                    w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20`}
                  >
                    <item.icon
                      size={26}
                      className="sm:w-8 sm:h-8 lg:w-9 lg:h-9"
                    />
                  </motion.div>

                  {/* TITLE */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.1, duration: 0.5 }}
                    className="
                      text-lg sm:text-xl lg:text-2xl 
                      font-bold text-foreground mb-4 min-h-14 
                      flex items-center justify-center text-balance
                    "
                  >
                    {item.title}
                  </motion.h3>

                  {/* DESCRIPTION */}
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.55 }}
                    className="
                      text-sm sm:text-base lg:text-lg 
                      xl:text-xl text-muted-foreground 
                      leading-relaxed 
                    "
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
