import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await context.params;

  try {
    // Construir la URL real de Instagram
    const instagramUrl = `https://www.instagram.com/p/${shortcode}/media`;
    
    const response = await fetch(instagramUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram image');
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // 1 día
      },
    });
  } catch (error) {
    console.error('Error fetching Instagram image:', error);
    
    // Fallback a una imagen placeholder real
    return NextResponse.redirect(`https://picsum.photos/300/300?random=${shortcode}`);
  }
}
