"use client";

import React, { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../../lib/utils/cn";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items, className }: {items: AccordionItem[];className?: string;}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left font-display text-base font-semibold text-foreground transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                
                {item.question}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn("h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ease-out-strong", open && "rotate-180")} />
                
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open &&
              <motion.div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden">
                
                  <p className="max-w-reading pb-5 leading-7 text-muted-foreground">{item.answer}</p>
                </motion.div>
              }
            </AnimatePresence>
          </div>);

      })}
    </div>);

}