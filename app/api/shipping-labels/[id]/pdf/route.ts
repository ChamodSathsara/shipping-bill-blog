import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import { sql } from "@/lib/db";
import { labelTemplates } from "@/lib/shipping-label";

export const dynamic = "force-dynamic";

function clean(value: unknown) {
  return value == null ? "" : String(value);
}

function safeFilePart(value: string) {
  return value.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "").slice(0, 60) || "label";
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!/^\d+$/.test(id)) return NextResponse.json({ message: "Invalid label id" }, { status: 400 });

    const templateId = Number(new URL(request.url).searchParams.get("template") ?? 1);
    const template = labelTemplates.find((item) => item.id === templateId) ?? labelTemplates[0];

    const [label] = await sql`
      SELECT
        sl.*,
        fa.full_name AS from_name, fa.company_name AS from_company,
        fa.address_line_1 AS from_line_1, fa.address_line_2 AS from_line_2,
        fa.city AS from_city, fa.state AS from_state, fa.postal_code AS from_postal,
        fa.country_code AS from_country, fa.phone AS from_phone,
        ta.full_name AS to_name, ta.company_name AS to_company,
        ta.address_line_1 AS to_line_1, ta.address_line_2 AS to_line_2,
        ta.city AS to_city, ta.state AS to_state, ta.postal_code AS to_postal,
        ta.country_code AS to_country, ta.phone AS to_phone
      FROM shipping_labels sl
      JOIN addresses fa ON fa.id = sl.from_address_id
      JOIN addresses ta ON ta.id = sl.to_address_id
      WHERE sl.id = ${id}
    `;

    if (!label) return NextResponse.json({ message: "Label not found" }, { status: 404 });

    const pdf = await PDFDocument.create();
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const width = template.width * 72;
    const height = template.height * 72;
    const quantity = Math.max(1, Math.min(100, Number(label.label_quantity)));

    for (let copy = 1; copy <= quantity; copy += 1) {
      const page = pdf.addPage([width, height]);
      const margin = template.width === 3 ? 14 : 18;
      let y = height - margin;
      const ink = rgb(0.04, 0.08, 0.12);
      const muted = rgb(0.25, 0.3, 0.34);
      const line = rgb(0.78, 0.8, 0.82);
      const text = (value: string, x: number, size: number, font = regular) => {
        if (value) page.drawText(value.slice(0, 62), { x, y, size, font, color: ink });
        y -= size + 4;
      };

      if (label.show_heading) {
        text(clean(label.custom_heading) || `${clean(label.carrier)} ${clean(label.service_level)} SHIPPING`, margin, template.layout === "compact" ? 12 : 15, bold);
      }
      page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1.5, color: ink });
      y -= 13;

      text("FROM", margin, 7, bold);
      text(clean(label.from_name), margin, 10, bold);
      text(clean(label.from_company), margin, 8);
      text(clean(label.from_line_1), margin, 8);
      text(clean(label.from_line_2), margin, 8);
      text(`${clean(label.from_city)}, ${clean(label.from_state)} ${clean(label.from_postal)}`, margin, 8);
      text(clean(label.from_country), margin, 8);
      y -= 8;
      page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 0.7, color: line });
      y -= 14;

      text("SHIP TO", margin, 9, bold);
      text(clean(label.to_name), margin, template.layout === "minimal" ? 17 : 14, bold);
      text(clean(label.to_company), margin, 10);
      text(clean(label.to_line_1), margin, 11);
      text(clean(label.to_line_2), margin, 10);
      text(`${clean(label.to_city)}, ${clean(label.to_state)} ${clean(label.to_postal)}`, margin, 11, bold);
      text(clean(label.to_country), margin, 10, bold);
      y -= 10;

      const barcodeTop = Math.max(62, y);
      const barcodeValue = clean(label.tracking_number) || `CUSTOM-${id}`;
      const available = width - margin * 2;
      for (let i = 0; i < 46; i += 1) {
        const char = barcodeValue.charCodeAt(i % barcodeValue.length);
        const barWidth = char % 3 === 0 ? 2 : 1;
        const x = margin + (i / 46) * available;
        page.drawRectangle({ x, y: barcodeTop - 38, width: barWidth, height: 34 - (char % 5), color: ink });
      }
      page.drawText(barcodeValue.slice(0, 38), { x: margin, y: barcodeTop - 50, size: 8, font: bold, color: ink });

      const footerY = margin + 18;
      page.drawText(`${clean(label.package_type)} · ${clean(label.weight)} ${clean(label.weight_unit)} · ${clean(label.package_length)}×${clean(label.package_width)}×${clean(label.package_height)} ${clean(label.dimension_unit)}`, { x: margin, y: footerY + 18, size: 7, font: regular, color: muted });
      page.drawText(`REF ${clean(label.reference_number) || "—"}`, { x: margin, y: footerY + 7, size: 7, font: bold, color: ink });
      page.drawText(quantity > 1 ? `PACKAGE ${copy} OF ${quantity}` : clean(label.marketplace), { x: width - margin - 80, y: footerY + 7, size: 7, font: bold, color: ink });
      page.drawText("CUSTOM LABEL — POSTAGE NOT INCLUDED", { x: margin, y: margin - 2, size: 6, font: regular, color: muted });
    }

    const bytes = await pdf.save();
    const filename = `shipping-label-${safeFilePart(clean(label.reference_number) || id)}.pdf`;
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Shipping label PDF generation failed", error);
    return NextResponse.json({ message: "PDF generation failed" }, { status: 500 });
  }
}
