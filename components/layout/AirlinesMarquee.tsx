"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

const airlines = [
  "Emirates",
  "Qatar Airways",
  "Singapore Airlines",
  "Turkish Airlines",
  "Air France",
  "Cathay Pacific",
  "Korean Air",
  "Japan Airlines",
  "All Nippon Airways",
  "Hainan Airlines",
];

const airlineFile: Record<string, string> = {
  Emirates: "emirates.svg",
  "Qatar Airways": "Qatar Airways.svg",
  "Singapore Airlines": "Singapore Airlines.svg",
  "Turkish Airlines": "Turkish Airlines.svg",
  "Air France": "Air France.svg",
  "Cathay Pacific": "Cathay Pacific.svg",
  "Korean Air": "Korean Air.svg",
  "Japan Airlines": "Japan Airlines.svg",
  "All Nippon Airways": "All Nippon Airways.svg",
  "Hainan Airlines": "Hainan Airlines.svg",
};

export function AirlinesMarquee() {
  return (
    <section className="bg-pf-ivory py-10">
      <p className="text-center text-xs text-pf-navy-light/60 mb-6 uppercase tracking-widest font-medium">
        Trusted by travelers worldwide
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-pf-ivory to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-pf-ivory to-transparent" />

        <Marquee speed={40} pauseOnHover autoFill gradient={false}>
          {airlines.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center mx-8 lg:mx-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={`/airlines/${airlineFile[name]}`}
                alt={name}
                width={300}
                height={100}
                className="h-20 lg:h-28 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
