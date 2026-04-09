import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";

export default function BlogPost() {
  const { slug } = useParams();

  const post = {
    title: "The Future of Web Design: Trends to Watch in 2026",
    date: "March 20, 2026",
    readTime: "5 min read",
    category: "Design",
    author: "Michael Chen",
    authorRole: "Creative Director",
    content: [
      "The digital landscape is constantly evolving, and staying ahead of design trends is crucial for creating websites that resonate with modern audiences. As we navigate through 2026, several key trends are shaping the future of web design.",
      "Minimalism continues to dominate, but with a twist. We're seeing designers embrace 'warm minimalism' - clean layouts enhanced with subtle textures, organic shapes, and warmer color palettes that create more inviting digital experiences.",
      "Interactive 3D elements are becoming more accessible and performant. With improved browser capabilities and tools, designers can now incorporate immersive 3D graphics without sacrificing load times or user experience.",
      "Accessibility is no longer optional. Modern web design prioritizes inclusive experiences, ensuring websites work seamlessly for users of all abilities. This includes better color contrast, keyboard navigation, and screen reader compatibility.",
      "The rise of AI-powered personalization is transforming how users interact with websites. Dynamic content that adapts to user preferences and behavior creates more engaging, relevant experiences.",
    ],
  };

  return (
    <div className="pt-20">
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
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
            className="aspect-[16/9] bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl mb-12"
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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
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

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Link
                key={i}
                to="/blog/related-post"
                className="group block p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl mb-4" />
                <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">
                  Related Post Title {i}
                </h3>
                <p className="text-foreground/70 text-sm">5 min read</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
