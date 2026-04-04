import { twMerge } from "tailwind-merge"

export function cn(...inputs: any[]) {
  // Simple implementation without clsx for now
  return twMerge(inputs.filter(Boolean).join(' '))
}
