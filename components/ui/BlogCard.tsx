"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

import type { BlogPost } from "@/data/blog-posts";
import { cardFadeInVariants, DURATION_FAST } from "@/lib/animations";

const IMAGE_HEIGHT = 220;

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      variants={cardFadeInVariants}
      whileHover={{ y: -8, transition: { duration: DURATION_FAST, ease: "easeOut" } }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10" />

      <div className="relative overflow-hidden" style={{ height: IMAGE_HEIGHT }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-pf-red text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
            {post.category}
          </span>
          {post.trending && (
            <span className="bg-pf-navy text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Trending
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/50">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium text-sm">{post.author.name}</p>
            <p className="text-white/70 text-xs">{post.date}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-pf-navy mb-2 line-clamp-2 group-hover:text-pf-red transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-pf-navy-light/70 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-pf-navy-light/50 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <span className="flex items-center gap-1 text-pf-red font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Read More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
