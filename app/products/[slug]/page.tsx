import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/views/ProductDetail";
import { products } from "@/lib/products";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const product = products.find((item) => item.slug === slug);
  if (!product) return {};
  return { title: product.metaTitle, description: product.metaDescription, keywords: product.keywords, alternates: { canonical: `/products/${slug}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; if (!products.some((p) => p.slug === slug)) notFound(); return <ProductDetail slug={slug} />; }
