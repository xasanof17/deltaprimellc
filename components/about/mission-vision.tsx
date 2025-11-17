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
    transition: { duration: 0.65, ease: "easeOut", staggerChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const iconFloat: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const MissionVisionSection = () => {
  return (
    <section className="bg-background relative overflow-hidden py-20 sm:py-24">
      {/* Soft Gradient */}
      <div className="from-primary/5 to-accent/5 pointer-events-none absolute inset-0 bg-linear-to-b via-transparent" />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }} // 🔥 Re-animate on scroll up/down
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          {/* Mission */}
          <motion.div variants={item} viewport={{ once: false }}>
            <Card className="border-primary/40 bg-card/70 relative min-h-[380px] overflow-hidden border shadow-lg backdrop-blur-md transition-all hover:shadow-2xl md:min-h-[400px]">
              <div className="bg-primary absolute top-0 left-0 h-full w-1.5 rounded-r-full sm:w-2" />

              <CardContent className="relative z-10 flex flex-col p-6 sm:p-8 lg:p-10">
                <motion.div
                  variants={iconFloat}
                  initial="initial"
                  animate="animate"
                  className="bg-primary/10 border-primary/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-md sm:h-20 sm:w-20 md:mx-0"
                >
                  <Target className="text-primary" size={34} />
                </motion.div>

                <h2 className="text-foreground mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-left">
                  Our Mission
                </h2>

                <p className="text-muted-foreground text-center text-base leading-relaxed sm:text-lg md:text-left">
                  To revolutionize global logistics through cutting-edge
                  technology, exceptional service, and unwavering reliability.
                  We don’t just move freight — we build trust, speed, and
                  efficiency into every mile.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision */}
          <motion.div variants={item} viewport={{ once: false }}>
            <Card className="border-accent/40 bg-card/70 relative min-h-[380px] overflow-hidden border shadow-lg backdrop-blur-md transition-all hover:shadow-2xl md:min-h-[400px]">
              <div className="bg-accent absolute top-0 right-0 h-full w-1.5 rounded-l-full sm:w-2" />

              <CardContent className="relative z-10 flex flex-col p-6 sm:p-8 lg:p-10">
                <motion.div
                  variants={iconFloat}
                  initial="initial"
                  animate="animate"
                  className="bg-accent/10 border-accent/20 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-md sm:h-20 sm:w-20 md:mx-0"
                >
                  <Eye className="text-accent" size={34} />
                </motion.div>

                <h2 className="text-foreground mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-left">
                  Our Vision
                </h2>

                <p className="text-muted-foreground text-center text-base leading-relaxed sm:text-lg md:text-left">
                  To become the world’s most trusted logistics partner by
                  setting global standards in innovation, sustainability, and
                  customer experience — transforming the future of freight.
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
