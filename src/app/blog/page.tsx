import { getBlogPosts } from "@/lib/wordpress";
import { FALLBACK_POSTS } from "@/lib/fallback-data";
import Blog from "../pages/Blog";

export default async function BlogPage() {
  const posts = (await getBlogPosts()) ?? FALLBACK_POSTS;
  return <Blog posts={posts} />;
}
