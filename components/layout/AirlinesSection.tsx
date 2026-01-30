"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { airlines } from "@/data/airlines";
import {
  staggerFromCenterVariants,
  cardFadeInVariants,
  fadeInUpVariants,
  DURATION_FAST,
} from "@/lib/animations";

const CARD_HEIGHT = 240;

export function AirlinesSection() {
  return (
    <section className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pf-navy mb-4">
            Best First & Business <span className="text-pf-red">Class Airlines</span>
          </h2>
          <p className="text-lg text-pf-navy-light max-w-2xl mx-auto">
            Fly with the world&apos;s most awarded carriers at exclusive rates.
          </p>
        </motion.div>

        <motion.div
          variants={staggerFromCenterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {airlines.map((airline) => (
            <motion.div
              key={airline.name}
              variants={cardFadeInVariants}
              whileHover={{ y: -6, transition: { duration: DURATION_FAST, ease: "easeOut" } }}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              style={{ height: CARD_HEIGHT }}
            >
              <Link href="/contact" className="absolute inset-0 z-10" aria-label={`Get quote for ${airline.name}`} />

              <Image
                src={airline.image}
                alt={airline.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />

              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex items-start justify-between">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 group-hover:bg-white transition-colors duration-300">
                    <Image
                      src={`/airlines/${airline.logo}`}
                      alt={`${airline.name} logo`}
                      width={160}
                      height={50}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="bg-pf-red/90 text-white text-[10px] font-semibold px-2 py-1 rounded-lg opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {airline.saving}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{airline.name}</h3>
                    <p className="text-white/60 text-xs">{airline.route}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
