import type { ContactFormData } from "./validations";

// Nombres legibles para los tipos de servicio
const SERVICIOS_LABELS: Record<ContactFormData["servicio"], string> = {
  liderazgo: "Coaching de Liderazgo",
  organizacional: "Consultoría Organizacional",
  ambos: "Coaching de Liderazgo + Consultoría",
  otros: "Otros",
};

// Template HTML del email de confirmación enviado al cliente
function buildConfirmationEmailHtml(data: ContactFormData): string {
  const servicioLabel = SERVICIOS_LABELS[data.servicio];

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hemos recibido tu mensaje</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 48px 40px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      font-size: 28px;
      margin: 0 0 8px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      color: #a0aec0;
      font-size: 16px;
      margin: 0;
    }
    .body {
      padding: 40px;
    }
    .greeting {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1a1a2e;
    }
    .text {
      font-size: 15px;
      line-height: 1.7;
      color: #555;
      margin-bottom: 24px;
    }
    .summary-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .summary-box h3 {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #718096;
      margin: 0 0 16px;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }
    .summary-row:last-child {
      border-bottom: none;
    }
    .summary-label {
      color: #718096;
      font-weight: 500;
    }
    .summary-value {
      color: #1a1a2e;
      font-weight: 600;
      text-align: right;
      max-width: 60%;
    }
    .cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      display: inline-block;
      margin: 8px 0 24px;
    }
    .footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 24px 40px;
      text-align: center;
      font-size: 13px;
      color: #a0aec0;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Mensaje Recibido</h1>
      <p>Te responderemos en menos de 24 horas</p>
    </div>
    <div class="body">
      <p class="greeting">Hola ${data.nombre},</p>
      <p class="text">
        Gracias por ponerte en contacto. Hemos recibido tu mensaje correctamente y nos
        pondremos en comunicación contigo a la brevedad posible.
      </p>

      <div class="summary-box">
        <h3>Resumen de tu solicitud</h3>
        <div class="summary-row">
          <span class="summary-label">Nombre</span>
          <span class="summary-value">${data.nombre}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Email</span>
          <span class="summary-value">${data.email}</span>
        </div>
        ${
          data.telefono
            ? `<div class="summary-row">
          <span class="summary-label">Teléfono</span>
          <span class="summary-value">${data.telefono}</span>
        </div>`
            : ""
        }
        <div class="summary-row">
          <span class="summary-label">Servicio</span>
          <span class="summary-value">${servicioLabel}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Mensaje</span>
          <span class="summary-value">${data.mensaje}</span>
        </div>
      </div>

      <p class="text">
        Mientras tanto, si tienes alguna pregunta urgente no dudes en responder
        directamente a este correo.
      </p>
    </div>
    <div class="footer">
      <p>
        &copy; ${new Date().getFullYear()} Coaching. Todos los derechos reservados.<br />
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "#"}">Visitar sitio web</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Template HTML de notificación interna enviado al coach
function buildNotificationEmailHtml(data: ContactFormData): string {
  const servicioLabel = SERVICIOS_LABELS[data.servicio];
  const now = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Nuevo contacto desde el sitio web</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f7; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 30px auto; background: #fff; border-radius: 10px; overflow: hidden; }
    .header { background: #1a1a2e; padding: 24px 32px; }
    .header h2 { color: #fff; margin: 0; font-size: 20px; }
    .header span { color: #a0aec0; font-size: 13px; }
    .body { padding: 32px; }
    .field { margin-bottom: 18px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #718096; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a1a2e; font-weight: 500; background: #f8fafc; padding: 10px 14px; border-radius: 6px; border: 1px solid #e2e8f0; }
    .mensaje-value { white-space: pre-wrap; }
    .badge { display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h2>Nuevo mensaje de contacto</h2>
      <span>${now}</span>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Nombre</div>
        <div class="value">${data.nombre}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${data.email}</div>
      </div>
      ${
        data.telefono
          ? `<div class="field">
        <div class="label">Teléfono</div>
        <div class="value">${data.telefono}</div>
      </div>`
          : ""
      }
      <div class="field">
        <div class="label">Servicio de interés</div>
        <div class="value"><span class="badge">${servicioLabel}</span></div>
      </div>
      <div class="field">
        <div class="label">Mensaje</div>
        <div class="value mensaje-value">${data.mensaje}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

// Resultado tipado del envío de email
export type SendEmailResult =
  | { success: true; messageId?: string }
  | { success: false; error: string };

/**
 * Envía los emails de confirmación al cliente y notificación al coach.
 * - En desarrollo (NODE_ENV !== "production") solo loguea en consola.
 * - En producción utiliza la API de Resend; requiere RESEND_API_KEY y CONTACT_EMAIL.
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<SendEmailResult> {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    // Modo desarrollo: simular envío sin llamadas externas
    console.log("\n========================================");
    console.log("[EMAIL] Modo desarrollo — simulando envío");
    console.log("----------------------------------------");
    console.log("Para:", data.email);
    console.log("Asunto: Hemos recibido tu mensaje");
    console.log("Datos del formulario:", JSON.stringify(data, null, 2));
    console.log("========================================\n");
    return { success: true };
  }

  // Modo producción: enviar con Resend
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    console.error("[EMAIL] Falta la variable de entorno RESEND_API_KEY");
    return { success: false, error: "Configuración de email incompleta" };
  }

  if (!contactEmail) {
    console.error("[EMAIL] Falta la variable de entorno CONTACT_EMAIL");
    return { success: false, error: "Configuración de email incompleta" };
  }

  try {
    // Importación dinámica para evitar errores en build si resend no está configurado
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "tu sitio web";
    const fromAddress = `ELEVA Coaching <onboarding@resend.dev>`;

    // Enviar confirmación al cliente y notificación al coach en paralelo
    const [confirmResult, notifResult] = await Promise.allSettled([
      resend.emails.send({
        from: fromAddress,
        to: data.email,
        subject: "Hemos recibido tu mensaje — nos pondremos en contacto pronto",
        html: buildConfirmationEmailHtml(data),
      }),
      resend.emails.send({
        from: fromAddress,
        to: contactEmail,
        subject: `Nuevo contacto: ${data.nombre} — ${data.servicio}`,
        html: buildNotificationEmailHtml(data),
        replyTo: data.email,
      }),
    ]);

    // Reportar errores individuales sin bloquear la respuesta principal
    if (confirmResult.status === "rejected") {
      console.error("[EMAIL] Error al enviar confirmación al cliente:", confirmResult.reason);
    }
    if (notifResult.status === "rejected") {
      console.error("[EMAIL] Error al enviar notificación al coach:", notifResult.reason);
    }

    // El envío se considera exitoso si al menos uno de los dos llegó
    const anySuccess =
      confirmResult.status === "fulfilled" || notifResult.status === "fulfilled";

    if (!anySuccess) {
      return { success: false, error: "No se pudo enviar ninguno de los emails" };
    }

    const messageId =
      confirmResult.status === "fulfilled"
        ? (confirmResult.value.data?.id ?? undefined)
        : undefined;

    return { success: true, messageId };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("[EMAIL] Error inesperado:", message);
    return { success: false, error: message };
  }
}
