import type { Faq } from "../lib/types/product";

export const howItWorksSteps = [
{
  title: "Enter your details",
  description: "Type addresses, order numbers or line items into a simple form — or upload a carrier PDF to resize."
},
{
  title: "Preview instantly",
  description: "See an exact, to-scale preview of your label or packing slip before anything is printed."
},
{
  title: "Print or download",
  description: "Send it to your thermal or home printer, or save a print-ready PDF for later."
}];


export const benefits = [
{ icon: "free", title: "Free, for real", description: "No trials, no watermarks, no per-label fees. Ads keep the lights on." },
{ icon: "signup", title: "No signup", description: "Open a tool and start. There is no account to create or password to forget." },
{ icon: "print", title: "Print-ready output", description: "Sized precisely for 4x6 thermal printers, A4 and US Letter paper." },
{ icon: "mobile", title: "Mobile friendly", description: "Create a label from your phone and print over Wi-Fi or AirPrint." }] as
const;

export const homeFaqs: Faq[] = [
{
  question: "Are ShipKit's free shipping tools free to use?",
  answer: "Yes. The shipping label maker and packing slip generator are free to use with no signup or watermark."
},
{
  question: "Do I need to create an account?",
  answer: "No. All tools work directly in your browser. Nothing to register, nothing to install."
},
{
  question: "Which label sizes are supported?",
  answer: "Shipping labels use the standard 4×6 inch thermal format. Packing slips can be generated on A4 or A5 paper."
},
{
  question: "Can I use these tools for Etsy, eBay and Amazon orders?",
  answer: "Yes. These online seller tools support Etsy, eBay, Amazon, Shopify, Poshmark and independent ecommerce stores."
},
{
  question: "Do you store my customers' addresses?",
  answer: "No. Label and slip data is processed in your browser and never saved on our servers."
},
{
  question: "What printer do I need?",
  answer: "Use any thermal printer that accepts 4×6 labels, such as Rollo, Munbyn or Zebra. Packing slips work with regular inkjet and laser printers."
}];
