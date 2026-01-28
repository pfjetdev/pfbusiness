"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, stagger } from "motion/react";
import { ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.06, { from: "center" }),
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const airlines = [
  {
    name: "Emirates",
    logo: "emirates.svg",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?w=600&q=80",
    route: "Dubai · First & Business",
    saving: "Save up to 60%",
  },
  {
    name: "Qatar Airways",
    logo: "Qatar Airways.svg",
    image: "https://images.unsplash.com/photo-1559628233-100c798642d4?w=600&q=80",
    route: "Doha · QSuites Business",
    saving: "Save up to 55%",
  },
  {
    name: "Singapore Airlines",
    logo: "Singapore Airlines.svg",
    image: "https://images.unsplash.com/photo-1496939376851-89342e90adcd?w=600&q=80",
    route: "Singapore · Suites & Business",
    saving: "Save up to 50%",
  },
  {
    name: "Turkish Airlines",
    logo: "Turkish Airlines.svg",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    route: "Istanbul · Business Class",
    saving: "Save up to 45%",
  },
  {
    name: "Air France",
    logo: "Air France.svg",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    route: "Paris · La Première & Business",
    saving: "Save up to 50%",
  },
  {
    name: "Cathay Pacific",
    logo: "Cathay Pacific.svg",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80",
    route: "Hong Kong · Business Class",
    saving: "Save up to 55%",
  },
  {
    name: "Korean Air",
    logo: "Korean Air.svg",
    image: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80",
    route: "Seoul · Prestige Suite",
    saving: "Save up to 50%",
  },
  {
    name: "Japan Airlines",
    logo: "Japan Airlines.svg",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    route: "Tokyo · First & Business",
    saving: "Save up to 45%",
  },
  {
    name: "All Nippon Airways",
    logo: "All Nippon Airways.svg",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80",
    route: "Tokyo · The Room Business",
    saving: "Save up to 50%",
  },
  {
    name: "Hainan Airlines",
    logo: "Hainan Airlines.svg",
    image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80",
    route: "Beijing · Business Class",
    saving: "Save up to 45%",
  },
];

export function AirlinesSection() {
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
            Best First & Business <span className="text-pf-red">Class Airlines</span>
          </h2>
          <p className="text-lg text-pf-navy-light max-w-2xl mx-auto">
            Fly with the world&apos;s most awarded carriers at exclusive rates.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {airlines.map((airline) => (
            <motion.div
              key={airline.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative rounded-2xl overflow-hidden h-[240px] shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Link href="/contact" className="absolute inset-0 z-10" aria-label={`Get quote for ${airline.name}`} />

              {/* Background image */}
              <Image
                src={airline.image}
                alt={airline.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                {/* Logo */}
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

                {/* Info */}
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
