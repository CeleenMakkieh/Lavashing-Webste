"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";
import type { WPPost } from "@/lib/wordpress";

export default function BlogPost({ post }: { post: WPPost }) {
  return (
    <div className="pt-20">
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-6">
              {post.category}
            </div>

            <h1 className="text-4xl md:text-6xl mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-6 text-foreground/70 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#670626] to-[#6b8d6d] rounded-full" />
                <div>
                  <div className="text-foreground">{post.author}</div>
                  <div className="text-sm">{post.authorRole}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pb-8 border-b border-border">
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`aspect-[16/9] bg-gradient-to-br ${post.imageGradient} rounded-3xl mb-12`}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-[#670626] to-[#6b8d6d] rounded-full" />
                <div>
                  <div className="text-lg">{post.author}</div>
                  <div className="text-foreground/70">{post.authorRole}</div>
                </div>
              </div>
              <Button variant="outline">
                <Share2 size={16} className="mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
