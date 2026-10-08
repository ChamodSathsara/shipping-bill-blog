"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CookieIcon } from "lucide-react";
import { buttonVariants } from "../../lib/utils/buttonVariants";

type Consent = "pending" | "accepted" | "declined";

// UI-only consent banner. Wire `onAccept` / `onDecline` to your consent manager
// (e.g. Google Consent Mode v2 or a certified CMP) before enabling AdSense.
export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>("pending");

  useEffect(() => {
    const saved = localStorage.getItem("shipkit-cookie-consent");
    if (saved === "accepted" || saved === "declined") setConsent(saved);
  }, []);

  const choose = (value: Exclude<Consent, "pending">) => {
    localStorage.setItem("shipkit-cookie-consent", value);
    setConsent(value);
    window.dispatchEvent(new Event("shipkit-consent-change"));
  };

  return (
    <AnimatePresence>
      {consent === "pending" &&
      <motion.div
        role="region"
        aria-label="Cookie consent"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl border border-border bg-card p-4 shadow-xl shadow-foreground/10 sm:inset-x-6 sm:p-5">
        
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 gap-3">
              <CookieIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm leading-6 text-muted-foreground">
                We use cookies to keep the site working and, with your consent, to show ads from Google that keep our tools free.{" "}
                <Link href="/policy/cookie-policy" className="font-medium text-foreground underline underline-offset-2">
                  Cookie policy
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" onClick={() => choose("declined")} className={buttonVariants({ variant: "secondary", size: "md", className: "flex-1 md:flex-none" })}>
                Decline
              </button>
              <button type="button" onClick={() => choose("accepted")} className={buttonVariants({ size: "md", className: "flex-1 md:flex-none" })}>
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
