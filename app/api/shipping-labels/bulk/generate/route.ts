import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { z } from "zod";
import { sql } from "@/lib/db";
import { labelDataSchema, labelTemplates } from "@/lib/shipping-label";

export const runtime = "nodejs";
const requestSchema=z.object({templateId:z.number().int().min(1).max(5),labels:z.array(labelDataSchema).min(1).max(50)});

export async function POST(request:Request){
  try{
    const parsed=requestSchema.safeParse(await request.json());
    if(!parsed.success)return NextResponse.json({message:"Bulk data is invalid.",errors:parsed.error.flatten()},{status:400});
    const ids:string[]=[];
    for(const label of parsed.data.labels){const s=label.sender,r=label.recipient;const [created]=await sql`
      WITH fa AS (INSERT INTO addresses(full_name,company_name,address_line_1,address_line_2,city,state,postal_code,country_code,phone) VALUES(${s.name},${s.company||null},${s.addressLine1},${s.addressLine2||null},${s.city},${s.state},${s.zipCode},${s.country},${s.phone||null}) RETURNING id),
      ta AS (INSERT INTO addresses(full_name,company_name,address_line_1,address_line_2,city,state,postal_code,country_code,phone) VALUES(${r.name},${r.company||null},${r.addressLine1},${r.addressLine2||null},${r.city},${r.state},${r.zipCode},${r.country},${r.phone||null}) RETURNING id)
      INSERT INTO shipping_labels(from_address_id,to_address_id,package_type,weight,weight_unit,dimension_unit,package_length,package_width,package_height,carrier,marketplace,industry_preset,service_level,label_format,ship_date,label_quantity,show_heading,custom_heading,tracking_number,reference_number,handling_instructions)
      SELECT fa.id,ta.id,${label.package.type},${label.package.weight},${label.package.weightUnit},${label.package.dimensionUnit},${label.package.length},${label.package.width},${label.package.height},${label.shipping.carrier},${label.shipping.marketplace},${label.shipping.industryPreset},${label.format.serviceLevel},${label.format.labelFormat},${label.format.shipDate},${label.format.quantity},${label.heading.showHeading},${label.heading.customHeading||null},${label.tracking.trackingNumber||null},${label.tracking.referenceNumber||null},${label.tracking.handlingInstructions||null} FROM fa,ta RETURNING id`;ids.push(String(created.id));}
    const template=labelTemplates.find(t=>t.id===parsed.data.templateId)??labelTemplates[0];const pdf=await PDFDocument.create();const regular=await pdf.embedFont(StandardFonts.Helvetica);const bold=await pdf.embedFont(StandardFonts.HelveticaBold);const black=rgb(0,0,0);
    parsed.data.labels.forEach((label,index)=>{const page=pdf.addPage([template.width*72,template.height*72]);const w=page.getWidth(),h=page.getHeight(),m=16;page.drawRectangle({x:2,y:2,width:w-4,height:h-4,borderColor:black,borderWidth:1});page.drawText(label.heading.customHeading||`${label.shipping.carrier} ${label.format.serviceLevel} SHIPPING`,{x:m,y:h-30,size:13,font:bold});page.drawLine({start:{x:m,y:h-38},end:{x:w-m,y:h-38},thickness:2});page.drawText("FROM",{x:m,y:h-54,size:7,font:bold});page.drawText(label.sender.name,{x:m,y:h-68,size:9,font:bold});page.drawText(`${label.sender.addressLine1}, ${label.sender.city}, ${label.sender.state} ${label.sender.zipCode}`,{x:m,y:h-80,size:7,font:regular});page.drawText("SHIP TO",{x:m,y:h-112,size:9,font:bold});page.drawText(label.recipient.name,{x:m,y:h-132,size:15,font:bold});page.drawText(label.recipient.addressLine1,{x:m,y:h-148,size:9,font:regular});page.drawText(`${label.recipient.city}, ${label.recipient.state} ${label.recipient.zipCode} ${label.recipient.country}`,{x:m,y:h-162,size:9,font:bold});const y=80;for(let i=0;i<48;i+=1){page.drawRectangle({x:m+i*(w-m*2)/48,y,width:i%3===0?2:1,height:38-(i%5),color:black});}page.drawText(label.tracking.trackingNumber||`CUSTOM-${ids[index]}`,{x:m,y:65,size:8,font:bold});page.drawText(`REF ${label.tracking.referenceNumber||"—"}  ·  ${label.package.weight} ${label.package.weightUnit}`,{x:m,y:35,size:7,font:regular});page.drawText("CUSTOM LABEL — POSTAGE NOT INCLUDED",{x:m,y:15,size:6,font:regular});});
    const bytes=await pdf.save();return NextResponse.json({ok:true,generated:ids.length,ids,pdfBase64:Buffer.from(bytes).toString("base64")});
  }catch(error){console.error("Bulk label generation failed",error);return NextResponse.json({message:"Bulk labels could not be generated."},{status:500});}
}
