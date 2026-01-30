"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Lock, Check } from "lucide-react";

import { EASE_OUT_EXPO, DURATION_DEFAULT, DURATION_FAST } from "@/lib/animations";

const PHONE_SIZE = { width: 280, height: 560 };

const MOCK_FLIGHTS = [
  {
    code: "EK",
    airline: "Emirates",
    route: "JFK → LHR",
    type: "Direct",
    retailPrice: "$5,900",
    ourPrice: "$2,400",
  },
  {
    code: "AF",
    airline: "Air France",
    route: "LAX → CDG",
    type: "Direct",
    retailPrice: "$7,800",
    ourPrice: "$3,100",
  },
];

const MOCK_SEARCH = {
  from: { code: "JFK", city: "New York" },
  to: { code: "LHR", city: "London" },
  date: "15 Mar",
  class: "Business",
  passengers: "1",
};

const ANIMATION_DELAYS = {
  searchForm: 0.3,
  fromCity: 0.6,
  toCity: 0.9,
  dateRow: 1.1,
  flightCard1: 1.5,
  flightCard2: 1.8,
  bookButton: 2.3,
  priceComparison: 2.6,
  confirmed: 3.0,
  checkmark: 3.3,
};

export function PhoneMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto"
      style={{ width: PHONE_SIZE.width, height: PHONE_SIZE.height }}
    >
      <motion.div
        className="absolute inset-0 rounded-[40px] bg-pf-navy shadow-[0_0_60px_rgba(0,0,0,0.15)] border-[8px] border-pf-navy overflow-hidden"
        whileHover={{ rotate: -5, transition: { duration: DURATION_FAST, ease: "easeOut" } }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-pf-navy rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden">
          <div className="h-12" />

          {/* Search form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION_DEFAULT, delay: ANIMATION_DELAYS.searchForm }}
            className="px-4 mb-3"
          >
            <div className="bg-pf-pearl rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pf-red" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: ANIMATION_DELAYS.fromCity }}
                  className="text-[11px] font-semibold text-pf-navy"
                >
                  {MOCK_SEARCH.from.code} · {MOCK_SEARCH.from.city}
                </motion.p>
              </div>
              <div className="h-px bg-pf-navy/10 ml-4" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pf-navy" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: ANIMATION_DELAYS.toCity }}
                  className="text-[11px] font-semibold text-pf-navy"
                >
                  {MOCK_SEARCH.to.code} · {MOCK_SEARCH.to.city}
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: ANIMATION_DELAYS.dateRow }}
              className="flex gap-2 mt-2"
            >
              {[
                { label: "Date", value: MOCK_SEARCH.date },
                { label: "Class", value: MOCK_SEARCH.class },
                { label: "Pax", value: MOCK_SEARCH.passengers },
              ].map((item) => (
                <div key={item.label} className="flex-1 bg-pf-pearl rounded-lg px-2.5 py-1.5">
                  <p className="text-[8px] text-pf-navy-light">{item.label}</p>
                  <p className="text-[10px] font-semibold text-pf-navy">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Flight cards */}
          {MOCK_FLIGHTS.map((flight, index) => (
            <motion.div
              key={flight.code}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index === 0 ? ANIMATION_DELAYS.flightCard1 : ANIMATION_DELAYS.flightCard2,
              }}
              className="mx-4 p-3 rounded-xl border border-pf-pearl bg-white shadow-pf-sm mb-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-pf-pearl flex items-center justify-center">
                    <span className="text-[6px] font-bold text-pf-navy">{flight.code}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-pf-navy-light">
                      {flight.airline} · {flight.type}
                    </p>
                    <p className="text-sm font-bold text-pf-navy">{flight.route}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-pf-navy-light/50 line-through">{flight.retailPrice}</p>
                  <p className="text-sm font-bold text-pf-red">{flight.ourPrice}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Book button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: ANIMATION_DELAYS.bookButton,
              type: "spring",
              stiffness: 200,
            }}
            className="mx-4 mt-2"
          >
            <div className="bg-pf-red rounded-xl py-3 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white font-bold text-sm">Secure Booking</span>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-pf-navy/20 rounded-full" />
        </div>
      </motion.div>

      {/* Floating: price comparison */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: ANIMATION_DELAYS.priceComparison, type: "spring" }}
        className="absolute -right-14 top-20 bg-white rounded-2xl px-3.5 py-2.5 shadow-pf-lg"
      >
        <p className="text-[9px] text-pf-navy-light mb-0.5">Retail price</p>
        <p className="text-xs text-pf-navy-light/50 line-through">{MOCK_FLIGHTS[0].retailPrice}</p>
        <p className="text-[9px] text-pf-navy-light mt-1 mb-0.5">Your price</p>
        <p className="text-lg font-black text-pf-red leading-none">{MOCK_FLIGHTS[0].ourPrice}</p>
      </motion.div>

      {/* Floating: confirmed */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: -20 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: ANIMATION_DELAYS.confirmed, type: "spring" }}
        className="absolute -left-12 bottom-28 bg-white rounded-2xl p-3 shadow-pf-lg flex items-center gap-2"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: DURATION_FAST, delay: ANIMATION_DELAYS.checkmark, type: "spring", stiffness: 300 }}
          className="w-7 h-7 rounded-full bg-pf-emerald/10 flex items-center justify-center flex-shrink-0"
        >
          <Check className="w-4 h-4 text-pf-emerald" />
        </motion.div>
        <div>
          <p className="text-[10px] text-pf-navy-light">Booking</p>
          <p className="text-sm font-bold text-pf-navy">Confirmed</p>
        </div>
      </motion.div>
    </div>
  );
}
