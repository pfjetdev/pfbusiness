"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Plane } from "lucide-react";

import { EASE_OUT_EXPO, DURATION_DEFAULT, DURATION_FAST } from "@/lib/animations";

interface PassData {
  from: { code: string; city: string };
  to: { code: string; city: string };
  price: string;
}

interface PFPassData extends PassData {
  date: string;
  flight: string;
  seat: string;
  originalPrice: string;
  discount: string;
}

const COMPETITOR_PASS: PassData = {
  from: { code: "JFK", city: "New York" },
  to: { code: "LHR", city: "London" },
  price: "$4,500",
};

const PF_PASS: PFPassData = {
  from: { code: "JFK", city: "New York" },
  to: { code: "LHR", city: "London" },
  date: "Mar 15",
  flight: "BA 178",
  seat: "2A",
  originalPrice: "$4,500",
  price: "$3,200",
  discount: "-29%",
};

function PlaneIcon({ className }: { className?: string }) {
  return <Plane className={className} />;
}

export function BoardingPassVisualization() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex flex-col items-center justify-center w-full px-4 py-4">
      <div className="relative w-full max-w-md">
        {/* Competitor Pass */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: -2 } : {}}
          transition={{ duration: DURATION_DEFAULT, delay: 0.1 }}
          className="relative"
        >
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <div className="bg-gray-400 px-4 py-2.5 flex items-center justify-between">
              <span className="text-white/80 text-xs font-medium">Another Company</span>
              <span className="text-white/60 text-[10px]">BUSINESS</span>
            </div>

            <div className="px-4 py-3 border-b border-dashed border-gray-300">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-500">{COMPETITOR_PASS.from.code}</p>
                  <p className="text-[10px] text-gray-400">{COMPETITOR_PASS.from.city}</p>
                </div>
                <div className="flex items-center gap-1 px-2">
                  <div className="w-6 h-[1px] bg-gray-300" />
                  <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                    <PlaneIcon className="w-2.5 h-2.5 text-gray-500" />
                  </div>
                  <div className="w-6 h-[1px] bg-gray-300" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-500">{COMPETITOR_PASS.to.code}</p>
                  <p className="text-[10px] text-gray-400">{COMPETITOR_PASS.to.city}</p>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 uppercase">Total Fare</span>
                <span className="text-xl font-bold text-gray-500">{COMPETITOR_PASS.price}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* VS Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
          className="flex justify-center -my-3 relative z-10"
        >
          <div className="w-10 h-10 rounded-full bg-pf-navy shadow-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">VS</span>
          </div>
        </motion.div>

        {/* PF Pass */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: 2 }}
          animate={isInView ? { opacity: 1, y: 0, rotate: 2 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_EXPO }}
          className="relative"
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-pf-red px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">PF</span>
                </div>
                <span className="text-white text-xs font-medium">Priority Flyers</span>
              </div>
              <span className="text-white/80 text-[10px]">BUSINESS CLASS</span>
            </div>

            <div className="px-4 py-3 border-b border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold text-pf-navy">{PF_PASS.from.code}</p>
                  <p className="text-[10px] text-gray-500">{PF_PASS.from.city}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="flex items-center gap-1 px-2"
                >
                  <div className="w-8 h-[1px] bg-gradient-to-r from-pf-navy/20 to-pf-navy/40" />
                  <div className="w-6 h-6 rounded-full bg-pf-navy flex items-center justify-center">
                    <PlaneIcon className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-8 h-[1px] bg-gradient-to-r from-pf-navy/40 to-pf-navy/20" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="text-center"
                >
                  <p className="text-2xl font-bold text-pf-navy">{PF_PASS.to.code}</p>
                  <p className="text-[10px] text-gray-500">{PF_PASS.to.city}</p>
                </motion.div>
              </div>
            </div>

            <div className="px-4 py-2.5 grid grid-cols-3 gap-2 text-center border-b border-dashed border-gray-200">
              {[
                { label: "Date", value: PF_PASS.date, delay: 0.9 },
                { label: "Flight", value: PF_PASS.flight, delay: 0.95 },
                { label: "Seat", value: PF_PASS.seat, delay: 1 },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: DURATION_FAST, delay: item.delay }}
                >
                  <p className="text-[9px] text-gray-400 uppercase">{item.label}</p>
                  <p className="text-xs font-semibold text-pf-navy">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-0 flex items-center pointer-events-none">
                <div className="w-3 h-6 bg-pf-navy rounded-r-full -ml-3" />
                <div className="flex-1" />
                <div className="w-3 h-6 bg-pf-navy rounded-l-full -mr-3" />
              </div>

              <div className="pt-4 px-4 pb-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex items-end justify-between">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.1 }}
                  >
                    <p className="text-[9px] text-gray-400 uppercase">Was</p>
                    <p className="text-sm text-gray-400 line-through">{PF_PASS.originalPrice}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="text-right"
                  >
                    <p className="text-[9px] text-emerald-600 uppercase font-medium">Your Price</p>
                    <p className="text-2xl font-bold text-pf-navy">{PF_PASS.price}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.4 }}
                    className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded"
                  >
                    {PF_PASS.discount}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -inset-4 bg-white/10 rounded-2xl -z-10 blur-2xl" />
        </motion.div>
      </div>
    </div>
  );
}
