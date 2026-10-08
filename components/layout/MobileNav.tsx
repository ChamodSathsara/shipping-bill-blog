"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { mainNav } from "../../lib/navigation";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { cn } from "../../lib/utils/cn";
import { Logo } from "./Logo";

export function MobileNav({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const linkClass = (isActive: boolean) =>
  cn(
    "flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors duration-150 hover:bg-muted",
    isActive ? "bg-accent text-accent-foreground" : "text-foreground"
  );

  return (
    <AnimatePresence>
      {open &&
      <div id="mobile-navigation" className="fixed inset-0 z-50 h-dvh lg:hidden">
          <motion.div
          className="absolute inset-0 bg-foreground/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden="true" />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-[22rem] flex-col bg-background shadow-xl sm:w-[88vw]"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex min-h-16 items-center justify-between border-b border-border px-4 pt-[env(safe-area-inset-top)]">
              <Logo />
              <button type="button" onClick={onClose} aria-label="Close menu" className={buttonVariants({ variant: "ghost", size: "icon" })} autoFocus>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <ul className="space-y-1">
                {mainNav.map((item) =>
              <li key={item.href}>
                    <Link href={item.href} className={linkClass(item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))} onClick={onClose}>
                      {item.label}
                    </Link>
                    {item.children &&
                <ul className="mb-2 ml-3 mt-1 space-y-0.5 border-l border-border pl-3">
                        {item.children.map((child) =>
                  <li key={child.href}>
                            <Link
                      href={child.href}
                      onClick={onClose}
                      className={
                      cn(
                        "flex min-h-[44px] items-center rounded-lg px-3 text-sm transition-colors duration-150 hover:bg-muted",
                        pathname === child.href ? "font-semibold text-primary" : "text-muted-foreground"
                      )
                      }>
                      
                              {child.label}
                            </Link>
                          </li>
                  )}
                      </ul>
                }
                  </li>
              )}
              </ul>
            </nav>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}
