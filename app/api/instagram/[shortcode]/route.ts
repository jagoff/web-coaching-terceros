import { NextRequest, NextResponse } from "next/server";

const CACHE = new Map<string, { data: ArrayBuffer; type: string; ts: number }>();
const TTL = 1000 * 60 * 60; // 1 hour

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  if (!shortcode || !/^[\w-]+$/.test(shortcode)) {
    return NextResponse.json({ error: "Invalid shortcode" }, { status: 400 });
  }

  // Check cache
  const cached = CACHE.get(shortcode);
  if (cached && Date.now() - cached.ts < TTL) {
    return new NextResponse(cached.data, {
      headers: {
        "Content-Type": cached.type,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  try {
    const url = `https://www.instagram.com/p/${shortcode}/media/?size=l`;
    const res = await fetch(url, {
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const data = await res.arrayBuffer();

    // Cache it
    CACHE.set(shortcode, { data, type: contentType, ts: Date.now() });

    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Fetch error" }, { status: 502 });
  }
}
