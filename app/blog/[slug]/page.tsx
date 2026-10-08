import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/views/BlogPost";
import { blogPosts } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return post
    ? {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
          type: "article",
          title: post.title,
          description: post.description,
          images: [{ url: post.image, alt: post.imageAlt }],
        },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!blogPosts.some((p) => p.slug === slug)) notFound();
  return <BlogPost slug={slug} />;
}
