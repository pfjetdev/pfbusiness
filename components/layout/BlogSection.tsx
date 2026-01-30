"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { BlogCard } from "@/components/ui/BlogCard";
import { blogPosts } from "@/data/blog-posts";
import { fadeInUpVariants, staggerContainerVariants } from "@/lib/animations";

export function BlogSection() {
  return (
    <section className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-pf-red text-sm font-semibold uppercase tracking-widest mb-2 block">
              Travel Insights
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pf-navy">
              From Our <span className="text-pf-red">Blog</span>
            </h2>
            <p className="text-lg text-pf-navy-light mt-3 max-w-xl">
              Expert tips, airline reviews, and insider secrets to elevate your
              travel experience.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 bg-pf-navy hover:bg-pf-red text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl self-start md:self-auto"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
