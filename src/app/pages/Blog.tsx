import { motion } from "motion/react";
import { Link } from "react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      slug: "future-of-web-design",
      title: "The Future of Web Design: Trends to Watch in 2026",
      excerpt: "Explore the emerging design trends shaping the digital landscape and how to apply them to your brand.",
      date: "March 20, 2026",
      readTime: "5 min read",
      category: "Design",
      image: "from-blue-500 to-purple-500",
    },
    {
      slug: "branding-success-stories",
      title: "Branding Success Stories: How We Transformed 5 Brands",
      excerpt: "A deep dive into our most successful branding projects and the strategies that made them work.",
      date: "March 15, 2026",
      readTime: "8 min read",
      category: "Branding",
      image: "from-purple-500 to-pink-500",
    },
    {
      slug: "web-performance-optimization",
      title: "Web Performance Optimization: A Complete Guide",
      excerpt: "Learn how to make your website faster and more efficient with our comprehensive optimization guide.",
      date: "March 10, 2026",
      readTime: "10 min read",
      category: "Development",
      image: "from-pink-500 to-orange-500",
    },
    {
      slug: "marketing-strategies-2026",
      title: "Digital Marketing Strategies That Work in 2026",
      excerpt: "Discover the marketing tactics driving results for our clients and how to implement them in your business.",
      date: "March 5, 2026",
      readTime: "6 min read",
      category: "Marketing",
      image: "from-orange-500 to-yellow-500",
    },
    {
      slug: "user-experience-best-practices",
      title: "User Experience Best Practices for Modern Websites",
      excerpt: "Essential UX principles every website should follow to create exceptional user experiences.",
      date: "February 28, 2026",
      readTime: "7 min read",
      category: "Design",
      image: "from-yellow-500 to-green-500",
    },
    {
      slug: "choosing-tech-stack",
      title: "Choosing the Right Tech Stack for Your Web Project",
      excerpt: "A guide to selecting the best technologies for your website or web application.",
      date: "February 20, 2026",
      readTime: "9 min read",
      category: "Development",
      image: "from-green-500 to-teal-500",
    },
  ];

  const categories = ["All", "Design", "Development", "Branding", "Marketing", "Strategy"];

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
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-2.5 rounded-full transition-colors ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="mb-4 aspect-[16/10] rounded-2xl overflow-hidden">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${post.image} transform group-hover:scale-105 transition-transform duration-300`}
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
              <Link to="/blog/admin" className="text-primary hover:underline">
                Admin Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
