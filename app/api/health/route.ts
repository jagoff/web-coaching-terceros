import { NextResponse } from "next/server";

// GET /api/health
// Endpoint de verificación de estado del servicio.
// Útil para monitoreo, health checks de CI/CD y balanceadores de carga.
export function GET(): NextResponse {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
}
