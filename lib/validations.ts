import { z } from 'zod'

// Shared email regex — single source of truth across validation layers
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Schema de validación para el formulario de contacto (simplificado a 3 campos)
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),

  email: z
    .string()
    .email('El email no es válido')
    .max(254, 'El email no puede exceder 254 caracteres')
    .trim()
    .toLowerCase(),

  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres')
    .trim(),
})

// Tipos inferidos del schema para uso en cliente y servidor
export type ContactFormData = z.infer<typeof contactFormSchema>
