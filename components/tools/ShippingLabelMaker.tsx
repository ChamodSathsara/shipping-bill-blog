"use client";

import { useState } from "react";
import {
  CheckIcon,
  DownloadIcon,
  FileSpreadsheetIcon,
  PackageIcon,
  PrinterIcon,
  RotateCcwIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  createDefaultLabelData,
  industryPresets,
  labelDataSchema,
  labelTemplates,
  type LabelData,
  type TemplateId,
} from "@/lib/shipping-label";
import { cn } from "@/lib/utils/cn";
import type { BulkValidationRow } from "@/lib/bulk-labels";
import { LabelPreview } from "@/components/LabelPreview";

type Done = { id: string; pdfUrl: string; quantity: number };
type Errors = Record<string, string>;
const control =
  "mt-1.5 min-h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";
const options = {
  packageType: [
    "BOX",
    "ENVELOPE",
    "TUBE",
    "PALLET",
    "CRATE",
    "INSULATED_BOX",
    "POLY_BAG",
  ],
  weightUnit: ["LB", "OZ", "KG", "G"],
  dimensionUnit: ["IN", "CM", "MM"],
  carrier: ["USPS", "UPS", "FEDEX", "DHL", "GENERIC"],
  marketplace: ["SHOPIFY", "AMAZON", "WALMART", "OTHER"],
  preset: [
    "ECOMMERCE",
    "RETAIL",
    "WHOLESALE",
    "MANUFACTURING",
    "FOOD_BEVERAGE",
    "SHIPPING_TRANSPORTATION",
  ],
  service: [
    "STANDARD",
    "EXPRESS",
    "OVERNIGHT",
    "ECONOMY",
    "PRIORITY",
    "CUSTOM",
  ],
} as const;

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {required && <span className="ml-1 text-destructive">*</span>}
      {children}
      {error && (
        <span className="mt-1 block text-xs font-normal text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

export function ShippingLabelMaker() {
  const [templateId, setTemplateId] = useState<TemplateId>(1);
  const [data, setData] = useState<LabelData>(() => createDefaultLabelData());
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const update = <S extends keyof LabelData, K extends keyof LabelData[S]>(
    section: S,
    key: K,
    value: LabelData[S][K],
  ) => {
    setData((v) => ({ ...v, [section]: { ...v[section], [key]: value } }));
    setDone(null);
    setErrors((v) => {
      const n = { ...v };
      delete n[`${String(section)}.${String(key)}`];
      return n;
    });
  };
  const preset = (value: LabelData["shipping"]["industryPreset"]) => {
    const p = industryPresets[value];
    setData((v) => ({
      ...v,
      shipping: { ...v.shipping, industryPreset: value },
      package: { ...v.package, type: p.packageType },
      tracking: { ...v.tracking, handlingInstructions: p.handling },
    }));
    setDone(null);
  };
  const generate = async () => {
    const valid = labelDataSchema.safeParse(data);
    if (!valid.success) {
      const e: Errors = {};
      valid.error.issues.forEach((i) => (e[i.path.join(".")] ??= i.message));
      setErrors(e);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/shipping-labels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, labelData: valid.data }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setDone(result);
      toast.success("Your label is ready.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Label generation failed");
    } finally {
      setBusy(false);
    }
  };
  const reset = () => {
    setData(createDefaultLabelData());
    setErrors({});
    setDone(null);
    setTemplateId(1);
  };

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-bold text-primary">Step 1</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold">
          Choose a shipping label template
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {labelTemplates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setTemplateId(t.id);
                setDone(null);
              }}
              className={cn(
                "relative rounded-xl border p-3 text-left",
                templateId === t.id
                  ? "border-primary bg-accent ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/50",
              )}
            >
              {templateId === t.id && (
                <CheckIcon className="absolute right-2 top-2 z-10 h-4 w-4 rounded-full bg-white text-primary" />
              )}
              <div className="mb-3 rounded-lg bg-muted/60 p-3">
                <LabelPreview
                  data={data}
                  templateId={t.id}
                  className="pointer-events-none mx-auto max-w-[140px]"
                />
              </div>
              <b className="block">{t.name}</b>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                {t.description}
              </span>
              <span className="mt-1 block text-[11px] font-semibold text-primary">
                {t.width} × {t.height} in
              </span>
            </button>
          ))}
        </div>
      </section>
      <div className="grid items-start gap-8 xl:grid-cols-[1.15fr_.85fr]">
        <div className="space-y-6">
          <div>
            <p className="text-sm font-bold text-primary">Step 2</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold">
              Enter shipping details
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The preview updates instantly. Data is saved only when you
              generate.
            </p>
          </div>
          <Address
            title="Sender"
            section="sender"
            data={data}
            errors={errors}
            update={update}
          />
          <Address
            title="Recipient"
            section="recipient"
            data={data}
            errors={errors}
            update={update}
          />
          <Box title="Package">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Select
                label="Package type"
                value={data.package.type}
                values={options.packageType}
                onChange={(v) =>
                  update("package", "type", v as LabelData["package"]["type"])
                }
              />
              <NumberField
                label="Weight"
                value={data.package.weight}
                error={errors["package.weight"]}
                onChange={(v) => update("package", "weight", v)}
              />
              <Select
                label="Weight unit"
                value={data.package.weightUnit}
                values={options.weightUnit}
                onChange={(v) =>
                  update(
                    "package",
                    "weightUnit",
                    v as LabelData["package"]["weightUnit"],
                  )
                }
              />
              <Select
                label="Dimension unit"
                value={data.package.dimensionUnit}
                values={options.dimensionUnit}
                onChange={(v) =>
                  update(
                    "package",
                    "dimensionUnit",
                    v as LabelData["package"]["dimensionUnit"],
                  )
                }
              />
              {(["length", "width", "height"] as const).map((k) => (
                <NumberField
                  key={k}
                  label={k[0].toUpperCase() + k.slice(1)}
                  value={data.package[k]}
                  error={errors[`package.${k}`]}
                  onChange={(v) => update("package", k, v)}
                />
              ))}
            </div>
          </Box>
          <Box title="Shipping & format">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Select
                label="Industry preset"
                value={data.shipping.industryPreset}
                values={options.preset}
                onChange={(v) =>
                  preset(v as LabelData["shipping"]["industryPreset"])
                }
              />
              <Select
                label="Carrier"
                value={data.shipping.carrier}
                values={options.carrier}
                onChange={(v) =>
                  update(
                    "shipping",
                    "carrier",
                    v as LabelData["shipping"]["carrier"],
                  )
                }
              />
              <Select
                label="Marketplace"
                value={data.shipping.marketplace}
                values={options.marketplace}
                onChange={(v) =>
                  update(
                    "shipping",
                    "marketplace",
                    v as LabelData["shipping"]["marketplace"],
                  )
                }
              />
              <Select
                label="Service"
                value={data.format.serviceLevel}
                values={options.service}
                onChange={(v) =>
                  update(
                    "format",
                    "serviceLevel",
                    v as LabelData["format"]["serviceLevel"],
                  )
                }
              />
              <Field
                label="Ship date"
                required
                error={errors["format.shipDate"]}
              >
                <input
                  className={control}
                  type="date"
                  value={data.format.shipDate}
                  onChange={(e) => update("format", "shipDate", e.target.value)}
                />
              </Field>
              <NumberField
                label="Packages / copies"
                value={data.format.quantity}
                error={errors["format.quantity"]}
                min={1}
                max={100}
                step={1}
                onChange={(v) => update("format", "quantity", v)}
              />
            </div>
          </Box>
          <Box title="Tracking & heading">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                label="Tracking number"
                value={data.tracking.trackingNumber}
                onChange={(v) => update("tracking", "trackingNumber", v)}
              />
              <TextField
                label="Reference number"
                value={data.tracking.referenceNumber}
                onChange={(v) => update("tracking", "referenceNumber", v)}
              />
              <TextField
                label="Custom heading"
                value={data.heading.customHeading}
                disabled={!data.heading.showHeading}
                onChange={(v) => update("heading", "customHeading", v)}
              />
              <TextField
                label="Handling instructions"
                value={data.tracking.handlingInstructions}
                onChange={(v) => update("tracking", "handlingInstructions", v)}
              />
              <label className="flex min-h-11 items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={data.heading.showHeading}
                  onChange={(e) =>
                    update("heading", "showHeading", e.target.checked)
                  }
                  className="h-4 w-4 accent-primary"
                />
                Show heading
              </label>
            </div>
          </Box>
        </div>
        <aside className="xl:sticky xl:top-24">
          <div className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-6">
            <p className="mb-4 text-sm font-bold text-primary">Live preview</p>
            <LabelPreview
              data={data}
              templateId={templateId}
              className="mx-auto max-w-[360px]"
            />
          </div>
          <div className="mt-5 rounded-xl border border-border bg-card p-5">
            <button
              type="button"
              onClick={generate}
              disabled={busy}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 font-bold text-primary-foreground disabled:opacity-60"
            >
              <PackageIcon className="h-5 w-5" />
              {busy ? "Generating…" : "Generate label"}
            </button>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">
              Custom printable label only. Postage and official carrier tracking
              are not included.
            </p>
            {done && (
              <div className="mt-5 border-t border-border pt-5">
                <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
                  <CheckIcon className="h-4 w-4" />
                  Label #{done.id} is ready
                </p>
                <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
                  <a
                    href={done.pdfUrl}
                    target="_blank"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-bold text-primary-foreground"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    PDF
                  </a>
                  <button
                    onClick={() =>
                      window.open(done.pdfUrl, "_blank", "noopener,noreferrer")
                    }
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold"
                  >
                    <PrinterIcon className="h-4 w-4" />
                    Print
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold"
                  >
                    <RotateCcwIcon className="h-4 w-4" />
                    New
                  </button>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
      <BulkSection templateId={templateId} />
    </div>
  );
}

