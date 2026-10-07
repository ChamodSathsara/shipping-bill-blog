export interface NavChild {
  label: string;
  href: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface PolicySection {
  id: string;
  heading: string;
  paragraphs: string[];
  links?: {label: string;href: string;}[];
}

export interface Policy {
  slug: string;
  title: string;
  description: string;
  summary: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface ActionResult {
  ok: boolean;
  message: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}