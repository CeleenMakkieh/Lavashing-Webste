import { getBlogPost, getBlogPosts } from "@/lib/wordpress";
import { FALLBACK_POSTS } from "@/lib/fallback-data";
import BlogPost from "../../pages/BlogPost";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = (await getBlogPosts()) ?? FALLBACK_POSTS;
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getBlogPost(slug)) ?? FALLBACK_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPost post={post} />;
}
