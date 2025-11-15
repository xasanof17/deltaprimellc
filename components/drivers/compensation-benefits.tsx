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
    <section className="py-20 bg-muted">
      <motion.div
        ref={ref}
        variants={parent}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Compensation & Benefits */}
          <motion.div variants={fadeItem} className="flex flex-col h-full">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
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
                      className="text-accent shrink-0 mt-1"
                      size={24}
                    />
                  </motion.div>
                  <p className="text-base md:text-lg text-foreground">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Requirements */}
          <motion.div variants={fadeItem} className="flex flex-col h-full">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Requirements
            </h2>

            <Card className="h-full hover:shadow-lg transition-all">
              <CardContent className="px-4 md:px-6 flex flex-col h-full">
                <ul className="space-y-3 text-foreground grow">
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
                          className="text-primary shrink-0 mt-1"
                          size={20}
                        />
                      </motion.div>
                      <span className="text-base md:text-lg">{req}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  variants={fadeItem}
                  className="mt-6 p-4 bg-muted rounded-lg border border-border/40"
                >
                  <p className="text-sm text-muted-foreground">
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
