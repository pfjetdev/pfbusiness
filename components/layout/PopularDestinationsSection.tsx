"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MapPin } from "lucide-react";

import { REGIONS, REGION_NAMES, type Destination, type RegionName } from "@/data/destinations";
import { fadeInUpVariants, DURATION_FAST } from "@/lib/animations";

const STAGGER_DELAY = 0.05;

function DestinationCard({
  destination,
  index,
  onClick,
}: {
  destination: Destination;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION_FAST, delay: index * STAGGER_DELAY }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
        <Image
          src={destination.imageUrl}
          alt={destination.city}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <Image
              src={`https://flagcdn.com/w40/${destination.countryCode.toLowerCase()}.png`}
              alt=""
              width={24}
              height={16}
              className="object-cover rounded"
            />
            <h3 className="text-white font-bold text-lg leading-tight">
              {destination.city}
            </h3>
          </div>
          <p className="text-white/70 text-xs mb-2">{destination.country}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-white/60 text-xs">from</span>
            <span className="text-white font-bold text-lg">
              ${destination.fromPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}

export function PopularDestinationsSection() {
  const [activeRegion, setActiveRegion] = useState<RegionName>("Europe");
  const router = useRouter();

  const handleDestinationClick = (destination: Destination) => {
    const searchParams = new URLSearchParams({ to: destination.airportCode });
    router.push(`/?${searchParams.toString()}`);
  };

  return (
    <section className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-pf-red/10 px-4 py-1.5 text-sm font-medium text-pf-red mb-4"
          >
            <MapPin className="w-4 h-4" />
            Explore the World
          </motion.div>

          <motion.h2
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-pf-navy mb-4"
          >
            Popular Destinations
          </motion.h2>

          <motion.p
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-pf-navy-light max-w-2xl mx-auto"
          >
            Discover business class deals to the world's most sought-after destinations
          </motion.p>
        </div>

        {/* Region Tabs */}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 px-2 -mx-2 scrollbar-hide">
            {REGION_NAMES.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  activeRegion === region
                    ? "bg-pf-navy text-white shadow-lg"
                    : "bg-white text-pf-navy hover:bg-pf-navy/10 border border-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Destination Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: DURATION_FAST }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {REGIONS[activeRegion].map((destination, index) => (
              <DestinationCard
                key={destination.city}
                destination={destination}
                index={index}
                onClick={() => handleDestinationClick(destination)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
