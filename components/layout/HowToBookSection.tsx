"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Send, Search, Inbox, PlaneTakeoff, ArrowRight } from "lucide-react";

import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { EASE_OUT_EXPO, DURATION_DEFAULT } from "@/lib/animations";

interface Step {
  step: string;
  icon: typeof Send;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    step: "01",
    icon: Send,
    title: "Share Your Trip Details",
    description:
      "Fill out a quick form or message us — dates, destinations, cabin class. We'll take it from there.",
  },
  {
    step: "02",
    icon: Search,
    title: "We Find the Best Fares",
    description:
      "Our experts search exclusive deals and negotiated rates to craft your perfect itinerary.",
  },
  {
    step: "03",
    icon: Inbox,
    title: "Review Your Options",
    description:
      "Receive curated Business & First Class options directly to your inbox, ready to compare.",
  },
  {
    step: "04",
    icon: PlaneTakeoff,
    title: "Book & Take Off",
    description:
      "Confirm with secure payment and receive your e-tickets instantly. Time to fly in style.",
  },
];

interface StepCardProps {
  item: Step;
  index: number;
  isLast: boolean;
}

function StepCard({ item, index, isLast }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: EASE_OUT_EXPO,
      }}
      className="group flex gap-5"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-14 h-14 rounded-full bg-pf-navy flex items-center justify-center group-hover:bg-pf-red transition-colors duration-300 relative z-10">
          <span className="text-xl font-bold text-white">{item.step}</span>
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-pf-navy/30 to-pf-navy/10 min-h-[60px]" />
        )}
      </div>

      <div className={`flex-1 pt-1 ${!isLast ? "pb-6" : ""}`}>
        <div className="flex items-center gap-3 mb-2">
          <item.icon className="w-5 h-5 text-pf-red" />
          <h3 className="text-lg font-bold text-pf-navy">{item.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-pf-navy-light">{item.description}</p>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION_DEFAULT }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pf-navy mb-4">
            How to <span className="text-pf-red">Book</span>
          </h2>
          <p className="text-lg text-pf-navy-light max-w-2xl mx-auto">
            Premium travel in four simple steps.
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {STEPS.map((item, i) => (
                <StepCard
                  key={item.step}
                  item={item}
                  index={i}
                  isLast={i === STEPS.length - 1}
                />
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 pl-[74px]"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-pf-red hover:bg-pf-red-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-300 shadow-lg shadow-pf-red/20 hover:shadow-xl hover:shadow-pf-red/30"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>

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
