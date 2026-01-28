"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useRef, useEffect } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, motionValue, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref} className="tabular-nums inline-block">0{suffix}</span>;
}

const trustItems = [
  { title: <><AnimatedCounter target={60} suffix="%" /> Savings</>, description: "On Business & First Class" },
  { title: "24/7 Support", description: "Expert travel consultants" },
  { title: "100% Secure", description: "Protected payments" },
  { title: <><AnimatedCounter target={15000} suffix="+" /></>, description: "Happy travelers" },
];

export function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="bg-pf-ivory py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 lg:gap-x-16">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <p className="text-pf-navy font-bold text-sm lg:text-base">{item.title}</p>
              <span className="text-pf-navy-light/40">·</span>
              <p className="text-pf-navy-light/60 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
