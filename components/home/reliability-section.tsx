"use client";

import { ArrowRight, Clock, Globe, Package, Shield } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// use-count hook
import { useCountUp } from "@/hooks/use-count";

/* -------------------------------------------
   Animations
------------------------------------------- */
const containerFade: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const cardHover =
  "transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1";

/* -------------------------------------------
   Component
------------------------------------------- */
const ReliabilitySection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.4 });

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) setStart(true);
    else setStart(false); // reset for replay
  }, [inView]);

  // Animated Numbers
  const years = useCountUp(0, 5, start, 1.2);
  const clients = useCountUp(0, 1200, start, 1.2);
  const onTime = useCountUp(0, 99, start, 1.2);

  return (
    <section className="py-20 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Reliability in <span className="text-accent">Motion</span>
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
            We believe every mile matters — every delivery reflects our
            dedication. From local routes to cross-country freight, our drivers
            and equipment deliver safety, consistency, and performance.
          </p>
        </motion.div>

        {/* CARDS (COUNTUP + ANIMATIONS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1 — Years Experience */}
          <motion.div
            variants={containerFade}
            initial="hidden"
            animate={start ? "visible" : "hidden"}
            custom={0}
          >
            <Card
              className={`bg-primary-foreground/5 hover:cursor-pointer border-primary-foreground/20 backdrop-blur-sm ${cardHover}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {years}+
                </div>
                <div className="text-primary-foreground/70">
                  Years Experience
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2 — Happy Clients */}
          <motion.div
            variants={containerFade}
            initial="hidden"
            animate={start ? "visible" : "hidden"}
            custom={1}
          >
            <Card
              className={`bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm ${cardHover}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {clients.toLocaleString()}+
                </div>
                <div className="text-primary-foreground/70">Happy Clients</div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3 — On-Time Delivery */}
          <motion.div
            variants={containerFade}
            initial="hidden"
            animate={start ? "visible" : "hidden"}
            custom={2}
          >
            <Card
              className={`bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm ${cardHover}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {onTime}%
                </div>
                <div className="text-primary-foreground/70">
                  On-Time Delivery
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4 — Safety Rating */}
          <motion.div
            variants={containerFade}
            initial="hidden"
            animate={start ? "visible" : "hidden"}
            custom={3}
          >
            <Card
              className={`bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm ${cardHover}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-accent" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  A
                </div>
                <div className="text-primary-foreground/70">Safety Rating</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <Link href="/contact">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg">
              Speak With an Expert <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
