"use client";

import { Award, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, type Variants } from "framer-motion";

/* ------------------------------------------
   Animations
------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ------------------------------------------
   Component
------------------------------------------- */
const NationalReach = () => {
  return (
    <section className="bg-background py-24">
      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }} // 🔥 Re-animate up/down
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div variants={fadeItem} className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
            National Reach, Local Expertise
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            Headquartered in Illinois with operations spanning all 48
            continental states.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={parent}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3"
        >
          {[
            {
              icon: MapPin,
              color: "text-primary",
              title: "Midwest Strength",
              text: "Founded in Illinois with strong, dependable operations across the United States.",
            },
            {
              icon: Users,
              color: "text-accent",
              title: "Coast-to-Coast Coverage",
              text: "From metro hubs to remote destinations — our fleet covers all 48 states with reliable, on-time service.",
            },
            {
              icon: Award,
              color: "text-primary",
              title: "Industry Leaders",
              text: "Known for safety, reliability, and advanced fleet systems — one of America’s fastest-growing carriers.",
            },
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeItem} className="h-full">
              <Card className="border-border bg-card/40 flex h-full flex-col border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <CardContent className="flex grow flex-col p-4 text-center md:p-8">
                  {/* ICON */}
                  <motion.div
                    variants={iconFloat}
                    initial="initial"
                    animate="animate"
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center"
                  >
                    <item.icon className={item.color} size={48} />
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-foreground mb-3 text-2xl font-bold">
                    {item.title}
                  </h3>

                  {/* TEXT */}
                  <p className="text-muted-foreground grow text-base leading-relaxed sm:text-lg">
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

export default NationalReach;
