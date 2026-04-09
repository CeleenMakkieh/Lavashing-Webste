"use client";
import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { WPPost } from "@/lib/wordpress";

const CATEGORIES = ["All", "Design", "Development", "Branding", "Marketing", "Strategy"];

export default function Blog({ posts }: { posts: WPPost[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20">
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl mb-8">Our Blog</h1>
            <p className="text-xl md:text-2xl text-foreground/70">
              Insights, tips, and inspiration from the Lavashing team
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="mb-4 aspect-[16/10] rounded-2xl overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${post.imageGradient} transform group-hover:scale-105 transition-transform duration-300`}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {post.category}
                    </div>

                    <h2 className="text-2xl group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-foreground/70 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span>Read more</span>
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-foreground/60">
              Want to contribute?{" "}
              <Link href="/blog/admin" className="text-primary hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
