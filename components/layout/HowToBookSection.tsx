"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Phone, ClipboardList, MailCheck, PlaneTakeoff, Lock, Check } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Phone,
    title: "Tell Us Your Dream Trip",
    description:
      "Share your travel plans with our expert advisors. We listen to every detail — dates, cabin class, airline preferences.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "We Find the Best Fares",
    description:
      "Our team searches exclusive deals and negotiated rates to build your perfect itinerary at unbeatable prices.",
  },
  {
    step: "03",
    icon: MailCheck,
    title: "Review Your Options",
    description:
      "Receive handpicked Business & First Class options directly to your inbox, ready to compare.",
  },
  {
    step: "04",
    icon: PlaneTakeoff,
    title: "Book & Take Off",
    description:
      "Confirm your booking with secure payment and get your e-tickets instantly. Time to fly in style.",
  },
];

// Animated phone mockup showing booking flow
function PhoneMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative w-[280px] h-[560px] mx-auto">
      {/* Phone frame */}
      <div className="absolute inset-0 rounded-[40px] bg-pf-charcoal shadow-[0_0_60px_rgba(0,0,0,0.3)] border-[8px] border-pf-charcoal overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-pf-charcoal rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden">
          {/* Status bar */}
          <div className="h-12" />

          {/* Search form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="px-4 mb-3"
          >
            <div className="bg-pf-pearl rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pf-red" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="text-[11px] font-semibold text-pf-navy"
                >
                  JFK · New York
                </motion.p>
              </div>
              <div className="h-px bg-pf-navy/10 ml-4" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pf-navy" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.9 }}
                  className="text-[11px] font-semibold text-pf-navy"
                >
                  LHR · London
                </motion.p>
              </div>
            </div>

            {/* Date & class row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="flex gap-2 mt-2"
            >
              <div className="flex-1 bg-pf-pearl rounded-lg px-2.5 py-1.5">
                <p className="text-[8px] text-pf-navy-light">Date</p>
                <p className="text-[10px] font-semibold text-pf-navy">
                  15 Mar
                </p>
              </div>
              <div className="flex-1 bg-pf-pearl rounded-lg px-2.5 py-1.5">
                <p className="text-[8px] text-pf-navy-light">Class</p>
                <p className="text-[10px] font-semibold text-pf-navy">
                  Business
                </p>
              </div>
              <div className="flex-1 bg-pf-pearl rounded-lg px-2.5 py-1.5">
                <p className="text-[8px] text-pf-navy-light">Pax</p>
                <p className="text-[10px] font-semibold text-pf-navy">1</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Flight card 1 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="mx-4 p-3 rounded-xl border border-pf-pearl bg-white shadow-pf-sm mb-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-pf-pearl flex items-center justify-center">
                  <span className="text-[6px] font-bold text-pf-navy">EK</span>
                </div>
                <div>
                  <p className="text-[10px] text-pf-navy-light">
                    Emirates · Direct
                  </p>
                  <p className="text-sm font-bold text-pf-navy">JFK → LHR</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-pf-navy-light/50 line-through">
                  $5,900
                </p>
                <p className="text-sm font-bold text-pf-red">$2,400</p>
              </div>
            </div>
          </motion.div>

          {/* Flight card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="mx-4 p-3 rounded-xl border border-pf-pearl bg-white shadow-pf-sm mb-4"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-pf-pearl flex items-center justify-center">
                  <span className="text-[6px] font-bold text-pf-navy">AF</span>
                </div>
                <div>
                  <p className="text-[10px] text-pf-navy-light">
                    Air France · Direct
                  </p>
                  <p className="text-sm font-bold text-pf-navy">LAX → CDG</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-pf-navy-light/50 line-through">
                  $7,800
                </p>
                <p className="text-sm font-bold text-pf-red">$3,100</p>
              </div>
            </div>
          </motion.div>

          {/* Book button with lock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: 2.3,
              type: "spring",
              stiffness: 200,
            }}
            className="mx-4"
          >
            <div className="bg-pf-red rounded-xl py-3 flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white font-bold text-sm">
                Secure Booking
              </span>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-pf-navy/20 rounded-full" />
        </div>
      </div>

      {/* Floating: price comparison */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 2.6, type: "spring" }}
        className="absolute -right-14 top-20 bg-white rounded-2xl px-3.5 py-2.5 shadow-pf-lg"
      >
        <p className="text-[9px] text-pf-navy-light mb-0.5">Retail price</p>
        <p className="text-xs text-pf-navy-light/50 line-through">$5,900</p>
        <p className="text-[9px] text-pf-navy-light mt-1 mb-0.5">Your price</p>
        <p className="text-lg font-black text-pf-red leading-none">$2,400</p>
      </motion.div>

      {/* Floating: confirmed with checkmark */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: -20 }}
        animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 3.0, type: "spring" }}
        className="absolute -left-12 bottom-28 bg-white rounded-2xl p-3 shadow-pf-lg flex items-center gap-2"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 3.3, type: "spring", stiffness: 300 }}
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

function StepCard({
  item,
  index,
}: {
  item: (typeof steps)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group flex gap-5"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Step circle */}
        <div className="w-12 h-12 rounded-full border-2 border-white/12 bg-white/[0.08] flex items-center justify-center relative z-10 group-hover:bg-pf-red group-hover:border-pf-red group-hover:scale-110 transition-all duration-500">
          <item.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-500" />
        </div>

        {/* Connector line */}
        {index < steps.length - 1 && (
          <div className="w-[2px] flex-1 bg-white/[0.08] my-1 rounded-full min-h-[40px]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 relative">
        {/* Hover highlight bg */}
        <div className="absolute -inset-4 rounded-2xl bg-white/[0.06] opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-400 -z-1" />

        <span className="text-[11px] font-bold uppercase tracking-widest mb-2 block text-pf-red/70">
          Step {item.step}
        </span>
        <h3 className="text-lg font-bold mb-2 text-white">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/50">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function HowToBookSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="bg-pf-navy rounded-3xl p-8 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              How to <span className="text-pf-red">Book</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Premium travel in four simple steps.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps — vertical timeline */}
            <div className="order-2 lg:order-1">
              {steps.map((item, i) => (
                <StepCard
                  key={item.step}
                  item={item}
                  index={i}
                />
              ))}
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
