"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DriverApplicationModal } from "../driver-application-modal";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { InfiniteBanner } from "./banner";
import Image from "next/image";
import Link from "next/link";

/* ─────────────────────────────── Variants ─────────────────────────────── */
const navLoad: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
};

const mobileMenuAnim: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", staggerChildren: 0.08 }
  }
};

const mobileItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: "easeOut" } }
};

/* Navigation links */
const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Our Partners", href: "/partners" },
  { name: "Drivers", href: "/drivers" },
  { name: "Shippers", href: "/shippers" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";
  const shouldShowWhiteLogo = isHomePage && !isScrolled;
  const hasBackground = isScrolled || !isHomePage;

  /* ─────────────────────────────── FIX: instant scroll detection ─────────────────────────────── */
  useEffect(() => {
    // prevents flicker or delayed logo switching
    setIsScrolled(window.scrollY > 10);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Auto-close mobile menu on route change */
  useEffect(() => {
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [pathname]);

  /* Outside click handling */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (document.querySelector("[data-state='open']")) return;
      if (target.closest("[data-radix-portal]")) return;
      if (target.closest("[data-nav-toggle]")) return;

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("click", handleClick, { capture: true });
    return () => window.removeEventListener("click", handleClick, { capture: true });
  }, [isMobileMenuOpen]);

  return (
    <>
      <InfiniteBanner />

      {/* Navbar */}
      <motion.header
        variants={navLoad}
        initial="hidden"
        animate="visible"
        className={cn(
          "fixed top-[35px] left-0 right-0 z-50 transition-all duration-300",
          hasBackground
            ? "bg-background/90 backdrop-blur-md shadow"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={shouldShowWhiteLogo ? "/white-logo.svg" : "/logo.svg"}
                alt="Delta Prime Logo"
                width={115}
                height={48}
                priority
                className="object-cover transition-opacity duration-300"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105",
                    hasBackground
                      ? "text-foreground hover:text-primary"
                      : "text-white hover:text-accent"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <DriverApplicationModal />
            </div>

            {/* Mobile Toggle */}
            <button
              data-nav-toggle
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-2 rounded-md transition-all duration-300 hover:scale-110 active:scale-95",
                hasBackground
                  ? "text-foreground hover:bg-accent/10"
                  : "text-white hover:bg-white/10"
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                ref={mobileMenuRef}
                variants={mobileMenuAnim}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-lg shadow-md"
              >
                <div className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <motion.div key={item.name} variants={mobileItem}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-all"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div variants={mobileItem} className="px-4 pt-2">
                    <DriverApplicationModal />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
}
