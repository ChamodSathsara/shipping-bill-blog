"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import type { NavItem } from "../../lib/types/site";
import { cn } from "../../lib/utils/cn";
import { navLinkClass } from "./navLinkClass";

export function NavDropdown({ item }: {item: NavItem;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = pathname.startsWith(item.href);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}>
      
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)} className={navLinkClass(active)}>
        {item.label}
        <ChevronDownIcon aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-150 ease-out", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open &&
        <div className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-2">
            <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="rounded-xl border border-border bg-card p-2 shadow-lg shadow-foreground/5">
            
              <ul>
                {item.children?.map((child) =>
              <li key={child.href}>
                    <Link
                  href={child.href}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                    pathname === child.href && "bg-accent"
                  )}>
                  
                      <span className="block text-sm font-semibold text-foreground">{child.label}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{child.description}</span>
                    </Link>
                  </li>
              )}
              </ul>
              <Link
              href={item.href}
              className="mt-1 block rounded-lg border-t border-border px-3 pb-2 pt-3 text-sm font-semibold text-primary transition-colors duration-150 hover:bg-muted">
              
                View all {item.label.toLowerCase()} →
              </Link>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}
