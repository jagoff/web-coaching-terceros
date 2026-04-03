/**
 * Contact Service - Maneja el envío de formularios de contacto
 * Usa Web3Forms como servicio principal con fallback a mailto
 */

import devLog from './dev-logger';
import { EMAIL_REGEX } from './validations';

export interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Envía el formulario de contacto usando Web3Forms
 * Web3Forms es gratuito y no requiere backend
 */
export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!WEB3FORMS_ACCESS_KEY) {
    devLog.warn('[ContactService] NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set — using mailto fallback');
    
    // Abrir cliente de email como fallback
    const mailtoLink = createMailtoLink(data);
    if (typeof window !== 'undefined') {
      window.location.href = mailtoLink;
    }
    
    return {
      success: true,
      message: 'Abriendo tu cliente de email para enviar el mensaje.',
    };
  }

  // Debug log en desarrollo
  devLog.log('[ContactService] Enviando formulario:', {
    nombre: data.nombre,
    email: data.email,
    mensajeLength: data.mensaje.length,
    accessKey: WEB3FORMS_ACCESS_KEY.substring(0, 10) + '...'
  });

  try {
    // Validación básica
    if (!data.nombre || !data.email || !data.mensaje) {
      throw new Error('Todos los campos son requeridos');
    }

    // Validación de email
    if (!EMAIL_REGEX.test(data.email)) {
      throw new Error('Email inválido');
    }

    // Preparar datos para Web3Forms
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('name', data.nombre);
    formData.append('email', data.email);
    formData.append('message', data.mensaje);
    formData.append('subject', 'Nuevo contacto desde ELEVA CONSULTORIA');
    formData.append('from_name', 'ELEVA CONSULTORIA Website');
    formData.append('redirect', 'false'); // No redirigir, manejar respuesta en JSON

    // Enviar a Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    devLog.log('[ContactService] Respuesta de Web3Forms:', result);

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Error al enviar el formulario');
    }

    return {
      success: true,
      message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
    };

  } catch (error) {
    devLog.error('[ContactService] Error:', error);

    // Fallback: crear mailto link
    const mailtoLink = createMailtoLink(data);
    
    return {
      success: false,
      message: 'Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo o contáctanos directamente.',
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Crea un link mailto como fallback
 */
export function createMailtoLink(data: ContactFormData): string {
  const subject = encodeURIComponent('Contacto desde ELEVA CONSULTORIA');
  const body = encodeURIComponent(
    `Nombre: ${data.nombre}\nEmail: ${data.email}\n\nMensaje:\n${data.mensaje}`
  );
  return `mailto:contacto@eleva-consultoria.com?subject=${subject}&body=${body}`;
}

/**
 * Valida los datos del formulario
 */
export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormData, string>>;
} {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // Validar nombre
  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  // Validar email
  if (!data.email) {
    errors.email = 'El email es requerido';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Email inválido';
  }

  // Validar mensaje
  if (!data.mensaje || data.mensaje.trim().length < 10) {
    errors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  } else if (data.mensaje.length > 1000) {
    errors.mensaje = 'El mensaje no puede exceder 1000 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
