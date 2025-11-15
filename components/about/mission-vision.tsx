"use client";

import { Card, CardContent } from "../ui/card";
import { Eye, Target } from "lucide-react";
import { motion, type Variants } from "framer-motion";

/* Animations */
const parent: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-4, 4, -4],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const MissionVisionSection = () => {
  return (
    <section className="py-20 sm:py-24 bg-background relative overflow-hidden">
      {/* Soft Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Mission */}
          <motion.div variants={item}>
            <Card className="border border-primary/40 shadow-lg hover:shadow-2xl transition-all backdrop-blur-md bg-card/70 relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1.5 sm:w-2 h-full bg-primary rounded-r-full" />

              <CardContent className="p-6 sm:p-8 lg:p-10 relative z-10">
                <motion.div
                  variants={iconFloat}
                  initial="initial"
                  animate="animate"
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 border border-primary/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-lg"
                >
                  <Target className="text-primary" size={32} />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
                  Our Mission
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  To revolutionize global logistics through cutting-edge
                  technology, exceptional service, and unwavering reliability.
                  We don{'\u2019'}t just move freight — we build trust, speed, and
                  efficiency into every mile.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div variants={item}>
            <Card className="border border-accent/40 shadow-lg hover:shadow-2xl transition-all backdrop-blur-md bg-card/70 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-1.5 sm:w-2 h-full bg-accent rounded-l-full" />

              <CardContent className="p-6 sm:p-8 lg:p-10 relative z-10">
                <motion.div
                  variants={iconFloat}
                  initial="initial"
                  animate="animate"
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-accent/10 border border-accent/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-lg"
                >
                  <Eye className="text-accent" size={32} />
                </motion.div>

                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
                  Our Vision
                </h2>

                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                  To become the world{'\u2019'}s most trusted logistics partner
                  by setting new global standards in innovation, sustainability,
                  and customer experience — transforming the future of freight.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default MissionVisionSection;
