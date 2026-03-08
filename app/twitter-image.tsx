import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ELEVA Coaching — Transforma Tu Vida y Tu Negocio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B0A10 0%, #13121B 40%, #0B0A10 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(167,139,250,0.25) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
            filter: "blur(60px)",
          }}
        />

        {/* Brand */}
        <span
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #A78BFA 0%, #D4956A 55%, #C4B5FC 100%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1.1,
          }}
        >
          ELEVA
        </span>

        {/* Tagline */}
        <span
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#E5E7EB",
            marginTop: 16,
          }}
        >
          Transforma Tu Vida y Tu Negocio
        </span>

        {/* CTA hint */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 32,
            padding: "10px 24px",
            borderRadius: 8,
            background: "linear-gradient(135deg, #A78BFA 0%, #D4956A 100%)",
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#0B0A10",
              letterSpacing: "0.02em",
            }}
          >
            Agenda tu sesión gratuita →
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
