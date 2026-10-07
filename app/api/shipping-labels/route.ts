import { NextResponse } from "next/server";

import { sql } from "@/lib/db";
import { createLabelSchema } from "@/lib/shipping-label";

export async function POST(request: Request) {
  try {
    const parsed = createLabelSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Please correct the highlighted fields.", errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { templateId, labelData: label } = parsed.data;
    const sender = label.sender;
    const recipient = label.recipient;

    const [created] = await sql`
      WITH from_address AS (
        INSERT INTO addresses (
          full_name, company_name, address_line_1, address_line_2,
          city, state, postal_code, country_code, phone
        ) VALUES (
          ${sender.name}, ${sender.company || null}, ${sender.addressLine1}, ${sender.addressLine2 || null},
          ${sender.city}, ${sender.state}, ${sender.zipCode}, ${sender.country}, ${sender.phone || null}
        ) RETURNING id
      ),
      to_address AS (
        INSERT INTO addresses (
          full_name, company_name, address_line_1, address_line_2,
          city, state, postal_code, country_code, phone
        ) VALUES (
          ${recipient.name}, ${recipient.company || null}, ${recipient.addressLine1}, ${recipient.addressLine2 || null},
          ${recipient.city}, ${recipient.state}, ${recipient.zipCode}, ${recipient.country}, ${recipient.phone || null}
        ) RETURNING id
      )
      INSERT INTO shipping_labels (
        from_address_id, to_address_id, package_type, weight, weight_unit,
        dimension_unit, package_length, package_width, package_height,
        carrier, marketplace, industry_preset, service_level, label_format,
        ship_date, label_quantity, show_heading, custom_heading,
        tracking_number, reference_number, handling_instructions
      )
      SELECT
        from_address.id, to_address.id, ${label.package.type}, ${label.package.weight}, ${label.package.weightUnit},
        ${label.package.dimensionUnit}, ${label.package.length}, ${label.package.width}, ${label.package.height},
        ${label.shipping.carrier}, ${label.shipping.marketplace}, ${label.shipping.industryPreset},
        ${label.format.serviceLevel}, ${label.format.labelFormat}, ${label.format.shipDate}, ${label.format.quantity},
        ${label.heading.showHeading}, ${label.heading.customHeading || null}, ${label.tracking.trackingNumber || null},
        ${label.tracking.referenceNumber || null}, ${label.tracking.handlingInstructions || null}
      FROM from_address, to_address
      RETURNING id
    `;

    const id = String(created.id);
    return NextResponse.json({
      ok: true,
      id,
      templateId,
      quantity: label.format.quantity,
      pdfUrl: `/api/shipping-labels/${id}/pdf?template=${templateId}`,
    }, { status: 201 });
  } catch (error) {
    console.error("Shipping label creation failed", error);
    return NextResponse.json({ ok: false, message: "The label could not be saved. Please try again." }, { status: 500 });
  }
}
