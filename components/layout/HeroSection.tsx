"use client";

import { motion } from "motion/react";

import { FlightSearchForm } from "@/components/booking/FlightSearchForm";
import { EASE_OUT_EXPO, DURATION_DEFAULT } from "@/lib/animations";

interface HeroSectionProps {
  userCity?: string;
  userCountry?: string;
}

export function HeroSection({ userCity, userCountry }: HeroSectionProps) {
  return (
    <section className="relative z-20 bg-pf-navy px-4 lg:px-8 flex flex-col pb-12">
      <div className="flex-1 flex flex-col items-center justify-start pt-32 lg:pt-40 w-full container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION_DEFAULT, ease: EASE_OUT_EXPO }}
          className="text-center mb-8 w-full"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Elevate Your Journey
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Experience premium <span className="text-white font-semibold underline decoration-pf-red decoration-2 underline-offset-4">Business & First Class</span> travel at exceptional
            value.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION_DEFAULT, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="w-full"
        >
          <FlightSearchForm userCity={userCity} userCountry={userCountry} />
        </motion.div>
      </div>
    </section>
  );
}
