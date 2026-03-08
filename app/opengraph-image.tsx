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
          background: "linear-gradient(135deg, #0C0A12 0%, #14121D 40%, #0C0A12 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold glow orb */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,107,196,0.25) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,123,90,0.15) 0%, transparent 70%)",
            bottom: "-15%",
            right: "-5%",
            filter: "blur(80px)",
          }}
        />

        {/* Top line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background: "linear-gradient(90deg, #7C6BC4, #C87B5A)",
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#7C6BC4",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            Coaching de Vida y Negocios
          </span>
          <div
            style={{
              width: 40,
              height: 2,
              background: "linear-gradient(90deg, #C87B5A, #7C6BC4)",
              borderRadius: 1,
            }}
          />
        </div>

        {/* Brand */}
        <span
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #7C6BC4 0%, #C87B5A 55%, #9D8FD8 100%)",
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
            letterSpacing: "0.01em",
          }}
        >
          Transforma Tu Vida y Tu Negocio
        </span>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 40,
            alignItems: "center",
          }}
        >
          {[
            { number: "+500", label: "Clientes" },
            { number: "10+", label: "Años exp." },
            { number: "87%", label: "Logran objetivos" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#7C6BC4",
                }}
              >
                {stat.number}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#9CA3AF",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <span
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 14,
            color: "#6B7280",
            letterSpacing: "0.05em",
          }}
        >
          eleva.coaching
        </span>
      </div>
    ),
    { ...size }
  );
}
