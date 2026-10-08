import { PDFDocument } from "pdf-lib";
import sharp from "sharp";
import type { LabelData, TemplateId } from "@/lib/shipping-label";
import { shippingLabelSvg } from "@/lib/shipping-label-svg";

/** The browser preview and the PDF both consume the exact same 384×576 SVG. */
export async function renderShippingLabelPdf(labels:LabelData[],templateId:TemplateId){
  const pdf=await PDFDocument.create();
  for(const data of labels){
    const copies=Math.max(1,Math.min(100,data.format.quantity));
    const svg=shippingLabelSvg(data,templateId);
    const pngBytes=await sharp(Buffer.from(svg)).png().toBuffer();
    const image=await pdf.embedPng(pngBytes);
    for(let copy=0;copy<copies;copy+=1){
      const page=pdf.addPage([288,432]);
      page.drawImage(image,{x:0,y:0,width:288,height:432});
    }
  }
  return pdf.save();
}
