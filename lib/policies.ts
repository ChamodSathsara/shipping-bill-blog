import type { Policy } from "../lib/types/site";

export const policies: Policy[] = [
{
  slug: "privacy-policy",
  title: "Privacy Policy",
  description: "How ShipKit collects, uses and protects information, including cookies and Google AdSense advertising.",
  summary: "What we collect, how advertising cookies work and the choices you have.",
  lastUpdated: "2026-10-08",
  sections: [
  { id: "introduction", heading: "Introduction", paragraphs: ["This Privacy Policy explains how ShipKit (\"we\", \"us\") handles information when you visit shipkit.net and use our shipping label and packing slip tools."] },
  { id: "tool-data", heading: "Tool data we process", paragraphs: ["When you generate a document, the sender and recipient names, companies, postal addresses, phone numbers, order and reference numbers, package details, tracking text, line items, messages and any uploaded logo are sent securely to our server so it can create the requested PDF.", "This information is processed in server memory only. It is not written to the ShipKit database. The server discards the submitted fields and generated in-memory data when the response completes. Our intended retention period for tool data is therefore only the duration of the generation request.", "The generated PDF is returned directly to your browser. ShipKit does not retain a server copy. The browser may keep the downloaded file or a temporary object URL until you close or refresh the page, and you control any copy saved to your device."] },
  { id: "why-we-process", heading: "Why we process tool data", paragraphs: ["We process tool data solely to validate your input, render the selected label or packing-slip template and return the PDF you requested. We do not use sender, recipient, order or item data for advertising, profiling or marketing."] },
  { id: "information-we-collect", heading: "Other information we collect", paragraphs: ["Our hosting and security providers may process limited technical logs such as IP address, browser type, device type, requested URL and request time to deliver the site, diagnose failures and prevent abuse. If you contact us, we process the name, email address and message you provide so we can respond."] },
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
  { id: "retention", heading: "Retention and deletion", paragraphs: ["Shipping-label and packing-slip form data is deleted from server memory when PDF generation completes and is not stored in our database. Technical logs are retained according to the retention settings of our hosting, security and analytics providers. Contact messages are retained only as long as needed to respond, maintain necessary records and meet legal obligations."] },
  { id: "how-we-use", heading: "How we use information", paragraphs: ["We use non-document information to operate and secure the site, diagnose errors, understand aggregate site usage, respond to messages and display advertising when enabled."] },
  { id: "your-rights", heading: "Your choices and rights", paragraphs: ["Depending on where you live (for example under GDPR or CCPA), you may have rights to access, correct, delete or restrict use of your personal data. Contact us to exercise these rights."] },
  { id: "children", heading: "Children's privacy", paragraphs: ["Our site is not directed to children under 13 and we do not knowingly collect their personal information."] },
  { id: "contact", heading: "Contact us", paragraphs: ["Questions about this policy or a deletion request? Email hello@shipkit.net."] }]

}
,
{
  slug: "terms-of-service",
  title: "Terms of Service",
  description: "The terms that govern use of ShipKit's free shipping label and packing slip tools.",
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
