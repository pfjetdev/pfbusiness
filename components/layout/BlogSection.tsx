"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, stagger } from "motion/react";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.15),
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  trending?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "best-business-class-2025",
    title: "The 10 Best Business Class Cabins to Fly in 2025",
    excerpt:
      "From Qatar's revolutionary QSuites to Singapore Airlines' new A350 product, we reveal the ultimate business class experiences.",
    image:
      "https://images.unsplash.com/photo-1540339832862-474599807836?w=800&q=80",
    category: "Airline Reviews",
    author: {
      name: "James Mitchell",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    date: "Jan 15, 2025",
    readTime: "8 min read",
    trending: true,
  },
  {
    id: "emirates-first-class-review",
    title: "Emirates First Class: Is the $15,000 Ticket Worth It?",
    excerpt:
      "We tested Emirates' legendary First Class suite with shower spa, onboard bar, and caviar service. Here's our verdict.",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
    category: "Flight Reviews",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    date: "Jan 12, 2025",
    readTime: "12 min read",
  },
  {
    id: "travel-hacks-premium-flights",
    title: "7 Insider Secrets to Book Premium Flights for Less",
    excerpt:
      "Learn the strategies travel agents use to find unpublished fares and save up to 60% on business class tickets.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    category: "Travel Tips",
    author: {
      name: "Michael Torres",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    date: "Jan 10, 2025",
    readTime: "6 min read",
    trending: true,
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
    >
      <Link href={`/blog/${post.id}`} className="absolute inset-0 z-10" />

      {/* Image */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badges */}
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

        {/* Author */}
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

      {/* Content */}
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

export function BlogSection() {
  return (
    <section className="bg-pf-ivory py-20 px-4 lg:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
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

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
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
