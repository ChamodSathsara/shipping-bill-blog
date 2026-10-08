export type BlogCategory =
  | "Shipping Labels"
  | "Packing & Fulfillment"
  | "Marketplace Guides"
  | "Printers & Hardware";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "image"; src: string; alt: string; caption: string };

export interface Author {
  name: string;
  role: string;
  bio: string;
  initials: string;
  linkedIn: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  updatedAt: string;
  category: BlogCategory;
  tags: string[];
  relatedProduct: string;
  readTime: number;
  author: Author;
  featured: boolean;
  content: BlogBlock[];
}

export interface CategoryInfo {
  name: BlogCategory;
  cover: string;
}
