/**
 * Environment Variables Validation
 * Validates required environment variables on startup
 */

interface EnvVar {
  name: string
  required: boolean
  description: string
}

const envVars: EnvVar[] = [
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: true,
    description: 'Public URL of the site (used for CORS and email links)'
  },
  {
    name: 'CONTACT_EMAIL',
    required: true,
    description: 'Contact email for notifications'
  },
  {
    name: 'RESEND_API_KEY',
    required: false,
    description: 'Resend API key for email sending'
  },
  {
    name: 'NEXT_PUBLIC_GA_ID',
    required: false,
    description: 'Google Analytics Measurement ID'
  },
  {
    name: 'NEXT_PUBLIC_HOTJAR_ID',
    required: false,
    description: 'Hotjar Site ID'
  },
  {
    name: 'CALCOM_API_KEY',
    required: false,
    description: 'Cal.com API key for booking integration'
  }
]

export function validateEnv(): void {
  const missing: string[] = []
  const warnings: string[] = []

  envVars.forEach(({ name, required, description }) => {
    const value = process.env[name]
    
    if (!value) {
      if (required) {
        missing.push(`❌ ${name}: ${description}`)
      } else {
        warnings.push(`⚠️  ${name}: ${description} (optional)`)
      }
    }
  })

  // Report missing required variables
  if (missing.length > 0) {
    console.error('\n🚨 Missing Required Environment Variables:')
    missing.forEach(msg => console.error(`  ${msg}`))
    console.error('\nPlease set these variables in your .env.local file')
    console.error('Copy .env.local.example to .env.local and fill in the values\n')
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required environment variables')
    }
  }

  // Report warnings for optional variables
  if (warnings.length > 0) {
    console.warn('\n⚠️  Optional Environment Variables Not Set:')
    warnings.forEach(msg => console.warn(`  ${msg}`))
    console.warn('\nThese features will be disabled until configured\n')
  }

  // Validate URL format
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (siteUrl && !isValidUrl(siteUrl)) {
    throw new Error(`Invalid NEXT_PUBLIC_SITE_URL: ${siteUrl}`)
  }

  // Validate email format
  const contactEmail = process.env.CONTACT_EMAIL
  if (contactEmail && !isValidEmail(contactEmail)) {
    throw new Error(`Invalid CONTACT_EMAIL: ${contactEmail}`)
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Auto-validate in production
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}
