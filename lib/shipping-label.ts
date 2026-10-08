import { z } from "zod";

export const labelTemplates = [
  { id: 1, code: "MARKETPLACE_4X6", name: "Marketplace", description: "Marketplace order with a bold delivery card", width: 4, height: 6, layout: "marketplace" },
  { id: 2, code: "MINIMAL_MONO_4X6", name: "Minimal Mono", description: "Monochrome postal layout with large ZIP", width: 4, height: 6, layout: "minimal-mono" },
  { id: 3, code: "CLEAN_HIERARCHY_4X6", name: "Clean Hierarchy", description: "Address-first layout with strong hierarchy", width: 4, height: 6, layout: "clean-hierarchy" },
  { id: 4, code: "SIMPLE_LIST_4X6", name: "Simple List", description: "Clear two-column shipment summary", width: 4, height: 6, layout: "simple-list" },
  { id: 5, code: "STANDARD_BARCODE_4X6", name: "Standard Barcode", description: "Classic shipping data with barcode", width: 4, height: 6, layout: "standard-barcode" },
] as const;

export type TemplateId = (typeof labelTemplates)[number]["id"];

const addressSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(150),
  company: z.string().trim().max(200),
  addressLine1: z.string().trim().min(1, "Address line 1 is required").max(255),
  addressLine2: z.string().trim().max(255),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  zipCode: z.string().trim().min(1, "ZIP/postal code is required").max(30),
  country: z.string().trim().length(2, "Use a two-letter country code").transform((value) => value.toUpperCase()),
  phone: z.string().trim().max(50),
});

export const labelDataSchema = z.object({
  sender: addressSchema,
  recipient: addressSchema,
  package: z.object({
    type: z.enum(["BOX", "ENVELOPE", "TUBE", "PALLET", "CRATE", "INSULATED_BOX", "POLY_BAG"]),
    weight: z.coerce.number().positive("Weight must be greater than zero"),
    weightUnit: z.enum(["LB", "OZ", "KG", "G"]),
    dimensionUnit: z.enum(["IN", "CM", "MM"]),
    length: z.coerce.number().positive("Length must be greater than zero"),
    width: z.coerce.number().positive("Width must be greater than zero"),
    height: z.coerce.number().positive("Height must be greater than zero"),
  }),
  shipping: z.object({
    carrier: z.enum(["USPS", "UPS", "FEDEX", "DHL", "GENERIC"]),
    marketplace: z.enum(["SHOPIFY", "AMAZON", "WALMART", "OTHER"]),
    industryPreset: z.enum(["ECOMMERCE", "RETAIL", "WHOLESALE", "MANUFACTURING", "FOOD_BEVERAGE", "SHIPPING_TRANSPORTATION"]),
  }),
  format: z.object({
    serviceLevel: z.enum(["STANDARD", "EXPRESS", "OVERNIGHT", "ECONOMY", "PRIORITY", "CUSTOM"]),
    labelFormat: z.enum(["4X6", "3X4"]),
    shipDate: z.string().date("Enter a valid ship date"),
    quantity: z.coerce.number().int().min(1).max(100),
  }),
  heading: z.object({ showHeading: z.boolean(), customHeading: z.string().trim().max(150) }),
  tracking: z.object({
    trackingNumber: z.string().trim().max(150),
    referenceNumber: z.string().trim().max(100),
    handlingInstructions: z.string().trim().max(1000),
  }),
});

export const createLabelSchema = z.object({
  templateId: z.coerce.number().int().min(1).max(5),
  labelData: labelDataSchema,
});

export type LabelData = z.infer<typeof labelDataSchema>;
export type CreateLabelInput = z.infer<typeof createLabelSchema>;

export function createDefaultLabelData(): LabelData {
  return {
    sender: { name: "", company: "", addressLine1: "", addressLine2: "", city: "", state: "", zipCode: "", country: "US", phone: "" },
    recipient: { name: "", company: "", addressLine1: "", addressLine2: "", city: "", state: "", zipCode: "", country: "US", phone: "" },
    package: { type: "BOX", weight: 1, weightUnit: "LB", dimensionUnit: "IN", length: 10, width: 8, height: 6 },
    shipping: { carrier: "USPS", marketplace: "SHOPIFY", industryPreset: "ECOMMERCE" },
    format: { serviceLevel: "STANDARD", labelFormat: "4X6", shipDate: new Date().toISOString().slice(0, 10), quantity: 1 },
    heading: { showHeading: true, customHeading: "" },
    tracking: { trackingNumber: "", referenceNumber: "", handlingInstructions: "" },
  };
}

export const industryPresets: Record<LabelData["shipping"]["industryPreset"], { packageType: LabelData["package"]["type"]; handling: string }> = {
  ECOMMERCE: { packageType: "POLY_BAG", handling: "Keep dry" },
  RETAIL: { packageType: "BOX", handling: "Handle with care" },
  WHOLESALE: { packageType: "BOX", handling: "Keep dry" },
  MANUFACTURING: { packageType: "CRATE", handling: "Heavy item — handle with care" },
  FOOD_BEVERAGE: { packageType: "INSULATED_BOX", handling: "Perishable — keep refrigerated" },
  SHIPPING_TRANSPORTATION: { packageType: "PALLET", handling: "Do not stack" },
};
