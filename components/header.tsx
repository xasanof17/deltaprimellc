"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShipperQuoteModal } from "@/components/shipper-quote-modal";
import { DriverApplicationModal } from "./driver-application-modal";
import { motion, easeInOut } from "framer-motion";

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
  const isHomePage = pathname === "/";
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const shouldShowWhiteLogo = isHomePage && !isScrolled;
  const hasBackground = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        hasBackground
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
      ref={mobileMenuRef}
    >
      <div className="w-full bg-red-500 py-1">
        <motion.div
          className="flex items-center justify-center"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 1000, // slower scroll speed
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {["Earn a $500.00 driver referral bonus!"]
            .concat(Array(20).fill(["Earn a $500.00 driver referral bonus!"]))
            .flat()
            .map((text, index) => (
              <span key={index} className="mx-3 text-white text-sm text-nowrap">
                {text}
              </span>
            ))}
          {/* <p className="text-md text-white text-nowrap">
            Earn a $500.00 driver referral bonus! Refer a driver to Delta Prime
          </p>
          <span className="mx-3 text-white text-sm">•</span> */}
        </motion.div>
      </div>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src={shouldShowWhiteLogo ? "/white-logo.svg" : "/logo.svg"}
              alt="Delta Prime LLC"
              className="h-12 w-auto transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium hover:scale-105 transition-all duration-300",
                  hasBackground
                    ? "text-foreground hover:text-primary"
                    : "text-white hover:text-accent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <DriverApplicationModal />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-md transition-all duration-300 hover:scale-110 active:scale-95",
              hasBackground
                ? "text-foreground hover:bg-accent/10"
                : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted hover:scale-[1.02] rounded-md transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <ShipperQuoteModal />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
