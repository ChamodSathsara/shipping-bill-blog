"use client";

import React from "react";

// Barcode pattern: each digit = bar width in px; bars alternate black / gap.
const BARCODE = "2131231121321131222113212312113121312231121321131213";

export function LabelMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[380px]" aria-label="Example of a 4x6 inch shipping label" role="img">
      {/* Packing slip peeking behind */}
      <div aria-hidden="true" className="absolute -left-6 top-8 hidden h-[88%] w-[78%] -rotate-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:block">
        <div className="h-2.5 w-24 rounded bg-foreground/80" />
        <div className="mt-2 h-2 w-16 rounded bg-muted-foreground/40" />
        <div className="mt-6 space-y-3">
          {[0, 1, 2, 3].map((i) =>
          <div key={i} className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-sm border border-muted-foreground/50" />
              <div className="h-2 flex-1 rounded bg-muted-foreground/25" />
              <div className="h-2 w-6 rounded bg-muted-foreground/40" />
            </div>
          )}
        </div>
      </div>

      {/* 4x6 label */}
      <div aria-hidden="true" className="relative ml-auto aspect-[2/3] w-[86%] rotate-2 rounded-md border border-neutral-300 bg-white p-4 font-mono text-[10px] leading-tight text-neutral-900 shadow-xl shadow-neutral-900/10">
        <div className="flex items-stretch border-b-2 border-neutral-900 pb-3">
          <div className="flex w-14 items-center justify-center bg-neutral-900 font-sans text-3xl font-extrabold text-white">P</div>
          <div className="ml-3 flex flex-col justify-center">
            <span className="font-sans text-[13px] font-extrabold tracking-tight">PRIORITY · 2-DAY</span>
            <span className="mt-0.5 text-neutral-600">Commercial base pricing</span>
          </div>
        </div>

        <div className="mt-3 text-[9px] text-neutral-700">
          <p className="font-bold text-neutral-900">FROM</p>
          <p>WILLOW &amp; THREAD CO</p>
          <p>418 MAPLE AVE</p>
          <p>PORTLAND OR 97205</p>
        </div>

        <div className="mt-4 border-y border-neutral-300 py-3 pl-6">
          <p className="text-[9px] font-bold">SHIP TO</p>
          <p className="mt-1 font-sans text-[13px] font-bold leading-snug">JORDAN ELLIS</p>
          <p className="font-sans text-[12px] leading-snug">2210 HARBOR BLVD APT 4</p>
          <p className="font-sans text-[12px] leading-snug">SAN DIEGO CA 92101-4412</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[9px] font-bold tracking-wide">TRACKING #</p>
          <div className="mx-auto mt-2 flex h-14 w-[92%] items-stretch justify-center">
            {BARCODE.split("").map((w, i) =>
            <span key={i} style={{ width: `${Number(w) * 1.3}px` }} className={i % 2 === 0 ? "bg-neutral-900" : "bg-transparent"} />
            )}
          </div>
          <p className="mt-1.5 tracking-[0.12em]">9400 1118 2233 4455 6677 88</p>
        </div>

        <div className="absolute inset-x-4 bottom-3 flex justify-between border-t border-neutral-300 pt-2 text-[9px] text-neutral-600">
          <span>ORDER #ET-20481</span>
          <span>1.4 LB</span>
          <span>4 × 6 IN</span>
        </div>
      </div>
    </div>);

}