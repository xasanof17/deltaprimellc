"use client";

import { PartnerCarousel } from "../animations/partner-carousel";
import { motion } from "framer-motion";

export default function TrustedSection() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Animation */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-foreground mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Our Trusted Partners
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            Working with industry leaders to deliver excellence
          </p>
        </motion.div>

        <PartnerCarousel />
      </div>
    </section>
  );
}
