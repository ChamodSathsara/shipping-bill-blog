"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "shipkit-cookie-consent";

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    const sync = () => setAllowed(localStorage.getItem(CONSENT_KEY) === "accepted");
    sync();
    window.addEventListener("shipkit-consent-change", sync);
    return () => window.removeEventListener("shipkit-consent-change", sync);
  }, []);
  if (!measurementId || !allowed) return null;
  return <><Script async strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} /><Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`}</Script></>;
}
