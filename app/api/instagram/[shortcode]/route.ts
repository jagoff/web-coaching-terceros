import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await context.params;

  try {
    // Usar imágenes placeholder de picsum que son JPG reales
    const imageUrl = `https://picsum.photos/300/300?random=${shortcode}`;
    
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch image');
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
    
    // Fallback a un SVG base64 convertido a data URL
    const svgFallback = `
      <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="#2a2a3e"/>
        <rect x="50" y="50" width="200" height="200" fill="none" stroke="#7c6bc4" stroke-width="2" rx="20"/>
        <text x="150" y="150" text-anchor="middle" fill="#7c6bc4" font-family="Arial" font-size="16">
          Instagram ${shortcode}
        </text>
      </svg>
    `;

    const base64Svg = Buffer.from(svgFallback.trim()).toString('base64');
    const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

    // Redirigir a una imagen placeholder real
    return NextResponse.redirect(`https://picsum.photos/300/300?random=${shortcode}`);
  }
}
