"use client";

import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DestinationCard } from "@/components/ui/card-21";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const deals = [
  {
    imageUrl: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
    location: "London",
    flag: "\u{1F1EC}\u{1F1E7}",
    stats: "Business Class from $2,400",
    href: "/deals/london",
    themeColor: "220 40% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    location: "Paris",
    flag: "\u{1F1EB}\u{1F1F7}",
    stats: "Business Class from $2,100",
    href: "/deals/paris",
    themeColor: "240 30% 20%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    location: "Dubai",
    flag: "\u{1F1E6}\u{1F1EA}",
    stats: "First Class from $3,800",
    href: "/deals/dubai",
    themeColor: "35 60% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
    location: "Tokyo",
    flag: "\u{1F1EF}\u{1F1F5}",
    stats: "Business Class from $2,900",
    href: "/deals/tokyo",
    themeColor: "0 50% 30%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    location: "Sydney",
    flag: "\u{1F1E6}\u{1F1FA}",
    stats: "Business Class from $3,200",
    href: "/deals/sydney",
    themeColor: "190 50% 25%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    location: "Singapore",
    flag: "\u{1F1F8}\u{1F1EC}",
    stats: "Business Class from $2,600",
    href: "/deals/singapore",
    themeColor: "150 40% 22%",
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
    location: "New York",
    flag: "\u{1F1FA}\u{1F1F8}",
    stats: "Business Class from $1,800",
    href: "/deals/new-york",
    themeColor: "210 35% 22%",
  },
];

export function BestDealsSection() {
  return (
    <section className="bg-pf-ivory py-20 overflow-clip">


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="deals-carousel relative"
      >
        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3500,
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
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 16 },
            640: { slidesPerView: 1.5, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 2.5, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="!pb-14 !overflow-visible"
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.location} className="!h-auto">
              <div className="h-[420px] transition-transform duration-500">
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

      <style jsx global>{`
        .deals-carousel .swiper-pagination-bullet {
          background: var(--pf-navy);
          opacity: 0.25;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .deals-carousel .swiper-pagination-bullet-active {
          background: var(--pf-red);
          opacity: 1;
          width: 28px;
          border-radius: 5px;
        }
        .deals-carousel .swiper-slide {
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .deals-carousel .swiper-slide {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
