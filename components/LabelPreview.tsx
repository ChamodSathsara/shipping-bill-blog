"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { labelTemplates, type LabelData, type TemplateId } from "@/lib/shipping-label";
import { cn } from "@/lib/utils/cn";

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

/**
 * Renders a label at its true paper proportions (template.width x template.height inches)
 * using the user's real form data. It draws at a fixed 96px/inch design size and scales
 * down with CSS transform, so the same component works for big preview AND small thumbnails.
 */
export function LabelPreview({
  data,
  templateId,
  className,
  bordered = true,
}: {
  data: LabelData;
  templateId: TemplateId;
  className?: string;
  bordered?: boolean;
}) {
  const template = labelTemplates.find((t) => t.id === templateId)!;
  const W = template.width * 96;
  const H = template.height * 96;

  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [W]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-white", bordered && "rounded-sm shadow-[0_8px_30px_-8px_rgba(0,0,0,.35)] ring-1 ring-black/10", className)}
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <div
        className="origin-top-left bg-white text-black"
        style={{ width: W, height: H, transform: `scale(${scale})`, fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {templateId === 1 && <Layout1 d={data} />}
        {templateId === 2 && <Layout2 d={data} />}
        {templateId === 3 && <Layout3 d={data} />}
        {templateId === 4 && <Layout4 d={data} />}
        {templateId === 5 && <Layout5 d={data} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function useFields(d: LabelData) {
  const tracking = d.tracking.trackingNumber || "9400 1000 0000 0000 0000 00";
  const heading = d.heading.showHeading ? d.heading.customHeading || `${d.shipping.carrier} ${d.format.serviceLevel}` : "";
  const pkgLine = `${d.package.weight} ${d.package.weightUnit}`;
  const dims = `${d.package.length}x${d.package.width}x${d.package.height} ${d.package.dimensionUnit}`;
  const pieces = d.format.quantity > 1 ? `1 of ${d.format.quantity}` : "1 of 1";
  return { tracking, heading, pkgLine, dims, pieces };
}

/** Decorative barcode, generated from the tracking text (same text = same bars). Not scannable. */
function Barcode({ value, className }: { value: string; className?: string }) {
  const { bars, total } = useMemo(() => {
    let seed = 2166136261;
    for (const ch of value) seed = Math.imul(seed ^ ch.charCodeAt(0), 16777619) >>> 0;
    const rnd = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
    const out: { x: number; w: number }[] = [];
    let x = 0;
    for (let i = 0; i < 70; i++) {
      const w = 1 + Math.floor(rnd() * 4);
      if (i % 2 === 0) out.push({ x, w });
      x += w;
    }
    return { bars: out, total: x };
  }, [value]);
  return (
    <svg viewBox={`0 0 ${total} 10`} preserveAspectRatio="none" className={className} aria-hidden="true">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={10} fill="#000" />
      ))}
    </svg>
  );
}

function Address({ a, size = 18, bold = true, showCountry = false }: { a: LabelData["sender"]; size?: number; bold?: boolean; showCountry?: boolean }) {
  return (
    <div style={{ fontSize: size, lineHeight: 1.25 }}>
      <div style={{ fontWeight: bold ? 800 : 700 }}>{a.name || "Full name"}</div>
      {a.company && <div>{a.company}</div>}
      <div>{a.addressLine1 || "Street address"}</div>
      {a.addressLine2 && <div>{a.addressLine2}</div>}
      <div style={{ fontWeight: bold ? 700 : 400 }}>
        {a.city || "City"}, {a.state || "ST"} {a.zipCode || "00000"}
      </div>
      {showCountry && <div>{a.country}</div>}
      {a.phone && <div style={{ fontSize: size * 0.7, marginTop: 2 }}>{a.phone}</div>}
    </div>
  );
}

function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-bold", className)} style={{ fontSize: 11, letterSpacing: 1 }}>{children}</span>;
}

