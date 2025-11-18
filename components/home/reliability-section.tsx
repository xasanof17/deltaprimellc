"use client";

import { ArrowRight, Clock, Globe, Package, Shield } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

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
  const inView = useInView(ref, { amount: 0.3 });

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
    <section className="bg-primary text-primary-foreground py-20" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            Reliability in <span className="text-accent">Motion</span>
          </h2>
          <p className="text-primary-foreground/90 mx-auto max-w-4xl text-lg leading-relaxed md:text-xl">
            We believe every mile matters — every delivery reflects our
            dedication. From local routes to cross-country freight, our drivers
            and equipment deliver safety, consistency, and performance.
          </p>
        </motion.div>

        {/* CARDS (COUNTUP + ANIMATIONS) */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1 — Years Experience */}
          <motion.div
            variants={containerFade}
            initial="hidden"
            animate={start ? "visible" : "hidden"}
            custom={0}
          >
            <Card
              className={`bg-primary-foreground/5 border-primary-foreground/20 backdrop-blur-sm hover:cursor-pointer ${cardHover}`}
            >
              <CardContent className="p-6 text-center">
                <div className="bg-accent/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Package className="text-accent" size={24} />
                </div>
                <div className="text-primary-foreground mb-2 text-4xl font-bold md:text-5xl">
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
                <div className="bg-accent/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Globe className="text-accent" size={24} />
                </div>
                <div className="text-primary-foreground mb-2 text-4xl font-bold md:text-5xl">
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
                <div className="bg-accent/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Clock className="text-accent" size={24} />
                </div>
                <div className="text-primary-foreground mb-2 text-4xl font-bold md:text-5xl">
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
                <div className="bg-accent/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Shield className="text-accent" size={24} />
                </div>
                <div className="text-primary-foreground mb-2 text-4xl font-bold md:text-5xl">
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
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg font-semibold">
              Speak With an Expert <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
