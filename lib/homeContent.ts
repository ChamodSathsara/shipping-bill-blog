import type { Faq } from "../lib/types/product";
import { homeKeyword } from "../lib/utils/keywords";

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
  question: `Is the ${homeKeyword(0)} free to use?`,
  answer: `Yes. Every ShipKit tool, including the ${homeKeyword(0)}, will be free with no signup and no label limits. The site is supported by a small number of ads.`
},
{
  question: "Do I need to create an account?",
  answer: "No. All tools work directly in your browser. Nothing to register, nothing to install."
},
{
  question: "Which label sizes are supported?",
  answer: `The standard 4x6 inch thermal label plus A4 and US Letter sheets. Our ${homeKeyword(3)} turns full-page carrier PDFs into 4x6 labels.`
},
{
  question: "Can I use these tools for Etsy, eBay and Amazon orders?",
  answer: `Yes. ShipKit is built as a set of ${homeKeyword(4)} on Etsy, eBay, Amazon, Shopify, Poshmark and independent stores.`
},
{
  question: "Do you store my customers' addresses?",
  answer: "No. Label and slip data is processed in your browser and never saved on our servers."
},
{
  question: "What printer do I need?",
  answer: `Any ${homeKeyword(5)} that accepts 4x6 labels (Rollo, Munbyn, Zebra, Dymo 4XL) or a regular inkjet or laser printer.`
}];