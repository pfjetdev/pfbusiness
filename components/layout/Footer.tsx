"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Send,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { label: "Business Class Flights", href: "/business-class" },
      { label: "First Class Flights", href: "/first-class" },
      { label: "Group Bookings", href: "/group-bookings" },
      { label: "Corporate Travel", href: "/corporate" },
      { label: "Last Minute Deals", href: "/deals" },
    ],
  },
  destinations: {
    title: "Top Destinations",
    links: [
      { label: "London", href: "/destinations/london" },
      { label: "Dubai", href: "/destinations/dubai" },
      { label: "New York", href: "/destinations/new-york" },
      { label: "Singapore", href: "/destinations/singapore" },
      { label: "Tokyo", href: "/destinations/tokyo" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQs", href: "/faq" },
      { label: "Booking Policy", href: "/booking-policy" },
      { label: "Cancellation Policy", href: "/cancellation" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const paymentMethods = [
  { name: "Visa", src: "/payments/visa.svg" },
  { name: "Mastercard", src: "/payments/mastercard.svg" },
  { name: "Amex", src: "/payments/amex.svg" },
  { name: "PayPal", src: "/payments/paypal.svg" },
];

export function Footer() {
  return (
    <footer className="bg-pf-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Logo variant="white" className="mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted partner for premium Business & First Class travel.
              Save up to 60% on luxury flights with personalized service and
              expert guidance.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-white/80 hover:text-pf-red transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pf-red/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-white/50">24/7 Support</p>
                  <p className="font-semibold">+1 (800) 123-4567</p>
                </div>
              </a>
              <a
                href="mailto:hello@priorityflyers.com"
                className="flex items-center gap-3 text-white/80 hover:text-pf-red transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pf-red/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">hello@priorityflyers.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">New York, NY 10001, USA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pf-red transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
            >
              <h4 className="font-bold text-white mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-pf-red transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-10 border-t border-white/10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-white/60 text-sm">
                Get exclusive deals, travel tips, and insider secrets delivered
                to your inbox.
              </p>
            </div>
            <form className="flex gap-2 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-pf-red focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-pf-red hover:bg-pf-red-dark text-white rounded-full font-semibold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Priority Flyers. All rights reserved.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 bg-white/10 rounded text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  IATA
                </div>
                <div className="px-3 py-1.5 bg-white/10 rounded text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  ATOL
                </div>
                <div className="px-3 py-1.5 bg-white/10 rounded text-[10px] font-bold text-white/70 uppercase tracking-wider">
                  SSL
                </div>
              </div>
              <div className="h-6 w-px bg-white/20 hidden md:block" />
              <div className="flex items-center gap-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="w-10 h-6 bg-white rounded flex items-center justify-center"
                    title={method.name}
                  >
                    <span className="text-[8px] font-bold text-gray-600">
                      {method.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/terms"
                className="text-white/50 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-white/50 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-white/50 hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