function BulkSection({ templateId }: { templateId: TemplateId }) {
  const [rows, setRows] = useState<BulkValidationRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const upload = async (file: File) => {
    setBusy(true);
    setPdfUrl(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const response = await fetch("/api/shipping-labels/bulk/validate", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setRows(result.rows);
      toast.success(
        `${result.valid} valid rows, ${result.invalid} need attention.`,
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };
  const generate = async () => {
    const labels = rows
      .filter((r) => r.status === "valid" && r.labelData)
      .map((r) => r.labelData);
    if (!labels.length) return;
    setBusy(true);
    try {
      const response = await fetch("/api/shipping-labels/bulk/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId, labels }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      const bytes = Uint8Array.from(atob(result.pdfBase64), (c) =>
        c.charCodeAt(0),
      );
      const url = URL.createObjectURL(
        new Blob([bytes], { type: "application/pdf" }),
      );
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(url);
      toast.success(`${result.generated} labels generated.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Bulk generation failed");
    } finally {
      setBusy(false);
    }
  };
  const valid = rows.filter((r) => r.status === "valid").length,
    invalid = rows.length - valid;
  return (
    <section
      id="bulk-labels"
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <FileSpreadsheetIcon className="h-4 w-4" />
            Bulk generate
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold">
            Create up to 50 labels from Excel
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Download the controlled template, fill one shipment per row, then
            upload and validate it.
          </p>
        </div>
        <a
          href="/api/shipping-labels/bulk/template"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-4 text-sm font-bold"
        >
          <DownloadIcon className="h-4 w-4" />
          Download Excel template
        </a>
      </div>
      <label className="mt-6 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-6 text-center hover:border-primary">
        <UploadIcon className="h-6 w-6 text-primary" />
        <span className="mt-2 text-sm font-bold">
          {busy ? "Processing…" : "Upload completed .xlsx file"}
        </span>
        <span className="mt-1 text-xs text-muted-foreground">
          Maximum 50 labels per generation
        </span>
        <input
          type="file"
          accept=".xlsx"
          className="sr-only"
          disabled={busy}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void upload(f);
            e.currentTarget.value = "";
          }}
        />
      </label>
      {rows.length > 0 && (
        <>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-muted px-3 py-1 font-bold">
              {rows.length} uploaded
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-800">
              ✓ {valid} valid
            </span>
            <span className="rounded-full bg-red-100 px-3 py-1 font-bold text-red-800">
              ✕ {invalid} invalid
            </span>
          </div>
          <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3">Row</th>
                  <th className="p-3">Recipient</th>
                  <th className="p-3">Tracking</th>
                  <th className="p-3">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.rowNumber} className="border-t border-border">
                    <td className="p-3">{row.rowNumber}</td>
                    <td className="p-3 font-semibold">{row.recipient}</td>
                    <td className="p-3 font-mono text-xs">{row.tracking}</td>
                    <td className="p-3">
                      {row.status === "valid" ? (
                        <span className="text-green-700">Ready</span>
                      ) : (
                        <span
                          className="text-destructive"
                          title={row.errors.join("\n")}
                        >
                          {row.errors[0]}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <button
                        aria-label={`Delete row ${row.rowNumber}`}
                        onClick={() =>
                          setRows((v) =>
                            v.filter((r) => r.rowNumber !== row.rowNumber),
                          )
                        }
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              disabled={!valid || busy}
              onClick={generate}
              className="min-h-11 rounded-lg bg-primary px-5 text-sm font-bold text-primary-foreground disabled:opacity-50"
            >
              {busy ? "Generating…" : `Generate ${valid} valid labels`}
            </button>
            {pdfUrl && (
              <>
                <a
                  href={pdfUrl}
                  download="shipping-labels.pdf"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-bold"
                >
                  <DownloadIcon className="h-4 w-4" />
                  Combined PDF
                </a>
                <button
                  onClick={() =>
                    window.open(pdfUrl, "_blank", "noopener,noreferrer")
                  }
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-bold"
                >
                  <PrinterIcon className="h-4 w-4" />
                  Print all
                </button>
              </>
            )}
          </div>
        </>
      )}
    </section>
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
function Select({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <Field label={label}>
      <select
        className={control}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((v) => (
          <option key={v} value={v}>
            {v.replaceAll("_", " ")}
          </option>
        ))}
      </select>
    </Field>
  );
}
function TextField({
  label,
  value,
  onChange,
  error,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <Field label={label} error={error}>
      <input
        className={control}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}
function NumberField({
  label,
  value,
  onChange,
  error,
  min = 0.01,
  max,
  step = 0.01,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  error?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <Field label={label} required error={error}>
      <input
        className={control}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Field>
  );
}
function Address({
  title,
  section,
  data,
  errors,
  update,
}: {
  title: string;
  section: "sender" | "recipient";
  data: LabelData;
  errors: Errors;
  update: <S extends keyof LabelData, K extends keyof LabelData[S]>(
    s: S,
    k: K,
    v: LabelData[S][K],
  ) => void;
}) {
  const a = data[section];
  return (
    <Box title={title}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full name *"
          value={a.name}
          error={errors[`${section}.name`]}
          onChange={(v) => update(section, "name", v)}
        />
        <TextField
          label="Company"
          value={a.company}
          onChange={(v) => update(section, "company", v)}
        />
        <div className="sm:col-span-2">
          <TextField
            label="Address line 1 *"
            value={a.addressLine1}
            error={errors[`${section}.addressLine1`]}
            onChange={(v) => update(section, "addressLine1", v)}
          />
        </div>
        <div className="sm:col-span-2">
          <TextField
            label="Address line 2"
            value={a.addressLine2}
            onChange={(v) => update(section, "addressLine2", v)}
          />
        </div>
        <TextField
          label="City *"
          value={a.city}
          error={errors[`${section}.city`]}
          onChange={(v) => update(section, "city", v)}
        />
        <TextField
          label="State / province *"
          value={a.state}
          error={errors[`${section}.state`]}
          onChange={(v) => update(section, "state", v)}
        />
        <TextField
          label="ZIP / postal code *"
          value={a.zipCode}
          error={errors[`${section}.zipCode`]}
          onChange={(v) => update(section, "zipCode", v)}
        />
        <TextField
          label="Country code *"
          value={a.country}
          error={errors[`${section}.country`]}
          onChange={(v) =>
            update(section, "country", v.toUpperCase().slice(0, 2))
          }
        />
        <TextField
          label="Phone"
          value={a.phone}
          onChange={(v) => update(section, "phone", v)}
        />
      </div>
    </Box>
  );
}
