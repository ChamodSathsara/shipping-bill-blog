import { PDFDocument, PDFPage, PDFFont, StandardFonts, rgb } from "pdf-lib";
import type { PackingSlipData } from "./packing-slip";

const PAGE = { width: 595.28, height: 841.89, margin: 42 };
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

function drawRight(page: PDFPage, value: string, right: number, y: number, size: number, font: PDFFont, color = COLORS.ink) {
  page.drawText(value, { x: right - font.widthOfTextAtSize(value, size), y, size, font, color });
}

function drawAddress(page: PDFPage, font: PDFFont, bold: PDFFont, title: string, address: PackingSlipData["sender"], x: number, y: number) {
  page.drawText(title, { x, y, size: 9, font: bold, color: COLORS.teal });
  let cursor = y - 18;
  const rows = [address.name, address.company, address.addressLine1, address.addressLine2, `${address.city}, ${address.state} ${address.zipCode}`, address.country, address.phone].filter(Boolean);
  rows.forEach((row, index) => {
    page.drawText(fit(row, 42), { x, y: cursor, size: index === 0 ? 11 : 9, font: index === 0 ? bold : font, color: COLORS.ink });
    cursor -= index === 0 ? 16 : 13;
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

    const top = modern ? PAGE.height - 62 : PAGE.height - 50;
    if (logo) {
      const scale = Math.min(120 / logo.width, 52 / logo.height);
      page.drawImage(logo, { x: PAGE.margin, y: top - 40, width: logo.width * scale, height: logo.height * scale });
    } else {
      page.drawText(data.customHeading, { x: PAGE.margin, y: top - 14, size: 24, font: bold, color: COLORS.ink });
    }

    drawRight(page, `Order ${data.orderNumber || "#"}`, PAGE.width - PAGE.margin, top - 3, 11, bold);
    drawRight(page, data.orderDate, PAGE.width - PAGE.margin, top - 20, 9, regular, COLORS.muted);
    if (data.slipNumber) drawRight(page, fit(data.slipNumber, 20), PAGE.width - PAGE.margin, top - 35, 9, regular, COLORS.muted);
    if (logo) page.drawText(data.customHeading, { x: PAGE.margin, y: top - 68, size: 22, font: bold, color: COLORS.ink });
    if (continued) drawRight(page, "CONTINUED", PAGE.width - PAGE.margin, top - 62, 8, bold, COLORS.teal);

    const dividerY = logo ? top - 80 : top - 55;
    page.drawLine({ start: { x: PAGE.margin, y: dividerY }, end: { x: PAGE.width - PAGE.margin, y: dividerY }, thickness: 1.4, color: COLORS.ink });
    drawAddress(page, regular, bold, "FROM", data.sender, PAGE.margin, dividerY - 22);
    drawAddress(page, regular, bold, "SHIP TO", data.recipient, 326, dividerY - 22);
    // Reserve enough vertical space for the longest supported address block
    // (name + company + two address lines + city/state/ZIP + country + phone).
    // This keeps the table header clear of the final phone line.
    y = dividerY - 172;

    const headerColor = data.templateCode === "MINIMAL" ? COLORS.pale : COLORS.teal;
    const headerText = data.templateCode === "MINIMAL" ? COLORS.ink : COLORS.white;
    page.drawRectangle({ x: PAGE.margin, y: y - 5, width: PAGE.width - PAGE.margin * 2, height: 28, color: headerColor });
    let x = PAGE.margin + 8;
    if (data.showSku) { page.drawText("SKU", { x, y: y + 4, size: 8, font: bold, color: headerText }); x += 94; }
    page.drawText("DESCRIPTION", { x, y: y + 4, size: 8, font: bold, color: headerText });
    if (data.showVariant) page.drawText("VARIANT", { x: 410, y: y + 4, size: 8, font: bold, color: headerText });
    if (data.showQuantity) drawRight(page, "QTY", PAGE.width - PAGE.margin - 8, y + 4, 8, bold, headerText);
    y -= 27;
  };

  addPage();
  for (const item of data.items) {
    if (y < 118) addPage(true);
    const rowHeight = data.templateCode === "COMPACT" ? 20 : 28;
    let x = PAGE.margin + 8;
    if (data.showSku) { page!.drawText(fit(item.sku || "—", 16), { x, y, size: 9, font: regular, color: COLORS.ink }); x += 94; }
    page!.drawText(fit(item.description || "Item description", data.showSku ? 38 : 54), { x, y, size: 9, font: bold, color: COLORS.ink });
    if (data.showVariant) page!.drawText(fit(item.variant || "—", 16), { x: 410, y, size: 9, font: regular, color: COLORS.ink });
    if (data.showQuantity) drawRight(page!, String(item.quantity), PAGE.width - PAGE.margin - 10, y, 9, regular);
    y -= rowHeight;
    // Place the separator halfway between adjacent text baselines so it never
    // crosses through the next row's glyphs.
    const separatorY = y + rowHeight / 2;
    page!.drawLine({ start: { x: PAGE.margin, y: separatorY }, end: { x: PAGE.width - PAGE.margin, y: separatorY }, thickness: 0.55, color: COLORS.line });
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
  page!.drawLine({ start: { x: PAGE.margin, y: 55 }, end: { x: PAGE.width - PAGE.margin, y: 55 }, thickness: 0.6, color: COLORS.line });
  page!.drawText(fit(data.footerText, 95), { x: PAGE.margin, y: 38, size: 8, font: regular, color: COLORS.muted });
  drawRight(page!, `#${id} · ${rowIndex} item${rowIndex === 1 ? "" : "s"}`, PAGE.width - PAGE.margin, 38, 8, regular, COLORS.muted);
  if (data.paperSize === "A4") {
    const scale = 595.28 / PAGE.width;
    for (const pdfPage of pdf.getPages()) {
      pdfPage.scaleContent(scale, scale);
      pdfPage.setSize(595.28, 841.89);
    }
  } else if (data.paperSize === "A5") {
    const scale = 419.53 / PAGE.width;
    for (const pdfPage of pdf.getPages()) {
      pdfPage.scaleContent(scale, scale);
      pdfPage.setSize(419.53, 595.28);
    }
  }
  return Buffer.from(await pdf.save()).toString("base64");
}
