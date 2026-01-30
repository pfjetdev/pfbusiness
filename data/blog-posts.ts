export interface BlogPostAuthor {
  name: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: BlogPostAuthor;
  date: string;
  readTime: string;
  trending?: boolean;
}

export const blogPosts: BlogPost[] = [
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
