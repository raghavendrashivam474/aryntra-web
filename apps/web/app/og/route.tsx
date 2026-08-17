import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

export function GET(_request: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#09090b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(#1c1c1f 1px, transparent 1px), linear-gradient(90deg, #1c1c1f 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              color: "#71717a",
              textTransform: "uppercase",
            }}
          >
            ARYNTRA
          </span>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              fontSize: "72px",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fafafa",
            }}
          >
            <span>India's Intelligent</span>
            <span style={{ color: "#71717a" }}>Decision Layer</span>
          </div>

          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#6366f1",
              marginTop: "8px",
            }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
