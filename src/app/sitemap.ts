import { getBlogPosts } from "@/lib/wordpress";
import { FALLBACK_POSTS } from "@/lib/fallback-data";

const BASE = "https://www.lavashing.com";

export default async function sitemap() {
  const staticRoutes = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/work`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/special-events`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
  ];

  const wpPosts = await getBlogPosts();
  const posts = wpPosts ?? FALLBACK_POSTS;
  const blogRoutes = posts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
