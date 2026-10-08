import type { NavItem } from "../lib/types/site";

export const mainNav: NavItem[] = [
{ label: "Home", href: "/" },
{
  label: "Tools",
  href: "/shipping-label-maker",
  children: [
  {
    label: "Shipping Label Maker",
    href: "/shipping-label-maker",
    description: "Create and print standard 4×6 shipping labels."
  },
  {
    label: "Packing Slip Generator",
    href: "/packing-slip-generator",
    description: "Create A4 or A5 itemized packing slips."
  }]

},
{ label: "Blogs", href: "/blog", children: [
  { label: "How to use Shipping Label Maker", href: "/blog/how-to-make-a-4x6-shipping-label", description: "Create and print a 4×6 label step by step." },
  { label: "How to use Packing Slip Generator", href: "/blog/what-to-include-on-a-packing-slip", description: "Build a complete A4 or A5 packing slip." },
  { label: "Resize labels for thermal printers", href: "/blog/resize-shipping-label-pdf-to-4x6", description: "Keep barcode quality when preparing 4×6 labels." },
  { label: "Marketplace shipping guide", href: "/blog/etsy-vs-ebay-vs-amazon-shipping-guide", description: "Compare Etsy, eBay and Amazon workflows." }
] },
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
  title: "Tools",
  links: [
  { label: "Shipping Label Maker", href: "/shipping-label-maker" },
  { label: "Packing Slip Generator", href: "/packing-slip-generator" }]

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
