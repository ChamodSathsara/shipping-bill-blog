import { NextResponse } from "next/server";
import { z } from "zod";
import { labelDataSchema, type TemplateId } from "@/lib/shipping-label";
import { renderShippingLabelPdf } from "@/lib/shipping-label-pdf";

export const runtime = "nodejs";
const requestSchema=z.object({templateId:z.number().int().min(1).max(5),labels:z.array(labelDataSchema).min(1).max(50)});

export async function POST(request:Request){
 try{
  const parsed=requestSchema.safeParse(await request.json());
  if(!parsed.success)return NextResponse.json({message:"Bulk data is invalid.",errors:parsed.error.flatten()},{status:400});
  const {labels,templateId}=parsed.data;
  const rendered=await renderShippingLabelPdf(labels,templateId as TemplateId);
  return NextResponse.json({ok:true,generated:labels.length,pdfBase64:Buffer.from(rendered).toString("base64"),dataDeleted:true},{headers:{"Cache-Control":"private, no-store"}});
 }catch(error){console.error("Bulk label generation failed",error);return NextResponse.json({message:"Bulk labels could not be generated."},{status:500});}
}
