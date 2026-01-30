"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronRight, Globe, MapPin, Building2, Plane } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const categories = [
  {
    title: "Region",
    icon: Globe,
    color: "pf-red",
    links: [
      { label: "Europe", href: "/destinations/europe" },
      { label: "Asia", href: "/destinations/asia" },
      { label: "Middle East", href: "/destinations/middle-east" },
      { label: "Africa", href: "/destinations/africa" },
      { label: "Oceania", href: "/destinations/oceania" },
      { label: "Latin America", href: "/destinations/latin-america" },
    ],
    viewMoreHref: "/destinations",
  },
  {
    title: "Country",
    icon: MapPin,
    color: "pf-navy",
    links: [
      { label: "United Kingdom", href: "/destinations/uk" },
      { label: "France", href: "/destinations/france" },
      { label: "Germany", href: "/destinations/germany" },
      { label: "Italy", href: "/destinations/italy" },
      { label: "Spain", href: "/destinations/spain" },
      { label: "Japan", href: "/destinations/japan" },
    ],
    viewMoreHref: "/destinations",
  },
  {
    title: "City",
    icon: Building2,
    color: "pf-red",
    links: [
      { label: "London", href: "/destinations/london" },
      { label: "Paris", href: "/destinations/paris" },
      { label: "Dubai", href: "/destinations/dubai" },
      { label: "Tokyo", href: "/destinations/tokyo" },
      { label: "Singapore", href: "/destinations/singapore" },
      { label: "New York", href: "/destinations/new-york" },
    ],
    viewMoreHref: "/destinations",
  },
  {
    title: "Airline",
    icon: Plane,
    color: "pf-navy",
    links: [
      { label: "Emirates", href: "/airlines/emirates" },
      { label: "Qatar Airways", href: "/airlines/qatar-airways" },
      { label: "Singapore Airlines", href: "/airlines/singapore-airlines" },
      { label: "British Airways", href: "/airlines/british-airways" },
      { label: "Lufthansa", href: "/airlines/lufthansa" },
      { label: "Air France", href: "/airlines/air-france" },
    ],
    viewMoreHref: "/airlines",
  },
];

export function QuickLinksSection() {
  return (
    <section className="bg-pf-ivory py-16 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-pf-navy mb-3">
            Explore Business Class Flights
          </h2>
          <p className="text-pf-navy-light/70 max-w-xl mx-auto">
            Browse our most popular destinations and premium airline partners
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const isRed = category.color === "pf-red";

            return (
              <motion.div
                key={category.title}
                variants={cardVariants}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isRed ? "bg-pf-red/10" : "bg-pf-navy/5"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isRed ? "text-pf-red" : "text-pf-navy"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      isRed ? "text-pf-red" : "text-pf-navy"
                    }`}
                  >
                    {category.title}
                  </h3>
                </div>

                <motion.ul
                  variants={containerVariants}
                  className="space-y-1 mb-5"
                >
                  {category.links.map((link) => (
                    <motion.li key={link.label} variants={linkVariants}>
                      <Link
                        href={link.href}
                        className="block py-1.5 text-sm text-pf-navy/80 hover:text-pf-red hover:translate-x-1 transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="pt-4 border-t border-pf-pearl">
                  <Link
                    href={category.viewMoreHref}
                    className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isRed
                        ? "text-pf-red hover:text-pf-red-dark"
                        : "text-pf-navy hover:text-pf-navy-light"
                    }`}
                  >
                    View More
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
