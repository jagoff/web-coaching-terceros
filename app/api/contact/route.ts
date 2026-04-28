import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { contactFormSchema } from '@/lib/validations';

// Rate limit en memoria (best-effort en single-instance / serverless con misma instancia caliente)
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 h
const RATE_LIMIT_MAX = 5;
const ipBuckets = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string): { limited: boolean; retryAfter?: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipBuckets.get(ip) ?? []).filter((t) => t > windowStart);
  if (hits.length >= RATE_LIMIT_MAX) {
    const oldest = hits[0];
    return { limited: true, retryAfter: Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000) };
  }
  hits.push(now);
  ipBuckets.set(ip, hits);
  return { limited: false };
}

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // permitir requests del mismo origin (browser navigation)
  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'http://localhost:3037',
  ].filter((u): u is string => Boolean(u));
  try {
    const host = new URL(origin).host;
    return allowed.some((u) => {
      try {
        return new URL(u).host === host;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Origin check
    const origin = request.headers.get('origin');
    if (origin && !isAllowedOrigin(origin)) {
      return NextResponse.json({ error: 'Forbidden origin' }, { status: 403 });
    }

    // Rate limit por IP
    const ip = getClientIp(request);
    const rl = isRateLimited(ip);
    if (rl.limited) {
      return NextResponse.json(
        { error: 'Too many requests' },
        {
          status: 429,
          headers: { 'Retry-After': String(rl.retryAfter ?? 60) },
        }
      );
    }

    // Tamaño de payload (defensivo)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 10_000) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    // Validación con Zod (única fuente de verdad)
    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const emailResult = await sendContactEmail(parsed.data);

    if (!emailResult.success) {
      console.error('[contact] email send failed:', emailResult.error);
      return NextResponse.json(
        { error: 'Mail delivery failed' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        messageId: emailResult.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[contact] unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
