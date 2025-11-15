"use client";

import React, { useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";

/* -------------------------------------------
   Animation Variants (ONE-TIME)
-------------------------------------------- */
const parent: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const fadeItem: Variants = {
  hidden: { opacity: 0, y: 20 },
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
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

/* -------------------------------------------
   Component
-------------------------------------------- */
const ContactInfoCards = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  // ONE TIME → once: true
  const inView = useInView(ref, { amount: 0.3, once: true });

  const DATA = [
    {
      title: "Headquarters",
      icon: MapPin,
      color: "bg-primary text-primary-foreground",
      content: (
        <a
          href="https://maps.app.goo.gl/D3tTbm5wsmN3ct7k7"
          target="_blank"
          className="text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          1101 31st <br />
          Downers Grove, IL 60515 <br />
          United States
        </a>
      ),
      border: "border-primary",
    },
    {
      title: "Phone",
      icon: Phone,
      color: "bg-accent text-accent-foreground",
      content: (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Main: <a href="tel:+17089072006">+1 (708) 907-2006</a> <br />
          Sales: <a href="tel:+17089072006">+1 (708) 907-2006</a> <br />
          Support: <a href="tel:+17089072006">+1 (708) 907-2006</a>
        </p>
      ),
      border: "border-accent",
    },
    {
      title: "Email",
      icon: Mail,
      color: "bg-primary text-primary-foreground",
      content: (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Drivers:{" "}
          <a href="mailto:applications@deltaprimellc.com">
            applications@deltaprimellc.com
          </a>
          <br />
          Sales:{" "}
          <a href="mailto:dispatch@deltaprimellc.com">
            dispatch@deltaprimellc.com
          </a>
          <br />
          Support:{" "}
          <a href="mailto:claims@deltaprimellc.com">claims@deltaprimellc.com</a>
        </p>
      ),
      border: "border-primary",
    },
    {
      title: "Business Hours",
      icon: Clock,
      color: "bg-accent text-accent-foreground",
      content: (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Monday–Friday: 8 AM – 6 PM CST <br />
          Saturday: 9 AM – 2 PM CST <br />
          24/7 Emergency Support Available
        </p>
      ),
      border: "border-accent",
    },
  ];

  return (
    <motion.div
      ref={ref}
      variants={parent}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="space-y-6"
    >
      {DATA.map((item, i) => (
        <motion.div key={i} variants={fadeItem}>
          <Card
            className={`border-2 ${item.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
          >
            <CardContent className="p-6">
              {/* Floating Icon */}
              <motion.div
                variants={iconFloat}
                initial="initial"
                animate="animate"
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${item.color}`}
              >
                <item.icon size={24} />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                {item.title}
              </h3>

              {/* Content */}
              {item.content}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ContactInfoCards;
