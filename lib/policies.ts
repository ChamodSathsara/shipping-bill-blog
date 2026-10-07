import type { Policy } from "../lib/types/site";

// ⚠️ REPLACE WITH REAL POLICY — all text below is placeholder copy and is not legal advice.
export const policies: Policy[] = [
{
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: "How ShipKit collects, uses and protects information, including cookies and Google AdSense advertising.",
  summary: "What we collect, how advertising cookies work and the choices you have.",
  lastUpdated: "2026-10-01",
  sections: [
  { id: "introduction", heading: "Introduction", paragraphs: ["This Privacy Policy explains how ShipKit (\"we\", \"us\") handles information when you visit our website and use our free shipping tools. Our tools process label and order data in your browser; we do not store it on our servers."] },
  { id: "information-we-collect", heading: "Information we collect", paragraphs: ["We collect limited technical information such as browser type, device type, referring page and approximate location derived from your IP address. If you contact us or sign up for product updates, we collect the name and email address you provide."] },
  { id: "cookies", heading: "Cookies and similar technologies", paragraphs: ["We use cookies and similar technologies to remember your preferences, understand site usage and display advertising. You can control cookies through your browser settings and our cookie banner. See our Cookie Policy for details."] },
  {
    id: "google-adsense",
    heading: "Google AdSense and advertising",
    paragraphs: [
    "We use Google AdSense to display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites.",
    "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.",
    "You may opt out of personalized advertising by visiting Google Ads Settings. You can also opt out of some third-party vendors' use of cookies for personalized advertising by visiting aboutads.info."],

    links: [
    { label: "Google Ads Settings (ad personalization opt-out)", href: "https://www.google.com/settings/ads" },
    { label: "How Google uses information from sites that use its services", href: "https://policies.google.com/technologies/partner-sites" },
    { label: "aboutads.info opt-out", href: "https://www.aboutads.info/choices/" }]

  },
  { id: "third-party-vendors", heading: "Third-party vendors", paragraphs: ["Other third-party vendors or ad networks may also use cookies to serve ads on our site. We do not control these cookies. Please consult their respective privacy policies for information about their practices and how to opt out."] },
  { id: "how-we-use", heading: "How we use information", paragraphs: ["We use information to operate and improve the site, respond to messages, send product updates you request, prevent abuse and show advertising that keeps our tools free."] },
  { id: "your-rights", heading: "Your choices and rights", paragraphs: ["Depending on where you live (for example under GDPR or CCPA), you may have rights to access, correct, delete or restrict use of your personal data. Contact us to exercise these rights."] },
  { id: "children", heading: "Children's privacy", paragraphs: ["Our site is not directed to children under 13 and we do not knowingly collect their personal information."] },
  { id: "contact", heading: "Contact us", paragraphs: ["Questions about this policy? Email hello@shipkit.example.com."] }]

}
,
{
  slug: "terms-of-service",
  title: "Terms of Service",
  description: "The terms that govern use of ShipKit's free shipping label, packing slip and label resizing tools.",
  summary: "The rules for using our free tools and website content.",
  lastUpdated: "2026-10-01",
  sections: [
  { id: "acceptance", heading: "Acceptance of terms", paragraphs: ["By accessing or using ShipKit, you agree to these Terms. If you do not agree, please do not use the site."] },
  { id: "use-of-tools", heading: "Use of our tools", paragraphs: ["Our tools are provided free of charge for lawful purposes. You are responsible for the accuracy of the information you enter and for complying with carrier and marketplace rules."] },
  { id: "no-postage", heading: "No postage or carrier services", paragraphs: ["ShipKit does not sell postage or act as a carrier. Labels created with our tools are layouts only and must be used with valid postage purchased from a carrier or marketplace."] },
  { id: "content", heading: "Website content", paragraphs: ["Articles and guides are for general information. While we work to keep them accurate, carrier rules change frequently and you should verify requirements with your carrier."] },
  { id: "advertising", heading: "Advertising", paragraphs: ["The site displays third-party advertising. We are not responsible for the content of ads or the products and services they promote."] },
  { id: "liability", heading: "Limitation of liability", paragraphs: ["The tools are provided \"as is\" without warranties. To the fullest extent permitted by law, ShipKit is not liable for lost parcels, delays, misprints or other damages arising from use of the site."] },
  { id: "changes", heading: "Changes to these terms", paragraphs: ["We may update these Terms from time to time. Continued use of the site after changes means you accept the revised Terms."] }]

}
,
{
  slug: "cookie-policy",
  title: "Cookie Policy",
  description: "Which cookies ShipKit and its advertising partners use, why, and how you can manage them.",
  summary: "Cookies we and our advertising partners set, and how to manage them.",
  lastUpdated: "2026-10-01",
  sections: [
  { id: "what-are-cookies", heading: "What are cookies?", paragraphs: ["Cookies are small text files stored on your device by websites you visit. They help sites remember preferences and understand how they are used."] },
  { id: "essential", heading: "Essential cookies", paragraphs: ["These keep the site working, for example remembering your cookie consent choice and theme preference. They cannot be switched off."] },
  { id: "analytics", heading: "Analytics cookies", paragraphs: ["With your consent, we use privacy-focused analytics to understand which pages and tools are most useful."] },
  {
    id: "advertising-cookies",
    heading: "Advertising cookies",
    paragraphs: ["Google AdSense and its partners use cookies to show ads and measure their performance. With your consent these may be personalized based on your browsing activity."],
    links: [{ label: "Manage Google ad personalization", href: "https://www.google.com/settings/ads" }]
  },
  { id: "managing", heading: "Managing cookies", paragraphs: ["You can accept or decline non-essential cookies using our banner, and delete or block cookies in your browser settings. Blocking some cookies may affect how the site works."] }]

}];