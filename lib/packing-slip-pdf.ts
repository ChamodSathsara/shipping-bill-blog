import { PDFDocument, PDFPage, PDFFont, StandardFonts, rgb } from "pdf-lib";
import type { PackingSlipData } from "./packing-slip";

const PAGE = { width: 612, height: 792, margin: 30 };
const COLORS = {
  ink: rgb(0.02, 0.04, 0.07),
  muted: rgb(0.36, 0.4, 0.45),
  line: rgb(0.75, 0.78, 0.81),
  teal: rgb(0.06, 0.46, 0.43),
  pale: rgb(0.94, 0.96, 0.96),
  white: rgb(1, 1, 1),
};

function fit(value: string, max = 58) {
  return value.replace(/[\r\n]+/g, " ").slice(0, max);
}

function drawAddress(page: PDFPage, font: PDFFont, bold: PDFFont, title: string, address: PackingSlipData["sender"], x: number, y: number) {
  page.drawText(title, { x, y, size: 8, font: bold, color: COLORS.teal });
  let cursor = y - 16;
  const rows = [address.name, address.company, address.addressLine1, address.addressLine2, `${address.city}, ${address.state} ${address.zipCode}`, address.country, address.phone].filter(Boolean);
  rows.forEach((row, index) => {
    page.drawText(fit(row, 42), { x, y: cursor, size: index === 0 ? 10 : 8, font: index === 0 ? bold : font, color: COLORS.ink });
    cursor -= index === 0 ? 14 : 11;
  });
}

export async function renderPackingSlipPdf(data: PackingSlipData, id: string) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let logo: Awaited<ReturnType<PDFDocument["embedPng"]>> | undefined;

  if (data.showLogo && data.logoDataUrl) {
    try {
      const bytes = Uint8Array.from(atob(data.logoDataUrl.split(",")[1]), (char) => char.charCodeAt(0));
      logo = data.logoDataUrl.includes("image/png") ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
    } catch {
      logo = undefined;
    }
  }

  let page: PDFPage;
  let y = 0;
  let rowIndex = 0;

  const addPage = (continued = false) => {
    page = pdf.addPage([PAGE.width, PAGE.height]);
    const modern = data.templateCode === "MODERN";
    if (modern) page.drawRectangle({ x: 0, y: PAGE.height - 12, width: PAGE.width, height: 12, color: COLORS.teal });

    const top = modern ? 742 : 752;
    if (logo) {
      const scale = Math.min(96 / logo.width, 42 / logo.height);
      page.drawImage(logo, { x: PAGE.margin, y: top - 33, width: logo.width * scale, height: logo.height * scale });
    } else {
      page.drawText(data.customHeading, { x: PAGE.margin, y: top - 12, size: 21, font: bold, color: COLORS.ink });
    }

    page.drawText(`Order ${data.orderNumber || "#"}`, { x: 430, y: top - 5, size: 10, font: bold, color: COLORS.ink });
    page.drawText(data.orderDate, { x: 470, y: top - 20, size: 8, font: regular, color: COLORS.muted });
    if (data.slipNumber) page.drawText(fit(data.slipNumber, 20), { x: 455, y: top - 33, size: 8, font: regular, color: COLORS.muted });
    if (logo) page.drawText(data.customHeading, { x: PAGE.margin, y: top - 58, size: 17, font: bold, color: COLORS.ink });
    if (continued) page.drawText("CONTINUED", { x: 485, y: top - 55, size: 7, font: bold, color: COLORS.teal });

    const dividerY = logo ? top - 68 : top - 48;
    page.drawLine({ start: { x: PAGE.margin, y: dividerY }, end: { x: PAGE.width - PAGE.margin, y: dividerY }, thickness: 1.2, color: COLORS.ink });
    drawAddress(page, regular, bold, "FROM", data.sender, PAGE.margin, dividerY - 19);
    drawAddress(page, regular, bold, "SHIP TO", data.recipient, 326, dividerY - 19);
    y = dividerY - 122;

    const headerColor = data.templateCode === "MINIMAL" ? COLORS.pale : COLORS.teal;
    const headerText = data.templateCode === "MINIMAL" ? COLORS.ink : COLORS.white;
    page.drawRectangle({ x: PAGE.margin, y: y - 4, width: PAGE.width - PAGE.margin * 2, height: 24, color: headerColor });
    let x = PAGE.margin + 6;
    if (data.showSku) { page.drawText("SKU", { x, y: y + 4, size: 7, font: bold, color: headerText }); x += 88; }
    page.drawText("DESCRIPTION", { x, y: y + 4, size: 7, font: bold, color: headerText });
    if (data.showVariant) page.drawText("VARIANT", { x: 410, y: y + 4, size: 7, font: bold, color: headerText });
    if (data.showQuantity) page.drawText("QTY", { x: 535, y: y + 4, size: 7, font: bold, color: headerText });
    y -= 22;
  };

  addPage();
  for (const item of data.items) {
    if (y < 118) addPage(true);
    const rowHeight = data.templateCode === "COMPACT" ? 16 : 22;
    let x = PAGE.margin + 6;
    if (data.showSku) { page!.drawText(fit(item.sku || "—", 16), { x, y, size: 8, font: regular, color: COLORS.ink }); x += 88; }
    page!.drawText(fit(item.description || "Item description", data.showSku ? 42 : 58), { x, y, size: 8, font: bold, color: COLORS.ink });
    if (data.showVariant) page!.drawText(fit(item.variant || "—", 18), { x: 410, y, size: 8, font: regular, color: COLORS.ink });
    if (data.showQuantity) page!.drawText(String(item.quantity), { x: 540, y, size: 8, font: regular, color: COLORS.ink });
    y -= rowHeight;
    page!.drawLine({ start: { x: PAGE.margin, y: y + 6 }, end: { x: PAGE.width - PAGE.margin, y: y + 6 }, thickness: 0.45, color: COLORS.line });
    rowIndex += 1;
  }

  y -= 12;
  if (data.specialInstructions) {
    page!.drawText("SPECIAL INSTRUCTIONS", { x: PAGE.margin, y, size: 8, font: bold, color: COLORS.teal });
    y -= 14;
    page!.drawText(fit(data.specialInstructions, 100), { x: PAGE.margin, y, size: 8, font: regular, color: COLORS.ink });
    y -= 22;
  }
  if (data.customerMessage) page!.drawText(fit(data.customerMessage, 95), { x: PAGE.margin, y, size: 10, font: bold, color: COLORS.ink });
  page!.drawText(fit(data.footerText, 110), { x: PAGE.margin, y: 30, size: 7, font: regular, color: COLORS.muted });
  page!.drawText(`#${id} · ${rowIndex} item${rowIndex === 1 ? "" : "s"}`, { x: 505, y: 30, size: 7, font: regular, color: COLORS.muted });
  return Buffer.from(await pdf.save()).toString("base64");
}
