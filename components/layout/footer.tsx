"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { icon } from "leaflet";

/* ------------------------------- ANIMATIONS -------------------------------- */
const container: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const iconHover: Variants = {
  hover: {
    scale: 1.25,
    rotate: 8,
    y: -3,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
    transition: { type: "spring", stiffness: 250, damping: 15 },
  },
};

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/deltaprimellc/" },
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Twitter, href: "#" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);

  // FIX: Prevent hydration mismatch for inView
  const [enableAnim, setEnableAnim] = useState(false);
  const inView = useInView(ref, { amount: 0.2, once: true });

  useEffect(() => {
    setEnableAnim(true);
  }, []);

  // FIX: avoid SSR mismatch by computing once on client
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div ref={ref} className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={enableAnim && inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Company */}
          <motion.div variants={item} className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/white-logo.svg"
                alt="Delta Prime LLC"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>

            <p className="text-base leading-relaxed opacity-90">
              Tech-enabled logistics solutions with global reach. Delivering
              excellence on time, every time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>

            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Shippers", href: "/shippers" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-accent inline-block text-base opacity-90 transition-all duration-200 hover:scale-110 hover:opacity-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item}>
            <h3 className="mb-4 text-base font-bold">Resources</h3>

            <ul className="space-y-2">
              {[
                { name: "Driver Portal", href: "/drivers" },
                { name: "Our Partners", href: "/partners" },
                { name: "Contact Us", href: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="hover:text-accent inline-block text-base opacity-90 transition-all duration-200 hover:scale-110 hover:opacity-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h3 className="mb-4 text-lg font-bold">Contact</h3>

            <ul className="space-y-3">
              <li className="flex items-center">
                <a
                  href="https://maps.app.goo.gl/D3tTbm5wsmN3ct7k7"
                  target="_blank"
                  className="flex items-center gap-2 text-base opacity-90"
                >
                  <MapPin size={16} /> 1101 31st, Downers Grove, IL 60515
                </a>
              </li>

              {/* FIX: Replace Link with <a> for tel */}
              <li className="flex items-center">
                <a
                  href="tel:+17089072006"
                  className="flex items-center gap-2 text-base opacity-90"
                >
                  <Phone size={16} /> +1 (708) 907-2006
                </a>
              </li>

              <li className="flex items-center">
                <a
                  href="mailto:applications@deltaprime.com"
                  className="flex items-center gap-2 text-base opacity-90"
                >
                  <Mail size={16} /> applications@deltaprime.com
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="mt-4 flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <motion.a
                  target="_blank"
                  key={i}
                  href={href}
                  variants={iconHover}
                  whileHover="hover"
                  className="bg-accent flex h-10 w-10 items-center justify-center rounded-xl"
                >
                  <Icon size={20} className="text-white opacity-90" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright (hydration-safe) */}
        <motion.div
          variants={item}
          initial="hidden"
          animate={enableAnim && inView ? "visible" : "hidden"}
          className="border-primary-foreground/20 mt-8 border-t pt-8 text-center text-sm opacity-90"
        >
          {year && (
            <p>&copy; 2020-{year} Delta Prime LLC. All rights reserved.</p>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
