"use client";

import { Award, DollarSign, Heart, Shield, Truck, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

/* ------------------------------------------
   ANIMATION VARIANTS
------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ------------------------------------------
   DATA
------------------------------------------- */
const FEATURES = [
  {
    icon: DollarSign,
    bg: "bg-accent",
    iconColor: "text-accent-foreground",
    title: "Competitive Pay",
    text: "Top industry pay with performance bonuses and regular rate increases.",
  },
  {
    icon: Truck,
    bg: "bg-primary",
    iconColor: "text-primary-foreground",
    title: "Modern Fleet",
    text: "Late-model trucks with safety tech, comfort options, and reliable maintenance.",
  },
  {
    icon: Heart,
    bg: "bg-accent",
    iconColor: "text-accent-foreground",
    title: "Work-Life Balance",
    text: "Flexible schedules, home time options, and routes built around your lifestyle.",
  },
  {
    icon: Shield,
    bg: "bg-primary",
    iconColor: "text-primary-foreground",
    title: "Supportive Team",
    text: "24/7 dispatch support, friendly driver managers, and a respect-first culture.",
  },
  {
    icon: Award,
    bg: "bg-accent",
    iconColor: "text-accent-foreground",
    title: "Recognition & Rewards",
    text: "Monthly bonuses, driver awards, and performance recognition programs.",
  },
  {
    icon: Users,
    bg: "bg-primary",
    iconColor: "text-primary-foreground",
    title: "Reliable Weekly Settlements",
    text: "Fast weekly settlements and transparent pay statements — always on time.",
  },
];

/* ------------------------------------------
   COMPONENT
------------------------------------------- */
const WhyDriveWithUs = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.25 });

  return (
    <section className="bg-background py-20">
      <motion.div
        ref={ref}
        variants={parent}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Title */}
        <motion.h2
          variants={fadeItem}
          className="text-foreground mb-12 text-center text-4xl font-bold md:text-5xl"
        >
          Why Drive With Us
        </motion.h2>

        {/* Cards */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={i} variants={fadeItem}>
              <Card className="h-full border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="flex h-full flex-col p-8">
                  {/* Icon */}
                  <motion.div
                    variants={iconFloat}
                    initial="initial"
                    animate="animate"
                    className={`h-16 w-16 ${f.bg} mb-5 flex items-center justify-center rounded-full shadow-md`}
                  >
                    <f.icon className={f.iconColor} size={32} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-foreground mb-3 text-xl font-bold">
                    {f.title}
                  </h3>

                  {/* Text */}
                  <p className="text-muted-foreground grow leading-relaxed">
                    {f.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyDriveWithUs;
