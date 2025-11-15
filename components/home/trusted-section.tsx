"use client";

import { PartnerCarousel } from "../animations/partner-carousel";
import { motion } from "framer-motion";

export default function TrustedSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading Animation */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            Our Trusted Partners
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Working with industry leaders to deliver excellence
          </p>
        </motion.div>

        <PartnerCarousel />
      </div>
    </section>
  );
}
