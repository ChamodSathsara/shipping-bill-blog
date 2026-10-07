export type ProductStatus = "coming-soon" | "live";
export type ProductIconKey = "label" | "slip" | "resize";

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductStep {
  title: string;
  description: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SeoSection {
  heading: string;
  paragraphs: string[];
}

export interface Product {
  slug: string;
  name: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  status: ProductStatus;
  icon: ProductIconKey;
  highlights: string[];
  longDescription: string;
  features: ProductFeature[];
  steps: ProductStep[];
  seoContent: SeoSection[];
  faqs: Faq[];
}