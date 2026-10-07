import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/views/PolicyPage";
import { policies } from "@/lib/policies";
export function generateStaticParams() {
  return policies.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = policies.find((item) => item.slug === slug);
  return p
    ? {
        title: p.title,
        description: p.description,
        alternates: { canonical: `/policy/${slug}` },
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!policies.some((p) => p.slug === slug)) notFound();
  return <PolicyPage slug={slug} />;
}
