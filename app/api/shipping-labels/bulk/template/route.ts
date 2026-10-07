import ExcelJS from "exceljs";
import { bulkColumns } from "@/lib/bulk-labels";

export async function GET() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Shipping Labels", { views: [{ state: "frozen", ySplit: 1 }] });
  sheet.columns = bulkColumns.map((key) => ({ header: key, key, width: Math.max(14, key.length + 2) }));
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  sheet.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F766E" } };
  sheet.addRow({ sender_name:"John Smith",sender_company:"Acme Inc",sender_address_1:"123 Main St",sender_address_2:"Suite 100",sender_city:"New York",sender_state:"NY",sender_zip:"10001",sender_country:"US",sender_phone:"555-123-4567",recipient_name:"Jane Doe",recipient_company:"Widget Corp",recipient_address_1:"456 Oak Ave",recipient_address_2:"Apt 2B",recipient_city:"Los Angeles",recipient_state:"CA",recipient_zip:"90001",recipient_country:"US",recipient_phone:"555-987-6543",package_type:"BOX",weight:1,weight_unit:"LB",length:10,width:8,height:6,dimension_unit:"IN",carrier:"UPS",marketplace:"SHOPIFY",industry_preset:"ECOMMERCE",service_level:"STANDARD",ship_date:new Date().toISOString().slice(0,10),quantity:1,tracking_number:"1Z-EXAMPLE",reference_number:"PO-12345",handling_instructions:"Handle with care" });
  sheet.autoFilter = { from: "A1", to: `${sheet.getColumn(bulkColumns.length).letter}2` };
  const buffer = await workbook.xlsx.writeBuffer();
  return new Response(buffer as ArrayBuffer, { headers: { "Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Content-Disposition":"attachment; filename=shipkit-bulk-label-template.xlsx", "Cache-Control":"no-store" } });
}
