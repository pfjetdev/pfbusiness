"use client";

import { motion, stagger } from "motion/react";
import { BedDouble, Users, BadgeDollarSign, RefreshCw, ShieldCheck } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.1),
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const features = [
  {
    icon: BedDouble,
    title: "Lie-Flat Seats Guaranteed",
    description:
      "Every booking comes with confirmed lie-flat seats. No upgrades, no guesswork — just guaranteed comfort.",
    stat: "100%",
    statLabel: "confirmed",
    accent: true, // navy card
    span: "md:col-span-2 lg:col-span-1 lg:row-span-2", // tall card
  },
  {
    icon: BadgeDollarSign,
    title: "Best Price Promise",
    description:
      "Access to exclusive unpublished fares and negotiated rates. Save up to 60% compared to retail prices.",
    stat: "60%",
    statLabel: "savings",
    accent: false,
    span: "md:col-span-1 lg:col-span-2", // wide card
  },
  {
    icon: RefreshCw,
    title: "Flexible Changes",
    description:
      "Plans change — we get it. Enjoy hassle-free date changes and flexible cancellation on most bookings.",
    stat: "Free",
    statLabel: "rebooking",
    accent: false,
    span: "",
  },
  {
    icon: Users,
    title: "Expert Travel Advisors",
    description:
      "Our dedicated team of specialists knows every airline and route. Personalised service from booking to boarding.",
    stat: "24/7",
    statLabel: "support",
    accent: true, // red card
    span: "md:col-span-2 lg:col-span-2",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pf-navy mb-4">
            Why Choose <span className="text-pf-red">Us</span>
          </h2>
          <p className="text-lg text-pf-navy-light max-w-2xl mx-auto">
            What makes Priority Flyers the preferred choice for premium travel.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]"
        >
          {/* Card 1 — Lie-Flat — tall navy card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl bg-pf-navy p-8 flex flex-col justify-between overflow-hidden md:col-span-2 lg:col-span-1 lg:row-span-2 shadow-sm hover:shadow-lg transition-shadow duration-500"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-pf-navy-light/20 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white/15 transition-colors duration-500">
                <BedDouble className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                True Lie-Flat. Every&nbsp;Time.
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                No angled seats, no upgrade gambles. We confirm a fully flat bed
                with direct aisle access before you pay — so you sleep, not just recline.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-5xl font-black text-white tabular-nums">
                100%
              </p>
              <p className="text-[11px] uppercase tracking-widest text-white/40 mt-1">
                confirmed
              </p>
            </div>
          </motion.div>

          {/* Card 2 — Best Price — wide card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl bg-white border border-pf-pearl p-8 overflow-hidden lg:col-span-2 shadow-sm hover:shadow-lg transition-shadow duration-500"
          >
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pf-red/5 rounded-full translate-y-1/2 translate-x-1/2" />
            <div className="flex items-start justify-between mb-5">
              <div className="w-14 h-14 rounded-2xl bg-pf-navy/5 flex items-center justify-center group-hover:bg-pf-red/10 transition-colors duration-500">
                <BadgeDollarSign className="w-7 h-7 text-pf-navy group-hover:text-pf-red transition-colors duration-500" />
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-pf-red tabular-nums">
                  60%
                </p>
                <p className="text-[10px] uppercase tracking-widest text-pf-navy-light/40">
                  savings
                </p>
              </div>
            </div>
            <h3 className="text-lg font-bold text-pf-navy mb-2">
              Best Price Promise
            </h3>
            <p className="text-pf-navy-light/60 text-sm leading-relaxed">
              Access to exclusive unpublished fares and negotiated rates. Save up
              to 60% compared to retail prices.
            </p>
          </motion.div>

          {/* Card 3 — Flexible — small card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl bg-pf-pearl p-8 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-pf-navy/5 flex items-center justify-center mb-5 group-hover:bg-pf-navy/10 transition-colors duration-500">
              <RefreshCw className="w-7 h-7 text-pf-navy" />
            </div>
            <p className="text-3xl font-black text-pf-navy tabular-nums mb-1">
              Free
            </p>
            <p className="text-[10px] uppercase tracking-widest text-pf-navy-light/40 mb-4">
              rebooking
            </p>
            <h3 className="text-lg font-bold text-pf-navy mb-2">
              Flexible Changes
            </h3>
            <p className="text-pf-navy-light/60 text-sm leading-relaxed">
              Hassle-free date changes and flexible cancellation on most
              bookings.
            </p>
          </motion.div>

          {/* Card 4 — Expert Advisors — wide red card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl bg-pf-red p-8 overflow-hidden md:col-span-2 shadow-sm hover:shadow-lg transition-shadow duration-500"
          >
            <div className="absolute top-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pf-red-dark/30 rounded-full translate-y-1/3 translate-x-1/3" />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors duration-500">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <p className="text-5xl font-black text-white tabular-nums">
                  24/7
                </p>
                <p className="text-[11px] uppercase tracking-widest text-white/50 mt-1">
                  support
                </p>
              </div>
              <div className="sm:pt-1">
                <h3 className="text-xl font-bold text-white mb-3">
                  Expert Travel Advisors
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Our dedicated team of specialists knows every airline and
                  route. Personalised service from booking to boarding.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 5 — VIP Perks */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-2xl bg-pf-navy p-8 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500"
          >
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pf-navy-light/20 rounded-full translate-y-1/2 translate-x-1/2" />
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/15 transition-colors duration-500">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <p className="text-3xl font-black text-white tabular-nums mb-1">
              VIP
            </p>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
              perks included
            </p>
            <h3 className="text-lg font-bold text-white mb-2">
              Lounge & Fast Track
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Complimentary lounge access, priority boarding, and extra baggage on select fares.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
