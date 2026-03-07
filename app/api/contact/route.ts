import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { ZodError } from "zod";

// ---------------------------------------------------------------------------
// Rate limiting en memoria
// Estructura: Map<ip, { count: number; resetAt: number }>
// Límite: 3 peticiones por IP por hora
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number;
  resetAt: number; // timestamp Unix (ms)
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hora

function getRateLimitEntry(ip: string): RateLimitEntry {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // Primera petición o ventana expirada — reiniciar contador
    const newEntry: RateLimitEntry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(ip, newEntry);
    return newEntry;
  }

  return entry;
}

function isRateLimited(ip: string): boolean {
  const entry = getRateLimitEntry(ip);

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  // Incrementar contador
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return false;
}

// Limpiar entradas expiradas ocasionalmente para no acumular memoria
function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}

// ---------------------------------------------------------------------------
// Headers CORS reutilizables
// ---------------------------------------------------------------------------
function getCorsHeaders(): HeadersInit {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// ---------------------------------------------------------------------------
// OPTIONS — preflight CORS
// ---------------------------------------------------------------------------
export function OPTIONS(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

// ---------------------------------------------------------------------------
// POST /api/contact
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Limpiar entradas expiradas del mapa de rate limit (~1% de las veces)
  if (Math.random() < 0.01) {
    cleanupRateLimitMap();
  }

  // Obtener IP del cliente (compatible con Vercel, proxies y desarrollo local)
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // Verificar rate limit
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        error: "Has enviado demasiadas solicitudes. Por favor intenta de nuevo en una hora.",
      },
      {
        status: 429,
        headers: {
          ...getCorsHeaders(),
          "Retry-After": "3600",
        },
      }
    );
  }

  // Parsear el body de la petición
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "El cuerpo de la solicitud no es JSON válido." },
      { status: 400, headers: getCorsHeaders() }
    );
  }

  // Validar con Zod
  const parseResult = contactFormSchema.safeParse(rawBody);

  if (!parseResult.success) {
    // Formatear errores de validación de forma legible
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return NextResponse.json(
      {
        success: false,
        error: "Los datos del formulario no son válidos.",
        fieldErrors,
      },
      { status: 422, headers: getCorsHeaders() }
    );
  }

  const formData = parseResult.data;

  // Enviar email (o simular en desarrollo)
  let emailResult: Awaited<ReturnType<typeof sendContactEmail>>;
  try {
    emailResult = await sendContactEmail(formData);
  } catch (err) {
    console.error("[API /contact] Error inesperado al llamar sendContactEmail:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Ocurrió un error interno. Por favor intenta más tarde.",
      },
      { status: 500, headers: getCorsHeaders() }
    );
  }

  if (!emailResult.success) {
    console.error("[API /contact] Fallo en sendContactEmail:", emailResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "No pudimos enviar tu mensaje. Por favor intenta más tarde.",
      },
      { status: 502, headers: getCorsHeaders() }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Mensaje enviado correctamente. Te responderemos en menos de 24 horas.",
    },
    { status: 200, headers: getCorsHeaders() }
  );
}
