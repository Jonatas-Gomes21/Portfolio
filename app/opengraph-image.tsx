import { ImageResponse } from "next/og";
import { dict } from "@/lib/content";

export const alt = dict.pt.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0d0e10",
          color: "#ecebe8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 30, color: "#a8a7a2" }}>Desenvolvedor full stack</div>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05 }}>Jonatas Gomes</div>
          <div style={{ fontSize: 30, color: "#a8a7a2" }}>
            React, Node.js e PostgreSQL
          </div>
        </div>
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 160,
            background: "#e8590c",
            color: "#0d0e10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
            fontWeight: 700,
          }}
        >
          JG
        </div>
      </div>
    ),
    size,
  );
}
