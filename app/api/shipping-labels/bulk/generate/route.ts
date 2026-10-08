import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/lib/db";
import { labelDataSchema, type TemplateId } from "@/lib/shipping-label";
import { renderShippingLabelPdf } from "@/lib/shipping-label-pdf";

export const runtime = "nodejs";
const requestSchema=z.object({templateId:z.number().int().min(1).max(5),labels:z.array(labelDataSchema).min(1).max(50)});

export async function POST(request:Request){
 try{
  const parsed=requestSchema.safeParse(await request.json());
  if(!parsed.success)return NextResponse.json({message:"Bulk data is invalid.",errors:parsed.error.flatten()},{status:400});
  const {labels,templateId}=parsed.data,ids:string[]=[];
  for(const label of labels){const s=label.sender,r=label.recipient;const [created]=await sql`
   WITH fa AS (INSERT INTO addresses(full_name,company_name,address_line_1,address_line_2,city,state,postal_code,country_code,phone) VALUES(${s.name},${s.company||null},${s.addressLine1},${s.addressLine2||null},${s.city},${s.state},${s.zipCode},${s.country},${s.phone||null}) RETURNING id),
   ta AS (INSERT INTO addresses(full_name,company_name,address_line_1,address_line_2,city,state,postal_code,country_code,phone) VALUES(${r.name},${r.company||null},${r.addressLine1},${r.addressLine2||null},${r.city},${r.state},${r.zipCode},${r.country},${r.phone||null}) RETURNING id)
   INSERT INTO shipping_labels(from_address_id,to_address_id,package_type,weight,weight_unit,dimension_unit,package_length,package_width,package_height,carrier,marketplace,industry_preset,service_level,label_format,ship_date,label_quantity,show_heading,custom_heading,tracking_number,reference_number,handling_instructions)
   SELECT fa.id,ta.id,${label.package.type},${label.package.weight},${label.package.weightUnit},${label.package.dimensionUnit},${label.package.length},${label.package.width},${label.package.height},${label.shipping.carrier},${label.shipping.marketplace},${label.shipping.industryPreset},${label.format.serviceLevel},${label.format.labelFormat},${label.format.shipDate},${label.format.quantity},${label.heading.showHeading},${label.heading.customHeading||null},${label.tracking.trackingNumber||null},${label.tracking.referenceNumber||null},${label.tracking.handlingInstructions||null} FROM fa,ta RETURNING id`;
   ids.push(String(created.id));
  }
  const rendered=await renderShippingLabelPdf(labels,templateId as TemplateId);
  return NextResponse.json({ok:true,generated:ids.length,ids,pdfBase64:Buffer.from(rendered).toString("base64")});
 }catch(error){console.error("Bulk label generation failed",error);return NextResponse.json({message:"Bulk labels could not be generated."},{status:500});}
}
