/**
 * Contact Service - Maneja el envío de formularios de contacto
 * Usa Resend como servicio principal con fallback a mailto
 */

import devLog from './dev-logger'
import { EMAIL_REGEX } from './validations'

export interface ContactFormData {
  nombre: string
  email: string
  mensaje: string
}

export interface ContactResponse {
  success: boolean
  message: string
  error?: string
}

/**
 * Envía el formulario de contacto usando Resend
 * Resend es un servicio de email moderno y confiable
 */
export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  const CONTACT_EMAIL = process.env.CONTACT_EMAIL

  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    devLog.warn(
      '[ContactService] RESEND_API_KEY or CONTACT_EMAIL is not set — using mailto fallback'
    )

    // Abrir cliente de email como fallback
    const mailtoLink = createMailtoLink(data)
    if (typeof window !== 'undefined') {
      window.location.href = mailtoLink
    }

    return {
      success: true,
      message: 'Abriendo tu cliente de email para enviar el mensaje.',
    }
  }

  // Debug log en desarrollo
  devLog.log('[ContactService] Enviando formulario:', {
    nombre: data.nombre,
    email: data.email,
    mensajeLength: data.mensaje.length,
    toEmail: CONTACT_EMAIL,
  })

  try {
    // Validación básica
    if (!data.nombre || !data.email || !data.mensaje) {
      throw new Error('Todos los campos son requeridos')
    }

    // Validación de email
    if (!EMAIL_REGEX.test(data.email)) {
      throw new Error('Email inválido')
    }

    // Preparar email para Resend
    const emailData = {
      from: 'ELEVA CONSULTORIA Website <onboarding@resend.dev>',
      to: [CONTACT_EMAIL],
      reply_to: data.email,
      subject: 'Nuevo contacto desde ELEVA CONSULTORIA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #FF6B35 0%, #C87B5A 50%, #7C6BC4 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">ELEVA CONSULTORIA</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Nuevo mensaje de contacto</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Información del Contacto</h2>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #FF6B35;">Nombre:</strong><br>
              <span style="color: #666;">${data.nombre}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #FF6B35;">Email:</strong><br>
              <span style="color: #666;">${data.email}</span>
            </div>
            
            <div style="margin-bottom: 20px;">
              <strong style="color: #FF6B35;">Mensaje:</strong><br>
              <span style="color: #666; white-space: pre-wrap;">${data.mensaje}</span>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                Este mensaje fue enviado desde el formulario de contacto de ELEVA CONSULTORIA<br>
                Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' })}
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Enviar a Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    const result = await response.json()

    devLog.log('[ContactService] Respuesta de Resend:', result)

    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar el email')
    }

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
    }
  } catch (error) {
    devLog.error('[ContactService] Error:', error)

    return {
      success: false,
      message:
        'Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo o contáctanos directamente.',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

/**
 * Crea un link mailto como fallback
 */
export function createMailtoLink(data: ContactFormData): string {
  const subject = encodeURIComponent('Contacto desde ELEVA CONSULTORIA')
  const body = encodeURIComponent(
    `Nombre: ${data.nombre}\nEmail: ${data.email}\n\nMensaje:\n${data.mensaje}`
  )
  return `mailto:contacto@eleva-consultoria.com?subject=${subject}&body=${body}`
}

/**
 * Valida los datos del formulario
 */
export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean
  errors: Partial<Record<keyof ContactFormData, string>>
} {
  const errors: Partial<Record<keyof ContactFormData, string>> = {}

  // Validar nombre
  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres'
  }

  // Validar email
  if (!data.email) {
    errors.email = 'El email es requerido'
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Email inválido'
  }

  // Validar mensaje
  if (!data.mensaje || data.mensaje.trim().length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres'
  } else if (data.mensaje.length > 1000) {
    errors.mensaje = 'El mensaje no puede exceder 1000 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
