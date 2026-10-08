"use client";
import { useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  PlusIcon,
  PrinterIcon,
  RotateCcwIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  createDefaultPackingSlip,
  packingSlipSchema,
  packingSlipTemplates,
  type PackingSlipData,
  type PackingTemplateCode,
} from "@/lib/packing-slip";
import { cn } from "@/lib/utils/cn";

type Errors = Record<string, string>;
type Done = { id: string; pdfBase64: string; filename: string };
const input =
  "mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function openSystemPrintDialog(pdfUrl: string) {
  const printWindow = window.open(pdfUrl, "_blank");
  if (!printWindow) {
    toast.error("Allow pop-ups for this site to open the print dialog.");
    return;
  }
  let opened = false;
  const print = () => {
    if (opened || printWindow.closed) return;
    opened = true;
    printWindow.focus();
    printWindow.print();
  };
  printWindow.addEventListener("load", () => window.setTimeout(print, 500), {
    once: true,
  });
  window.setTimeout(print, 1800);
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
      {error && (
        <span className="mt-1 block text-xs font-normal text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
function Box({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-xl border border-border bg-card p-5">
      <legend className="px-2 font-display text-lg font-bold">{title}</legend>
      {children}
    </fieldset>
  );
}
function Thumb({ code }: { code: PackingTemplateCode }) {
  return (
    <div
      className={cn(
        "mb-3 aspect-[4/3] border border-slate-400 bg-white p-2 text-[5px] text-black",
        code === "MODERN" && "border-t-8 border-t-teal-700",
        code === "BRANDED" && "bg-slate-50",
      )}
    >
      <div className="flex justify-between">
        <b className="text-[8px]">
          {code === "BRANDED" ? "LOGO" : "PACKING SLIP"}
        </b>
        <span>ORDER #</span>
      </div>
      <hr className="my-1 border-black" />
      <div className="grid grid-cols-2 gap-2">
        <span>
          <b>FROM</b>
          <br />
          Seller address
        </span>
        <span>
          <b>SHIP TO</b>
          <br />
          Customer address
        </span>
      </div>
      <div className="mt-2 border-y border-black py-1">
        <b>SKU&nbsp;&nbsp; DESCRIPTION&nbsp;&nbsp; QTY</b>
      </div>
      <div>
        Item 1<br />
        Item 2
      </div>
    </div>
  );
}
function Preview({ d }: { d: PackingSlipData }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[210/297] w-full max-w-[420px] overflow-hidden border bg-white p-5 text-[9px] text-slate-950 shadow-xl",
        d.templateCode === "MODERN" && "border-t-[12px] border-t-teal-700",
        d.templateCode === "COMPACT" && "text-[8px]",
      )}
    >
      <span className="absolute bottom-2 right-2 rounded bg-slate-100 px-1.5 py-0.5 text-[7px] font-bold text-slate-500">
        {d.paperSize}
      </span>
      <div className="flex items-start justify-between">
        {d.showLogo && d.logoDataUrl ? (
          <img
            src={d.logoDataUrl}
            alt="Business logo preview"
            className="h-10 max-w-24 object-contain"
          />
        ) : (
          <b className="text-lg">{d.customHeading}</b>
        )}
        <div className="text-right">
          <b>{d.orderNumber || "ORDER #"}</b>
          <br />
          {d.orderDate}
          {d.slipNumber && (
            <>
              <br />
              {d.slipNumber}
            </>
          )}
        </div>
      </div>
      {d.showLogo && d.logoDataUrl && (
        <h3 className="mt-2 text-base font-black">{d.customHeading}</h3>
      )}
      <hr className="my-3 border-slate-900" />
      <div className="grid grid-cols-2 gap-4">
        <AddressPreview title="FROM" a={d.sender} />
        <AddressPreview title="SHIP TO" a={d.recipient} />
      </div>
      <table className="mt-5 w-full">
        <thead className="bg-teal-700 text-white">
          <tr>
            {d.showSku && <th className="p-1 text-left">SKU</th>}
            <th className="p-1 text-left">DESCRIPTION</th>
            {d.showVariant && <th className="p-1 text-left">VARIANT</th>}
            {d.showQuantity && <th className="p-1 text-right">QTY</th>}
          </tr>
        </thead>
        <tbody>
          {d.items.map((item, i) => (
            <tr className="border-b" key={i}>
              {d.showSku && <td className="p-1">{item.sku || "—"}</td>}
              <td className="p-1 font-semibold">
                {item.description || "Item description"}
              </td>
              {d.showVariant && <td className="p-1">{item.variant || "—"}</td>}
              {d.showQuantity && (
                <td className="p-1 text-right">{item.quantity}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {d.specialInstructions && (
        <p className="mt-4">
          <b>Instructions:</b> {d.specialInstructions}
        </p>
      )}
      {d.customerMessage && (
        <p className="mt-4 font-bold">{d.customerMessage}</p>
      )}
      <p className="mt-6 text-center text-slate-500">{d.footerText}</p>
    </div>
  );
}
function AddressPreview({
  title,
  a,
}: {
  title: string;
  a: PackingSlipData["sender"];
}) {
  return (
    <div>
      <b>{title}</b>
      <br />
      <strong>{a.name || "Name"}</strong>
      <br />
      {a.company}
      <br />
      {a.addressLine1 || "Address"}
      <br />
      {a.addressLine2}
      <br />
      {a.city || "City"}, {a.state || "State"} {a.zipCode || "ZIP"}
    </div>
  );
}

export function PackingSlipGenerator() {
  const [d, setD] = useState(createDefaultPackingSlip);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const update = <K extends keyof PackingSlipData>(
    k: K,
    v: PackingSlipData[K],
  ) => {
    setD((x) => ({ ...x, [k]: v }));
    setDone(null);
  };
  const nested = (
    s: "sender" | "recipient",
    k: keyof PackingSlipData["sender"],
    v: string,
  ) => setD((x) => ({ ...x, [s]: { ...x[s], [k]: v } }));
  const item = (
    i: number,
    k: keyof PackingSlipData["items"][number],
    v: string | number,
  ) =>
    setD((x) => ({
      ...x,
      items: x.items.map((a, n) => (n === i ? { ...a, [k]: v } : a)),
    }));
  const blob = () => {
    if (!done) return null;
    const bytes = Uint8Array.from(atob(done.pdfBase64), (c) => c.charCodeAt(0));
    return URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
  };
  const generate = async () => {
    const p = packingSlipSchema.safeParse(d);
    if (!p.success) {
      const e: Errors = {};
      p.error.issues.forEach((i) => (e[i.path.join(".")] ??= i.message));
      setErrors(e);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/packing-slips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p.data),
      });
      const result = await r.json();
      if (!r.ok) throw new Error(result.message);
      setDone(result);
      toast.success("Packing slip is ready.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-bold text-primary">Step 1</p>
        <h2 className="font-display text-2xl font-extrabold">
          Choose a packing slip template
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {packingSlipTemplates.map((t) => (
            <button
              key={t.code}
              onClick={() => update("templateCode", t.code)}
              className={cn(
                "relative rounded-xl border p-3 text-left",
                d.templateCode === t.code
                  ? "border-primary bg-accent ring-2 ring-primary/20"
                  : "bg-card",
              )}
            >
              {d.templateCode === t.code && (
                <CheckIcon className="absolute right-2 top-2 h-4 w-4 text-primary" />
              )}
              <Thumb code={t.code} />
              <b>{t.name}</b>
              <span className="block text-xs text-muted-foreground">
                {t.description}
              </span>
            </button>
          ))}
        </div>
      </section>
      <div className="grid items-start gap-8 xl:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <Box title="Order information">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Text
                label="Order number *"
                value={d.orderNumber}
                error={errors.orderNumber}
                onChange={(v) => update("orderNumber", v)}
              />
              <Field label="Order date">
                <input
                  type="date"
                  className={input}
                  value={d.orderDate}
                  onChange={(e) => update("orderDate", e.target.value)}
                />
              </Field>
              <Text
                label="Packing slip number"
                value={d.slipNumber}
                onChange={(v) => update("slipNumber", v)}
              />
              <Field label="Paper size">
                <select
                  className={input}
                  value={d.paperSize}
                  onChange={(e) =>
                    update("paperSize", e.target.value as "A4" | "A5")
                  }
                >
                  <option value="A4">A4 (210 × 297 mm)</option>
                  <option value="A5">A5 (148 × 210 mm)</option>
                </select>
              </Field>
            </div>
          </Box>
          <AddressForm
            title="Sender"
            section="sender"
            d={d}
            errors={errors}
            change={nested}
          />
          <AddressForm
            title="Ship to"
            section="recipient"
            d={d}
            errors={errors}
            change={nested}
          />
          <Box title="Items">
            <div className="space-y-3">
              {d.items.map((it, i) => (
                <div
                  key={i}
                  className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_2fr_1fr_90px_auto]"
                >
                  <Text
                    label="SKU"
                    value={it.sku}
                    onChange={(v) => item(i, "sku", v)}
                  />
                  <Text
                    label="Description *"
                    value={it.description}
                    error={errors[`items.${i}.description`]}
                    onChange={(v) => item(i, "description", v)}
                  />
                  <Text
                    label="Variant"
                    value={it.variant}
                    onChange={(v) => item(i, "variant", v)}
                  />
                  <Field label="Qty">
                    <input
                      className={input}
                      type="number"
                      min="1"
                      value={it.quantity}
                      onChange={(e) =>
                        item(i, "quantity", Number(e.target.value))
                      }
                    />
                  </Field>
                  <div className="flex items-end gap-1">
                    <button
                      title="Duplicate"
                      className="mb-1 p-2"
                      onClick={() => update("items", [...d.items, { ...it }])}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </button>
                    <button
                      title="Delete"
                      disabled={d.items.length === 1}
                      className="mb-1 p-2 disabled:opacity-30"
                      onClick={() =>
                        update(
                          "items",
                          d.items.filter((_, n) => n !== i),
                        )
                      }
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 text-sm font-bold"
              onClick={() =>
                update("items", [
                  ...d.items,
                  { sku: "", description: "", variant: "", quantity: 1 },
                ])
              }
            >
              <PlusIcon className="h-4 w-4" />
              Add item
            </button>
          </Box>
          <Box title="Branding, display & messages">
            <div className="grid gap-4 sm:grid-cols-2">
              <Text
                label="Custom heading"
                value={d.customHeading}
                onChange={(v) => update("customHeading", v)}
              />
              <Field label="Business logo">
                <span className="mt-1.5 flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3">
                  <UploadIcon className="h-4 w-4" />
                  Upload PNG/JPG
                  <input
                    className="sr-only"
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f && f.size < 1000000) {
                        const reader = new FileReader();
                        reader.onload = () =>
                          update("logoDataUrl", String(reader.result));
                        reader.readAsDataURL(f);
                      } else if (f) toast.error("Logo must be under 1 MB");
                    }}
                  />
                </span>
              </Field>
              {(
                ["showSku", "showVariant", "showQuantity", "showLogo"] as const
              ).map((k) => (
                <label
                  key={k}
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <input
                    type="checkbox"
                    checked={d[k]}
                    onChange={(e) => update(k, e.target.checked)}
                  />
                  {k.replace(/([A-Z])/g, " $1")}
                </label>
              ))}
              <div className="sm:col-span-2">
                <Text
                  label="Special instructions"
                  value={d.specialInstructions}
                  onChange={(v) => update("specialInstructions", v)}
                />
              </div>
              <Text
                label="Customer message"
                value={d.customerMessage}
                onChange={(v) => update("customerMessage", v)}
              />
              <Text
                label="Footer text"
                value={d.footerText}
                onChange={(v) => update("footerText", v)}
              />
            </div>
          </Box>
        </div>
        <aside className="xl:sticky xl:top-24">
          <div className="rounded-2xl border bg-muted/40 p-4">
            <p className="mb-3 text-sm font-bold text-primary">Live preview</p>
            <Preview d={d} />
          </div>
          <div className="mt-5 rounded-xl border bg-card p-5">
            <button
              disabled={busy}
              onClick={generate}
              className="min-h-12 w-full rounded-lg bg-primary font-bold text-primary-foreground disabled:opacity-50"
            >
              {busy ? "Generating…" : "Generate packing slip"}
            </button>
            {done && (
              <div className="mt-4 grid gap-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                <button
                  onClick={() => {
                    const u = blob();
                    if (u) {
                      const a = document.createElement("a");
                      a.href = u;
                      a.download = done.filename;
                      a.click();
                    }
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-primary-foreground"
                >
                  <DownloadIcon className="h-4 w-4" />
                  PDF
                </button>
                <button
                  onClick={() => {
                    const u = blob();
                    if (u) openSystemPrintDialog(u);
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border text-sm font-bold"
                >
                  <PrinterIcon className="h-4 w-4" />
                  Print
                </button>
                <button
                  onClick={() => {
                    setD(createDefaultPackingSlip());
                    setDone(null);
                  }}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border text-sm font-bold"
                >
                  <RotateCcwIcon className="h-4 w-4" />
                  New
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
function Text({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <input
        className={input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}
function AddressForm({
  title,
  section,
  d,
  errors,
  change,
}: {
  title: string;
  section: "sender" | "recipient";
  d: PackingSlipData;
  errors: Errors;
  change: (
    s: "sender" | "recipient",
    k: keyof PackingSlipData["sender"],
    v: string,
  ) => void;
}) {
  const a = d[section];
  return (
    <Box title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["name", "Name *"],
            ["company", "Company"],
            ["addressLine1", "Address line 1 *"],
            ["addressLine2", "Address line 2"],
            ["city", "City *"],
            ["state", "State *"],
            ["zipCode", "ZIP *"],
            ["country", "Country code *"],
            ["phone", "Phone"],
          ] as const
        ).map(([k, l]) => (
          <Text
            key={k}
            label={l}
            value={a[k]}
            error={errors[`${section}.${k}`]}
            onChange={(v) =>
              change(
                section,
                k,
                k === "country" ? v.toUpperCase().slice(0, 2) : v,
              )
            }
          />
        ))}
      </div>
    </Box>
  );
}
