import type { NavItem } from "../lib/types/site";

export const mainNav: NavItem[] = [
{ label: "Home", href: "/" },
{
  label: "Products",
  href: "/products",
  children: [
  {
    label: "Shipping Label Maker",
    href: "/products/shipping-label-maker",
    description: "Printable 4x6, A4 and Letter shipping labels."
  },
  {
    label: "Packing Slip Generator",
    href: "/products/packing-slip-generator",
    description: "Itemized packing slips with SKU and variants."
  },
  {
    label: "Shipping Label Resizer",
    href: "/products/shipping-label-resizer",
    description: "Convert carrier PDFs to 4x6 thermal size."
  }]

},
{ label: "Blogs", href: "/blog" },
{
  label: "Policy",
  href: "/policy",
  children: [
  { label: "Privacy Policy", href: "/policy/privacy-policy", description: "What we collect and how ads use cookies." },
  { label: "Terms of Service", href: "/policy/terms-of-service", description: "The rules for using our free tools." },
  { label: "Cookie Policy", href: "/policy/cookie-policy", description: "Cookies we and our partners set." }]

},
{ label: "About Us", href: "/about-us" },
{ label: "Contact Us", href: "/contact-us" }];


export const footerColumns = [
{
  title: "Products",
  links: [
  { label: "Shipping Label Maker", href: "/products/shipping-label-maker" },
  { label: "Packing Slip Generator", href: "/products/packing-slip-generator" },
  { label: "Shipping Label Resizer", href: "/products/shipping-label-resizer" },
  { label: "All products", href: "/products" }]

},
{
  title: "Company",
  links: [
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Blog", href: "/blog" }]

},
{
  title: "Legal",
  links: [
  { label: "Privacy Policy", href: "/policy/privacy-policy" },
  { label: "Terms of Service", href: "/policy/terms-of-service" },
  { label: "Cookie Policy", href: "/policy/cookie-policy" }]

}];