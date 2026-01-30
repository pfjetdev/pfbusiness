"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { DestinationCard } from "@/components/ui/card-21";
import { deals } from "@/data/deals";
import { EASE_OUT_EXPO, DURATION_DEFAULT } from "@/lib/animations";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/deals-carousel.css";

const CARD_HEIGHT = 480;
const AUTOPLAY_DELAY = 3500;

const COVERFLOW_CONFIG = {
  rotate: 0,
  stretch: 0,
  depth: 120,
  modifier: 2.5,
  slideShadows: false,
};

const BREAKPOINTS = {
  0: { slidesPerView: 1.2, spaceBetween: 16 },
  640: { slidesPerView: 1.5, spaceBetween: 24 },
  768: { slidesPerView: 2, spaceBetween: 30 },
  1024: { slidesPerView: 2.5, spaceBetween: 30 },
  1280: { slidesPerView: 3, spaceBetween: 30 },
};

export function BestDealsSection() {
  return (
    <section className="relative py-20 overflow-clip">
      <div className="absolute inset-0 bg-pf-navy" style={{ height: "50%" }} />
      <div className="absolute inset-0 bg-pf-ivory" style={{ top: "50%", height: "50%" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: DURATION_DEFAULT, delay: 0.2, ease: EASE_OUT_EXPO }}
        className="deals-carousel relative z-10"
      >
        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={COVERFLOW_CONFIG}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".deals-next",
            prevEl: ".deals-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={BREAKPOINTS}
          className="!pb-14 !overflow-visible"
        >
          {deals.map((deal) => (
            <SwiperSlide key={`${deal.originCode}-${deal.destinationCode}`} className="!h-auto">
              <div className="transition-transform duration-500" style={{ height: CARD_HEIGHT }}>
                <DestinationCard {...deal} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="deals-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-pf-navy flex items-center justify-center hover:bg-pf-red transition-colors duration-300 cursor-pointer">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button className="deals-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-pf-navy flex items-center justify-center hover:bg-pf-red transition-colors duration-300 cursor-pointer">
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative z-10 flex justify-center mt-8"
      >
        <Link
          href="/deals"
          className="inline-flex items-center gap-2 bg-pf-red hover:bg-pf-red-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors duration-300 shadow-lg shadow-pf-red/20 hover:shadow-xl hover:shadow-pf-red/30"
        >
          View More Deals
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
