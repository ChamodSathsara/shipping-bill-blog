import { ImageResponse } from "next/og";
export const alt = "ShipKit — free shipping tools for online sellers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, color: "white", background: "linear-gradient(135deg,#0f766e,#0f172a)", fontFamily: "sans-serif" }}><div style={{ fontSize: 34, opacity: .85 }}>ShipKit</div><div style={{ fontSize: 72, fontWeight: 800, maxWidth: 950, marginTop: 28 }}>Free shipping tools built for online sellers.</div></div>, size); }
