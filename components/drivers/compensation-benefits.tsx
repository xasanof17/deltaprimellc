"use client";

import { useRef } from "react";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { motion, useInView, type Variants } from "framer-motion";

/* ------------------------------------------
   ANIMATION VARIANTS
------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.14 },
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
    y: [-4, 4, -4],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const CompensationBenefits = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.25 });

  const benefits = [
    "Starting pay: $95,000+ annually",
    "Performance and safety bonuses",
    "Paid orientation and training",
    "Referral bonuses up to $500",
    "Fuel card and maintenance covered",
    "Per diem and layover pay",
  ];

  const requirements = [
    "Valid Class A CDL license",
    "Minimum 1 year of verifiable OTR experience",
    "Clean driving record (no major violations)",
    "Pass DOT physical and drug screening",
    "23 years of age or older",
    "Ability to operate manual transmission",
  ];

  return (
    <section className="bg-muted py-20">
      <motion.div
        ref={ref}
        variants={parent}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* LEFT — Compensation & Benefits */}
          <motion.div variants={fadeItem} className="flex h-full flex-col">
            <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
              Compensation & Benefits
            </h2>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeItem}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    variants={iconFloat}
                    initial="initial"
                    animate="animate"
                  >
                    <CheckCircle
                      className="text-accent mt-1 shrink-0"
                      size={24}
                    />
                  </motion.div>
                  <p className="text-foreground text-base md:text-lg">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Requirements */}
          <motion.div variants={fadeItem} className="flex h-full flex-col">
            <h2 className="text-foreground mb-6 text-3xl font-bold md:text-4xl">
              Requirements
            </h2>

            <Card className="h-full transition-all hover:shadow-lg">
              <CardContent className="flex h-full flex-col px-4 md:px-6">
                <ul className="text-foreground grow space-y-3">
                  {requirements.map((req, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeItem}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        variants={iconFloat}
                        initial="initial"
                        animate="animate"
                      >
                        <CheckCircle
                          className="text-primary mt-1 shrink-0"
                          size={20}
                        />
                      </motion.div>
                      <span className="text-base md:text-lg">{req}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  variants={fadeItem}
                  className="bg-muted border-border/40 mt-6 rounded-lg border p-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>New to trucking?</strong> Ask about our CDL training
                    program for qualified candidates.
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CompensationBenefits;
