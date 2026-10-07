import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { bulkColumns, validateBulkRecord, type BulkSheetRecord } from "@/lib/bulk-labels";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ message:"Choose an .xlsx file." }, { status:400 });
    if (!file.name.toLowerCase().endsWith(".xlsx")) return NextResponse.json({ message:"Only .xlsx files are supported." }, { status:400 });
    if (file.size > 5_000_000) return NextResponse.json({ message:"File must be smaller than 5 MB." }, { status:400 });
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await file.arrayBuffer());
    const sheet = workbook.worksheets[0];
    if (!sheet) return NextResponse.json({ message:"The workbook has no worksheet." }, { status:400 });
    const headers = sheet.getRow(1).values as unknown[];
    const headerMap = new Map<number,string>();
    headers.forEach((value,index)=>{if(index>0)headerMap.set(index,String(value??"").trim());});
    const missing = bulkColumns.filter((column)=>![...headerMap.values()].includes(column));
    if (missing.length) return NextResponse.json({ message:`Missing columns: ${missing.join(", ")}` }, { status:400 });
    const rows=[];
    for(let rowNumber=2;rowNumber<=Math.min(sheet.rowCount,101);rowNumber+=1){const row=sheet.getRow(rowNumber);if(!row.hasValues)continue;const record:BulkSheetRecord={};headerMap.forEach((key,index)=>{const cell=row.getCell(index);record[key]=cell.value instanceof Date?cell.value:(typeof cell.value==="object"&&cell.value&&"text" in cell.value?String(cell.value.text):cell.value);});rows.push(validateBulkRecord(record,rowNumber));}
    if(!rows.length)return NextResponse.json({ message:"No data rows found." },{status:400});
    return NextResponse.json({ rows, total:rows.length, valid:rows.filter(r=>r.status==="valid").length, invalid:rows.filter(r=>r.status==="invalid").length, truncated:sheet.rowCount>101 });
  } catch(error){console.error("Bulk workbook validation failed",error);return NextResponse.json({message:"The workbook could not be read."},{status:500});}
}