const fmtDate = (s: string) => {
  const dt = new Date(s);
  return Number.isNaN(dt.getTime()) ? s : dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

/* ------------------------------------------------------------------ */
/* 1. Priority banner – big header band, From/To, footer strip         */
/* ------------------------------------------------------------------ */
function Layout1({ d }: { d: LabelData }) {
  const f = useFields(d);
  return (
    <div className="flex h-full flex-col border-[3px] border-black">
      <div className="flex items-center gap-3 border-b-[3px] border-black px-4 py-3">
        <div className="flex h-12 w-12 items-center justify-center bg-black text-3xl font-black text-white">P</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-2xl font-black leading-none">{f.heading || "PRIORITY MAIL"}</div>
          <div className="mt-1 text-xs font-semibold">{d.shipping.carrier} · {fmtDate(d.format.shipDate)}</div>
        </div>
        <div className="border-2 border-black px-2 py-1 text-center text-xs font-black leading-tight">{f.pkgLine}</div>
      </div>
      <div className="border-b-2 border-black px-4 py-3">
        <Tag>FROM</Tag>
        <Address a={d.sender} size={13} bold={false} />
      </div>
      <div className="flex-1 px-4 py-4">
        <Tag>SHIP TO</Tag>
        <div className="mt-1"><Address a={d.recipient} size={22} showCountry /></div>
      </div>
      <div className="border-t-[3px] border-black px-4 py-3">
        <Barcode value={f.tracking} className="h-16 w-full" />
        <div className="mt-1 text-center font-mono text-xs font-bold tracking-wider">{f.tracking}</div>
      </div>
      <div className="flex items-center justify-between bg-black px-4 py-2 text-xs font-bold text-white">
        <span className="truncate">{d.tracking.handlingInstructions || "HANDLE WITH CARE"}</span>
        <span>{f.pieces}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Side column – details on the left, address on the right          */
/* ------------------------------------------------------------------ */
function Layout2({ d }: { d: LabelData }) {
  const f = useFields(d);
  const Row = ({ k, v }: { k: string; v: string }) => (
    <div className="border-b border-black py-2">
      <div className="text-[10px] font-bold tracking-wider text-neutral-600">{k}</div>
      <div className="text-sm font-black leading-tight">{v || "—"}</div>
    </div>
  );
  return (
    <div className="flex h-full border-[3px] border-black">
      <div className="flex w-[34%] flex-col border-r-[3px] border-black px-3 py-2">
        <Row k="DATE" v={fmtDate(d.format.shipDate)} />
        <Row k="WEIGHT" v={f.pkgLine} />
        <Row k="SIZE" v={f.dims} />
        <Row k="PACKAGE" v={d.package.type.replaceAll("_", " ")} />
        <Row k="REF" v={d.tracking.referenceNumber} />
        <Row k="PIECE" v={f.pieces} />
        <div className="mt-auto flex flex-1 items-end justify-center pb-1">
          <Barcode value={f.tracking} className="h-24 w-full" />
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b-[3px] border-black bg-black px-3 py-2 text-white">
          <div className="truncate text-xl font-black">{f.heading || "PRIORITY MAIL"}</div>
        </div>
        <div className="border-b-2 border-black px-3 py-3">
          <Tag>FROM</Tag>
          <Address a={d.sender} size={12} bold={false} />
        </div>
        <div className="flex-1 px-3 py-3">
          <Tag>TO</Tag>
          <div className="mt-1"><Address a={d.recipient} size={20} showCountry /></div>
        </div>
        <div className="border-t-2 border-black px-3 py-2 text-center font-mono text-[11px] font-bold">{f.tracking}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Split top – barcode+To left, service+From right, details strip   */
/* ------------------------------------------------------------------ */
function Layout3({ d }: { d: LabelData }) {
  const f = useFields(d);
  return (
    <div className="flex h-full flex-col border-[3px] border-black">
      <div className="grid flex-[1.6] grid-cols-[58%_1fr]">
        <div className="flex flex-col border-r-[3px] border-black px-3 py-3">
          <Barcode value={f.tracking} className="h-14 w-full" />
          <div className="mt-1 truncate font-mono text-[10px] font-bold">{f.tracking}</div>
          <div className="mt-3"><Tag>TO</Tag></div>
          <Address a={d.recipient} size={17} showCountry />
        </div>
        <div className="flex flex-col px-3 py-3">
          <div className="bg-black px-2 py-2 text-center text-sm font-black leading-tight text-white">{f.heading || "PRIORITY MAIL"}</div>
          <div className="mt-3"><Tag>FROM</Tag></div>
          <Address a={d.sender} size={11} bold={false} />
          <div className="mt-auto text-[11px] font-bold">{fmtDate(d.format.shipDate)}</div>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 border-t-[3px] border-black">
        <div className="border-r-2 border-black px-3 py-2">
          <Tag>PACKAGE DETAILS</Tag>
          <div className="mt-1 text-xs font-semibold leading-5">
            {d.package.type.replaceAll("_", " ")}<br />{f.pkgLine} · {f.dims}
          </div>
        </div>
        <div className="px-3 py-2">
          <Tag>ADDITIONAL INFO</Tag>
          <div className="mt-1 text-xs font-semibold leading-5">
            Ref: {d.tracking.referenceNumber || "—"}<br />{d.tracking.handlingInstructions || d.shipping.marketplace} · {f.pieces}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Branded – logo block (sender initials), tracking, From / To      */
/* ------------------------------------------------------------------ */
function Layout4({ d }: { d: LabelData }) {
  const f = useFields(d);
  const brand = (d.sender.company || d.sender.name || "Your Brand").trim();
  const initials = brand.split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");
  return (
    <div className="flex h-full flex-col border-[3px] border-black">
      <div className="grid grid-cols-[26%_1fr] border-b-[3px] border-black">
        <div className="flex flex-col items-center justify-center border-r-[3px] border-black bg-neutral-100 py-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-black text-white">{initials}</div>
          <div className="mt-1 max-w-full truncate px-1 text-[10px] font-bold">{brand}</div>
        </div>
        <div className="px-3 py-3">
          <div className="truncate text-lg font-black">{f.heading || "PRIORITY MAIL"}</div>
          <div className="mt-1 text-[10px] font-bold tracking-wider text-neutral-600">TRACKING NUMBER</div>
          <div className="truncate font-mono text-sm font-black">{f.tracking}</div>
          <Barcode value={f.tracking} className="mt-1 h-8 w-full" />
        </div>
      </div>
      <div className="border-b-2 border-black px-4 py-3">
        <Tag>FROM</Tag>
        <Address a={d.sender} size={13} bold={false} />
      </div>
      <div className="flex-1 px-4 py-4">
        <Tag>TO</Tag>
        <div className="mt-1"><Address a={d.recipient} size={22} showCountry /></div>
      </div>
      <div className="flex justify-between border-t-2 border-black px-4 py-2 text-[11px] font-bold">
        <span>{f.pkgLine} · {d.package.type.replaceAll("_", " ")}</span>
        <span>{fmtDate(d.format.shipDate)}</span>
        <span>{f.pieces}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Marketplace 4x6 – minimal top bar, huge ship-to, big barcode     */
/* ------------------------------------------------------------------ */
function Layout5({ d }: { d: LabelData }) {
  const f = useFields(d);
  return (
    <div className="flex h-full flex-col border-[3px] border-black">
      <div className="flex items-center justify-between bg-black px-4 py-2 text-white">
        <span className="text-base font-black tracking-wide">{d.shipping.marketplace === "OTHER" ? d.shipping.carrier : d.shipping.marketplace}</span>
        <span className="text-xs font-bold">{f.heading || d.format.serviceLevel}</span>
      </div>
      <div className="border-b-2 border-black px-4 py-2 text-[11px] leading-snug">
        <b>From:</b> {d.sender.name || "Sender"}, {d.sender.addressLine1 || "Address"}, {d.sender.city || "City"}, {d.sender.state || "ST"} {d.sender.zipCode}
      </div>
      <div className="flex-1 px-4 py-4">
        <Tag>SHIP TO</Tag>
        <div className="mt-1"><Address a={d.recipient} size={26} showCountry /></div>
      </div>
      <div className="grid grid-cols-3 border-y-2 border-black text-center">
        {[["WEIGHT", f.pkgLine], ["REF", d.tracking.referenceNumber || "—"], ["DATE", fmtDate(d.format.shipDate)]].map(([k, v], i) => (
          <div key={k} className={cn("px-2 py-2", i < 2 && "border-r-2 border-black")}>
            <div className="text-[9px] font-bold tracking-wider text-neutral-600">{k}</div>
            <div className="truncate text-sm font-black">{v}</div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3">
        <Barcode value={f.tracking} className="h-20 w-full" />
        <div className="mt-1 text-center font-mono text-xs font-bold tracking-wider">{f.tracking}</div>
      </div>
    </div>
  );
}