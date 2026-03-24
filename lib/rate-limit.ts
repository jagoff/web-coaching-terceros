/**
 * Rate Limiting Middleware
 * Protects API routes from abuse
 */

import { NextRequest, NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store (in production, use Redis or database)
const store: RateLimitStore = {}

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100')
const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000') // 15 minutes

function getClientIdentifier(request: NextRequest): string {
  // Try to get real IP, fallback to user agent hash
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = forwarded?.split(',')[0]
  const xRealIp = request.headers.get('x-real-ip')
  
  if (realIp) {
    return realIp
  }
  
  if (xRealIp) {
    return xRealIp
  }
  
  // Fallback to user agent hash
  const userAgent = request.headers.get('user-agent') || ''
  return Buffer.from(userAgent).toString('base64').substring(0, 16)
}

export function rateLimit(request: NextRequest): Response | null {
  const clientId = getClientIdentifier(request)
  const now = Date.now()
  
  // Clean up expired entries
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  }
  
  // Initialize or update client entry
  if (!store[clientId]) {
    store[clientId] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    }
    return null
  }
  
  // Check if window has expired
  if (store[clientId].resetTime < now) {
    store[clientId] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS
    }
    return null
  }
  
  // Increment count
  store[clientId].count++
  
  // Check if limit exceeded
  if (store[clientId].count > RATE_LIMIT_MAX) {
    return new NextResponse(
      JSON.stringify({
        error: 'Rate limit exceeded',
        message: `Too many requests. Maximum ${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW_MS / 60000} minutes.`,
        retryAfter: Math.ceil((store[clientId].resetTime - now) / 1000)
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((store[clientId].resetTime - now) / 1000).toString(),
          'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': store[clientId].resetTime.toString()
        }
      }
    )
  }
  
  // Add rate limit headers to successful responses
  const headers = {
    'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
    'X-RateLimit-Remaining': (RATE_LIMIT_MAX - store[clientId].count).toString(),
    'X-RateLimit-Reset': store[clientId].resetTime.toString()
  }
  
  return NextResponse.next({ headers })
}
