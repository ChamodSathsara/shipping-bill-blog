import { createDefaultLabelData, labelDataSchema, type LabelData } from "./shipping-label";

export const bulkColumns = [
  "sender_name","sender_company","sender_address_1","sender_address_2","sender_city","sender_state","sender_zip","sender_country","sender_phone",
  "recipient_name","recipient_company","recipient_address_1","recipient_address_2","recipient_city","recipient_state","recipient_zip","recipient_country","recipient_phone",
  "package_type","weight","weight_unit","length","width","height","dimension_unit","carrier","marketplace","industry_preset","service_level","ship_date","quantity","tracking_number","reference_number","handling_instructions",
] as const;

export type BulkSheetRecord = Record<string, unknown>;
export type BulkValidationRow = { rowNumber: number; recipient: string; tracking: string; status: "valid" | "invalid"; errors: string[]; labelData?: LabelData };

const text = (value: unknown, fallback = "") => value == null ? fallback : String(value).trim();
const number = (value: unknown, fallback: number) => value === "" || value == null ? fallback : Number(value);
const date = (value: unknown) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const raw = text(value);
  const parsed = raw ? new Date(raw) : new Date();
  return Number.isNaN(parsed.getTime()) ? raw : parsed.toISOString().slice(0, 10);
};

export function recordToLabelData(record: BulkSheetRecord): LabelData {
  const defaults = createDefaultLabelData();
  return {
    sender: { name: text(record.sender_name), company: text(record.sender_company), addressLine1: text(record.sender_address_1), addressLine2: text(record.sender_address_2), city: text(record.sender_city), state: text(record.sender_state), zipCode: text(record.sender_zip), country: text(record.sender_country, "US").toUpperCase(), phone: text(record.sender_phone) },
    recipient: { name: text(record.recipient_name), company: text(record.recipient_company), addressLine1: text(record.recipient_address_1), addressLine2: text(record.recipient_address_2), city: text(record.recipient_city), state: text(record.recipient_state), zipCode: text(record.recipient_zip), country: text(record.recipient_country, "US").toUpperCase(), phone: text(record.recipient_phone) },
    package: { type: text(record.package_type, "BOX").toUpperCase() as LabelData["package"]["type"], weight: number(record.weight, 1), weightUnit: text(record.weight_unit, "LB").toUpperCase() as LabelData["package"]["weightUnit"], length: number(record.length, 10), width: number(record.width, 8), height: number(record.height, 6), dimensionUnit: text(record.dimension_unit, "IN").toUpperCase() as LabelData["package"]["dimensionUnit"] },
    shipping: { carrier: text(record.carrier, "GENERIC").toUpperCase() as LabelData["shipping"]["carrier"], marketplace: text(record.marketplace, "OTHER").toUpperCase() as LabelData["shipping"]["marketplace"], industryPreset: text(record.industry_preset, "ECOMMERCE").toUpperCase() as LabelData["shipping"]["industryPreset"] },
    format: { serviceLevel: text(record.service_level, "STANDARD").toUpperCase() as LabelData["format"]["serviceLevel"], labelFormat: defaults.format.labelFormat, shipDate: date(record.ship_date), quantity: number(record.quantity, 1) },
    heading: defaults.heading,
    tracking: { trackingNumber: text(record.tracking_number), referenceNumber: text(record.reference_number), handlingInstructions: text(record.handling_instructions) },
  };
}

export function validateBulkRecord(record: BulkSheetRecord, rowNumber: number): BulkValidationRow {
  const candidate = recordToLabelData(record);
  const parsed = labelDataSchema.safeParse(candidate);
  if (parsed.success) return { rowNumber, recipient: parsed.data.recipient.name, tracking: parsed.data.tracking.trackingNumber, status: "valid", errors: [], labelData: parsed.data };
  return { rowNumber, recipient: candidate.recipient.name || "—", tracking: candidate.tracking.trackingNumber || "—", status: "invalid", errors: parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`) };
}
