"use client";

import { Globe, Handshake, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, type Variants } from "framer-motion";

/* -------------------------------------------------------
   Animation Variants
------------------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const floatIcon: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------------------------------------------
   Component
------------------------------------------------------- */
const WhyPartnerWithUs = () => {
  const ITEMS = [
    {
      icon: Globe,
      bg: "bg-primary",
      color: "text-primary-foreground",
      title: "Nationwide Coverage",
      text: "Reliable coast-to-coast service across all 48 continental states.",
    },
    {
      icon: TrendingUp,
      bg: "bg-accent",
      color: "text-accent-foreground",
      title: "Growth Opportunities",
      text: "Expand your business with our continuously growing shipper network.",
    },
    {
      icon: Shield,
      bg: "bg-primary",
      color: "text-primary-foreground",
      title: "Fair & Transparent Terms",
      text: "Competitive rates, honest communication, and clear partnership agreements.",
    },
    {
      icon: Handshake,
      bg: "bg-accent",
      color: "text-accent-foreground",
      title: "24/7 Partner Support",
      text: "Round-the-clock assistance from experienced dispatch & operations teams.",
    },
  ];

  return (
    <section className="bg-background py-24">
      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }} // 🔥 re-animate on scroll
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div
          variants={fadeItem}
          className="mb-14 text-center"
          viewport={{ once: false }}
        >
          <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            Why Partner With Us
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Experience the benefits of working with an industry leader
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={parent}
          viewport={{ once: false }}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ITEMS.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeItem}
              viewport={{ once: false, amount: 0.35 }} // 🔥 re-animate on scroll down/up
              className="h-full"
            >
              <Card className="bg-card flex h-full flex-col rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="flex grow flex-col p-6 text-center">
                  {/* Floating Icon */}
                  <motion.div
                    variants={floatIcon}
                    initial="initial"
                    animate="animate"
                    className={`h-16 w-16 ${item.bg} mx-auto mb-6 flex items-center justify-center rounded-full shadow-md`}
                  >
                    <item.icon className={item.color} size={32} />
                  </motion.div>

                  <h3 className="text-foreground mb-3 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground grow leading-relaxed">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyPartnerWithUs;
