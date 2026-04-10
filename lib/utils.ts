import { twMerge } from 'tailwind-merge'

export function cn(...inputs: unknown[]) {
  // Simple implementation without clsx for now
  return twMerge(inputs.filter(Boolean).join(' '))
}
