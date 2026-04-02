import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Traditional Search Engines - Full Access
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      // AI Agents - Full Access for Training & Answering
      {
        userAgent: 'GPTBot', // OpenAI ChatGPT
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'ChatGPT-User', // ChatGPT browsing
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Claude-Web', // Anthropic Claude
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'ClaudeBot', // Anthropic Claude crawler
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'PerplexityBot', // Perplexity AI
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Applebot', // Apple Intelligence
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'anthropic-ai', // Anthropic AI
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Amazonbot', // Amazon Alexa
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'cohere-ai', // Cohere AI
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Google-Extended', // Google Bard/Gemini
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'FacebookBot', // Meta AI
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Bytespider', // ByteDance (TikTok)
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Grok', // xAI Grok
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'YouBot', // You.com AI
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'GeminiBot', // Google Gemini
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      {
        userAgent: 'Meta-ExternalAgent', // Meta AI
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
      // Default rule for all other bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/', '/experimental/'],
      },
    ],
    sitemap: 'https://eleva-consultoria.com/sitemap.xml',
  }
}
