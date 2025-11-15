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
    <section className="py-24 bg-background">
      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }} // 🔥 Re-animate up/down
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div variants={fadeItem} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            National Reach, Local Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Headquartered in Illinois with operations spanning all 48
            continental states.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={parent}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
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
              <Card
                className="h-full flex flex-col border border-border bg-card/40 backdrop-blur-sm 
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-8 flex flex-col grow text-center">

                  {/* ICON */}
                  <motion.div
                    variants={iconFloat}
                    initial="initial"
                    animate="animate"
                    className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  >
                    <item.icon className={item.color} size={48} />
                  </motion.div>

                  {/* TITLE */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>

                  {/* TEXT */}
                  <p className="text-muted-foreground leading-relaxed grow text-base sm:text-lg">
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
