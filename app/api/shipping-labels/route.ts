import { NextResponse } from "next/server";
import { createLabelSchema, type TemplateId } from "@/lib/shipping-label";
import { renderShippingLabelPdf } from "@/lib/shipping-label-pdf";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const parsed = createLabelSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, message: "Please correct the highlighted fields.", errors: parsed.error.flatten() }, { status: 400 });
    const { templateId, labelData } = parsed.data;
    const rendered = await renderShippingLabelPdf([labelData], templateId as TemplateId);
    const reference = labelData.tracking.referenceNumber.replace(/[^a-z0-9-_]+/gi, "-").slice(0, 60) || "label";
    return NextResponse.json({
      ok: true,
      id: crypto.randomUUID(),
      quantity: labelData.format.quantity,
      pdfBase64: Buffer.from(rendered).toString("base64"),
      filename: `shipping-label-${reference}.pdf`,
      dataDeleted: true,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Shipping label generation failed", error);
    return NextResponse.json({ ok: false, message: "The label could not be generated. Please try again." }, { status: 500 });
  }
}
