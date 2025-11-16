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
import { useRef } from "react";

/* -------------------------------
   ANIMATIONS
-------------------------------- */
const container: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* 3D ICON HOVER */
const iconHover: Variants = {
  hover: {
    scale: 1.25,
    rotate: 8,
    y: -3,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
    transition: { type: "spring", stiffness: 250, damping: 15 },
  },
};

export function Footer() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <footer className="bg-primary text-primary-foreground">
      <div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={item} className="space-y-4">
            <Link href={"/"} className="block">
              <Image
                src="/white-logo.svg"
                alt="Delta Prime LLC"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm opacity-90 leading-relaxed">
              Tech-enabled logistics solutions with global reach. Delivering
              excellence on time, every time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Fleet & Technology", href: "/fleet" },
                { name: "Shippers", href: "/shippers" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={item}>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: "Driver Portal", href: "/drivers" },
                { name: "Our Partners", href: "/partners" },
                { name: "Contact Us", href: "/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={item}>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-start">
                <a
                  href="https://maps.app.goo.gl/D3tTbm5wsmN3ct7k7"
                  target="_blank"
                  className="flex items-center gap-2 text-sm opacity-90"
                >
                  <MapPin size={16} /> 1101 31st, Downers Grove, IL 60515
                </a>
              </li>
              <li className="flex items-center justify-start">
                <Link
                  href="tel:+17089072006"
                  className="flex items-center gap-2 text-sm opacity-90"
                >
                  <Phone size={16} /> +1 (708) 907-2006
                </Link>
              </li>
              <li className="flex items-center justify-start">
                <a
                  href="mailto:applications@deltaprime.com"
                  className="flex items-center gap-2 text-sm opacity-90"
                >
                  <Mail size={16} /> applications@deltaprime.com
                </a>
              </li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  title="social link"
                  href={item.href}
                  variants={iconHover}
                  whileHover="hover"
                  className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center transition-transform"
                  style={{
                    perspective: "600px",
                  }}
                >
                  <item.icon size={18} className="text-accent-foreground" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* COPYRIGHT */}
        <motion.div
          variants={item}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90"
        >
          <p>&copy; 2020-{new Date().getFullYear()} Delta Prime LLC. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
