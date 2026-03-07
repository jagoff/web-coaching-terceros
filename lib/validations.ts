import { z } from "zod";

// Schema de validación para el formulario de contacto
export const contactFormSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .trim(),

  email: z
    .string()
    .email("El email no es válido")
    .max(254, "El email no puede exceder 254 caracteres")
    .trim()
    .toLowerCase(),

  // Teléfono opcional — acepta formatos comunes en español/LATAM
  telefono: z
    .string()
    .trim()
    .regex(
      /^[\d\s\+\-\(\)]{7,20}$/,
      "El teléfono debe contener entre 7 y 20 dígitos"
    )
    .optional()
    .or(z.literal("")),

  mensaje: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres")
    .trim(),

  servicio: z.enum(["vida", "negocios", "ambos"] as const, {
    error: "El servicio debe ser: vida, negocios o ambos",
  }),
});

// Tipos inferidos del schema para uso en cliente y servidor
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ServicioType = ContactFormData["servicio"];
