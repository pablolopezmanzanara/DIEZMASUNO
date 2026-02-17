import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ItemPedido = {
  nombre: string;
  formato: string;
  cantidad: number;
  precio: number;
};

type EnviarConfirmacionParams = {
  email: string;
  sessionId: string;
  total: number;
  items?: ItemPedido[];
  direccion?: {
    line1?: string;
    city?: string;
    country?: string;
    postal_code?: string;
  } | null;
};

export async function enviarEmailConfirmacion({
  email,
  sessionId,
  total,
  direccion,
}: EnviarConfirmacionParams) {
  const totalFormateado = (total / 100).toFixed(2);
  const referencia = sessionId.slice(-8).toUpperCase();

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de pedido</title>
    </head>
    <body style="margin:0;padding:0;background:#f5efe0;font-family:Georgia,serif;">
      
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        
        <!-- Header -->
        <div style="background:#1a3a2a;padding:32px 40px;text-align:center;">
          <div style="display:inline-block;background:#c9a84c;color:#1a3a2a;border-radius:50%;width:48px;height:48px;line-height:48px;font-family:Arial,sans-serif;font-weight:bold;font-size:12px;margin-bottom:12px;">
            10+1
          </div>
          <h1 style="color:#f5efe0;margin:0;font-size:24px;font-weight:normal;letter-spacing:1px;">
            El Fútbol de Antes
          </h1>
          <p style="color:#c9a84c;margin:8px 0 0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;">
            Arte · Nostalgia · Fútbol
          </p>
        </div>

        <!-- Franja dorada -->
        <div style="background:#c9a84c;padding:12px 40px;">
          <p style="margin:0;color:#1a3a2a;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-align:center;">
            Pedido confirmado ✓
          </p>
        </div>

        <!-- Contenido -->
        <div style="padding:48px 40px;">
          <h2 style="color:#1a3a2a;font-size:28px;font-weight:normal;margin:0 0 8px;">
            ¡Gracias por tu pedido!
          </h2>
          <p style="color:#6b6355;font-size:15px;line-height:1.7;margin:0 0 32px;">
            Hemos recibido tu pedido y lo estamos preparando con mimo. 
            Recibirás otro email cuando tu cuadro esté de camino.
          </p>

          <!-- Referencia -->
          <div style="background:#f5efe0;border-left:4px solid #c9a84c;padding:20px 24px;margin-bottom:32px;">
            <p style="margin:0 0 4px;color:#6b6355;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Número de pedido
            </p>
            <p style="margin:0;color:#1a3a2a;font-size:20px;font-weight:bold;font-family:Arial,sans-serif;letter-spacing:2px;">
              #${referencia}
            </p>
          </div>

          <!-- Total -->
          <div style="border-top:1px solid #e8dcc8;border-bottom:1px solid #e8dcc8;padding:20px 0;margin-bottom:32px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="color:#6b6355;font-family:Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:2px;">
                Total pagado
              </span>
              <span style="color:#1a3a2a;font-size:24px;font-weight:bold;">
                ${totalFormateado} €
              </span>
            </div>
          </div>

          ${
            direccion
              ? `
          <!-- Dirección -->
          <div style="margin-bottom:32px;">
            <p style="margin:0 0 8px;color:#6b6355;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Dirección de envío
            </p>
            <p style="margin:0;color:#1a3a2a;font-size:14px;line-height:1.7;">
              ${direccion.line1 || ""}<br>
              ${direccion.postal_code || ""} ${direccion.city || ""}<br>
              ${direccion.country || ""}
            </p>
          </div>
          `
              : ""
          }

          <!-- Plazos -->
          <div style="background:#1a3a2a;border-radius:4px;padding:24px;margin-bottom:32px;">
            <p style="margin:0 0 12px;color:#c9a84c;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Información de entrega
            </p>
            <p style="margin:0;color:rgba(245,239,224,0.8);font-size:14px;line-height:1.7;">
              Tu pedido llegará en <strong style="color:#f5efe0;">2-4 días hábiles</strong>. 
              Enviamos en tubo protector o caja reforzada según el formato elegido. 
              Incluye certificado de edición limitada.
            </p>
          </div>

          <!-- CTA -->
          <div style="text-align:center;">
            <a href="https://diezmasuno.vercel.app/catalogo"
              style="display:inline-block;background:#c9a84c;color:#1a3a2a;text-decoration:none;font-family:Arial,sans-serif;font-size:13px;letter-spacing:3px;text-transform:uppercase;padding:14px 32px;border-radius:2px;">
              Ver más cuadros
            </a>
          </div>
        </div>

        <!-- Footer email -->
        <div style="background:#1a1410;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 8px;color:rgba(245,239,224,0.3);font-family:Arial,sans-serif;font-size:12px;">
            © 2025 El Fútbol de Antes · Todos los derechos reservados
          </p>
          <p style="margin:0;color:rgba(245,239,224,0.2);font-family:Arial,sans-serif;font-size:11px;">
            Si tienes alguna duda escríbenos a hola@elfutboldeantes.com
          </p>
        </div>

      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: "El Fútbol de Antes <onboarding@resend.dev>",
    to: email,
    subject: `✓ Pedido confirmado #${referencia} — El Fútbol de Antes`,
    html,
  });
}
