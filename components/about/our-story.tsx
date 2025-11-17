"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

// ---------------------------------------------
//  Clean Content Object
// ---------------------------------------------
const STORY_CONTENT = {
  title: "Our Story",

  typingIntro:
    "Founded in 2020, Delta Prime LLC entered the trucking industry with a clear mission: to build a modern, technology-driven transportation company that delivers reliability, transparency, and exceptional service.",

  paragraphs: [
    "From the very beginning, we recognized that the future of trucking would be rooted in efficiency, data, and innovation. While many carriers continued using outdated systems, we invested early in advanced GPS tracking, automated dispatching tools, and performance analytics to ensure every shipment moves safely, efficiently, and on schedule.",

    "Today, Delta Prime operates a fleet of over 500 vehicles, supported by a full in-house logistics and safety team, a modern repair facility, and dedicated driver support departments. Our commitment to proactive maintenance, smart routing, and real-time visibility allows us to provide dependable local, regional, and long-distance freight solutions across the United States.",

    "But above all, Delta Prime LLC is built around people. Our professional drivers, dispatchers, fleet managers, and customer service teams work around the clock to make sure every load receives the care and attention it deserves. We believe in doing things the right way — with integrity, accountability, and a focus on long-term relationships.",

    "In just a few years, our dedication to service, technology, and continuous improvement has earned us a reputation as a carrier that goes the extra mile. And we’re just getting started.",
  ],
} as const;

// ---------------------------------------------
//  Motion Variants
// ---------------------------------------------
const parent: Variants = {
  hidden: { opacity: 0, y: 30 },
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
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// ---------------------------------------------
//  Typing Animation Hook
// ---------------------------------------------
function useTypingEffect(text: string, speed = 22) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}

// ---------------------------------------------
//  Component
// ---------------------------------------------
const OurStory = () => {
  const typed = useTypingEffect(STORY_CONTENT.typingIntro);

  return (
    <section className="bg-muted relative overflow-hidden py-24">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0" />

      <motion.div
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.35 }} // 🔥 re-animate every scroll
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Title */}
        <motion.h2
          variants={fadeItem}
          viewport={{ once: false }}
          className="text-foreground mb-8 text-center text-4xl font-bold md:text-5xl"
        >
          {STORY_CONTENT.title}
        </motion.h2>

        {/* Typing Intro (only plays once for UX reasons) */}
        <motion.p
          variants={fadeItem}
          viewport={{ once: false }}
          className="text-foreground/90 mx-auto mb-10 max-w-4xl text-lg leading-relaxed font-medium md:text-xl"
        >
          {typed}
          <span className="ml-1 animate-pulse">|</span>
        </motion.p>

        {/* Paragraphs */}
        <motion.div
          variants={parent}
          viewport={{ once: false }}
          className="text-muted-foreground mx-auto max-w-4xl space-y-6 text-lg leading-relaxed"
        >
          {STORY_CONTENT.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              variants={fadeItem}
              viewport={{ once: false }} // 🔥 each paragraph animates on enter
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurStory;
