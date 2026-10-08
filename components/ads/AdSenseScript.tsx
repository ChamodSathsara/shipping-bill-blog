"use client";

import { useEffect } from "react";
import { siteConfig } from "../../lib/siteConfig";

// Loads the AdSense script exactly once, after the app is interactive.
export function AdSenseScript() {
  const { publisherId, enabled, visible } = siteConfig.adsense;

  useEffect(() => {
    if (!visible || !enabled || !publisherId) return;
    if (document.querySelector('script[data-adsense="true"]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adsense = "true";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`;
    document.head.appendChild(script);
  }, [visible, enabled, publisherId]);

  return null;
}
