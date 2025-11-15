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
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
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
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Heading */}
        <motion.div variants={fadeItem} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            National Reach, Local Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Headquartered in Illinois with operations spanning all 48
            continental states.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={parent}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* CARD TEMPLATE */}
          {[
            {
              icon: MapPin,
              color: "text-primary",
              title: "Midwest Strength",
              text: "Founded in Illinois with strong, dependable operations across the entire United States.",
            },
            {
              icon: Users,
              color: "text-accent",
              title: "Coast-to-Coast Coverage",
              text: "From major metro hubs to remote destinations, our fleet delivers across all 48 continental states — safely and on time.",
            },
            {
              icon: Award,
              color: "text-primary",
              title: "Industry Leaders",
              text: "Recognized for safety, reliability, and modern fleet management — one of the fastest-growing carriers in America.",
            },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeItem} className="h-full">
              <Card className="h-full flex flex-col border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
                  <p className="text-muted-foreground leading-relaxed grow">
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
