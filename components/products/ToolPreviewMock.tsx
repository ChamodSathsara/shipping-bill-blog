"use client";

import React from "react";
import { LockIcon, UploadIcon } from "lucide-react";
import type { ProductIconKey } from "../../lib/types/product";

function Field({ label, wide = false }: {label: string;wide?: boolean;}) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <div className="text-[11px] font-medium text-muted-foreground">{label}</div>
      <div className="mt-1 h-9 rounded-md border border-border bg-background" />
    </div>);

}

function LabelForm() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Field label="Sender name" />
      <Field label="Receiver name" />
      <Field label="Street address" wide />
      <Field label="Order number" />
      <Field label="Weight (lb)" />
      <div className="col-span-2 mt-1 flex gap-2">
        {["4x6", "A4", "Letter"].map((s, i) =>
        <span key={s} className={`rounded-md px-3 py-1.5 text-xs font-semibold ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{s}</span>
        )}
      </div>
    </div>);

}

function SlipForm() {
  return (
    <div>
      <div className="grid grid-cols-[1fr_70px_50px] gap-2 border-b border-border pb-2 text-[11px] font-semibold text-muted-foreground">
        <span>Item / variant</span><span>SKU</span><span>Qty</span>
      </div>
      {["Linen tote · Sage", "Ceramic mug · 12oz", "Gift wrap"].map((item, i) =>
      <div key={item} className="grid grid-cols-[1fr_70px_50px] gap-2 border-b border-border py-2.5 text-xs text-foreground">
          <span>{item}</span><span className="font-mono text-muted-foreground">SK-{104 + i}</span><span>{i === 1 ? 2 : 1}</span>
        </div>
      )}
      <div className="mt-3 h-9 w-32 rounded-md bg-primary" />
    </div>);

}

function ResizerDrop() {
  return (
    <div className="flex h-56 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border text-center">
      <UploadIcon className="h-6 w-6 text-muted-foreground" />
      <p className="mt-2 text-sm font-medium text-foreground">Drop a label PDF here</p>
      <p className="text-xs text-muted-foreground">UPS · FedEx · Amazon · eBay</p>
    </div>);

}

const mocks: Record<ProductIconKey, () => React.ReactElement> = { label: LabelForm, slip: SlipForm, resize: ResizerDrop };

// Disabled-looking preview of the upcoming tool, shown while status === "coming-soon".
export function ToolPreviewMock({ icon, name }: {icon: ProductIconKey;name: string;}) {
  const Mock = mocks[icon];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
      </div>
      <div className="pointer-events-none select-none p-5 opacity-60 blur-[2px]" aria-hidden="true">
        <Mock />
      </div>
      <div className="absolute inset-0 top-10 flex items-center justify-center bg-background/40">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-md">
          <LockIcon className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">{name} · Coming Soon</span>
        </div>
      </div>
    </div>);

}