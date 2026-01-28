"use client";

import { motion } from "motion/react";
import { FlightSearchForm } from "@/components/booking/FlightSearchForm";

interface HeroSectionProps {
  userCity?: string;
  userCountry?: string;
}

export function HeroSection({ userCity, userCountry }: HeroSectionProps) {
  return (
      <section className="relative z-20 bg-pf-ivory px-4 lg:px-8 flex flex-col pb-12">
        <div className="flex-1 flex flex-col items-center justify-start pt-32 lg:pt-40 w-full container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8 w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pf-navy mb-4">
              Elevate Your <span className="text-pf-red">Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-pf-navy-light max-w-2xl mx-auto">
              Experience premium Business & First Class travel at exceptional
              value.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <FlightSearchForm userCity={userCity} userCountry={userCountry} />
          </motion.div>

        </div>
      </section>
  );
}
