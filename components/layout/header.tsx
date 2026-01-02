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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const mobileMenuAnim: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const mobileItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll(); // Initial check
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
    return () =>
      window.removeEventListener("click", handleClick, { capture: true });
  }, [isMobileMenuOpen]);

  return (
    <>
      <InfiniteBanner />

      {/* Navbar */}
      <header
        className={cn(
          "fixed top-[35px] right-0 left-0 z-50 backdrop-blur-xs transition-all duration-300",
          hasBackground
            ? "bg-background/90 shadow backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
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
            <div className="hidden items-center gap-2 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-base font-medium transition-all duration-300 hover:scale-105",
                    hasBackground
                      ? "text-foreground hover:text-primary"
                      : "hover:text-accent text-white",
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
                "rounded-md p-2 transition-all duration-300 hover:scale-110 active:scale-95 lg:hidden",
                hasBackground
                  ? "text-foreground hover:bg-accent/10"
                  : "text-white hover:bg-white/10",
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
                className="border-border bg-background/95 border-t py-4 shadow-md backdrop-blur-lg lg:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navigation.map((item) => (
                    <motion.div key={item.name} variants={mobileItem}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-foreground hover:bg-muted rounded-md px-4 py-2 text-sm font-medium transition-all"
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
      </header>
    </>
  );
}
