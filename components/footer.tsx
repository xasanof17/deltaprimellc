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

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  Fleet & Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/shippers"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  Shippers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/drivers"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  Driver Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  Our Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm opacity-90 hover:opacity-100 hover:text-accent hover:scale-110 inline-block transition-all duration-200"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-start">
                <Link
                  href="#"
                  className="flex items-center justify-center gap-2 text-sm opacity-90"
                >
                  <MapPin size={16} className="shrink-0" />
                  <span>1101 31st, Downers Grove, IL, 60515</span>
                </Link>
              </li>
              <li className="flex items-center justify-start">
                <Link
                  href="tel:+17089072006"
                  className="flex text-white hover:underline-offset-0 items-center justify-center gap-2 text-sm opacity-90"
                >
                  <Phone size={16} className="shrink-0" />
                  <span className="text-white">+1 (708) 907-2006</span>
                </Link>
              </li>
              <li className="flex items-center justify-start">
                <Link
                  href="mailto:applications@deltaprime.com"
                  className="flex items-center justify-center gap-2 text-sm opacity-90"
                >
                  <Mail size={16} className="shrink-0" />
                  <span>applications@deltaprime.com</span>
                </Link>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <Link
                href="#"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:scale-125 hover:shadow-lg transition-all duration-200"
              >
                <Facebook size={16} className="text-accent-foreground" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:scale-125 hover:shadow-lg transition-all duration-200"
              >
                <Twitter size={16} className="text-accent-foreground" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:scale-125 hover:shadow-lg transition-all duration-200"
              >
                <Linkedin size={16} className="text-accent-foreground" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center hover:scale-125 hover:shadow-lg transition-all duration-200"
              >
                <Instagram size={16} className="text-accent-foreground" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-90">
          <p>
            &copy; {new Date().getFullYear()} Delta Prime LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
