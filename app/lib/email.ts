import { Resend } from "resend";
import { SITE_URL } from "./site";

type ItemPedido = {
  nombre: string;
  cantidad: number;
  precio: number;
  imagenUrl?: string;
};

type EnviarConfirmacionParams = {
  email: string;
  sessionId: string;
  total: number;
  items?: ItemPedido[];
  direccion?: {
    line1?: string | null;
    city?: string | null;
    country?: string | null;
    postal_code?: string | null;
  } | null;
};

export async function enviarEmailConfirmacion({
  email,
  sessionId,
  total,
  items,
  direccion,
}: EnviarConfirmacionParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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

          ${
            items && items.length > 0
              ? `
          <!-- Artículos -->
          <div style="margin-bottom:32px;">
            <p style="margin:0 0 12px;color:#6b6355;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Tu pedido
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${items
                .map(
                  (item) => `
              <tr>
                <td style="padding:8px 0;width:56px;">
                  ${
                    item.imagenUrl
                      ? `<img src="${item.imagenUrl}" width="56" height="56" alt="${item.nombre}" style="display:block;border-radius:4px;object-fit:cover;">`
                      : ""
                  }
                </td>
                <td style="padding:8px 0 8px 16px;color:#1a3a2a;font-size:14px;">
                  ${item.nombre}
                  <span style="color:#6b6355;">x${item.cantidad}</span>
                </td>
                <td style="padding:8px 0;text-align:right;color:#1a3a2a;font-size:14px;font-weight:bold;white-space:nowrap;">
                  ${(item.precio * item.cantidad).toFixed(2)} €
                </td>
              </tr>
              `,
                )
                .join("")}
            </table>
          </div>
          `
              : ""
          }

          <!-- Total -->
          <div style="border-top:1px solid #e8dcc8;border-bottom:1px solid #e8dcc8;padding:20px 0;margin-bottom:32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="color:#6b6355;font-family:Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:2px;vertical-align:middle;">
                  Total pagado
                </td>
                <td style="text-align:right;color:#1a3a2a;font-size:26px;font-weight:bold;vertical-align:middle;">
                  ${totalFormateado} €
                </td>
              </tr>
            </table>
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
              Tu pedido saldrá hacia tu dirección en un máximo de
              <strong style="color:#f5efe0;">72 horas</strong>.
            </p>
          </div>

          <!-- CTA -->
          <div style="text-align:center;">
            <a href="${SITE_URL}/#todos-los-cuadros"
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
    from: "El Fútbol de Antes <pedidos@elfutboldeantes.com>",
    to: email,
    subject: `✓ Pedido confirmado #${referencia} — El Fútbol de Antes`,
    html,
  });
}

const EMAIL_NOTIFICACIONES = "diezmasuno.fa@gmail.com";

type NotificacionPedidoParams = {
  emailCliente: string;
  sessionId: string;
  total: number;
  items?: ItemPedido[];
  direccion?: EnviarConfirmacionParams["direccion"];
};

// Aviso interno a la empresa cada vez que entra un pedido, con la misma
// informacion que se ve en el panel de /admin/pedidos (productos, importe,
// email y direccion del cliente), independiente del email al cliente.
export async function enviarNotificacionPedido({
  emailCliente,
  sessionId,
  total,
  items,
  direccion,
}: NotificacionPedidoParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const totalFormateado = (total / 100).toFixed(2);
  const referencia = sessionId.slice(-8).toUpperCase();

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo pedido</title>
    </head>
    <body style="margin:0;padding:0;background:#f5efe0;font-family:Georgia,serif;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">

        <!-- Franja dorada -->
        <div style="background:#c9a84c;padding:16px 40px;">
          <p style="margin:0;color:#1a3a2a;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;text-align:center;">
            🔔 Nuevo pedido recibido
          </p>
        </div>

        <div style="padding:32px 40px;">
          <!-- Referencia -->
          <div style="background:#f5efe0;border-left:4px solid #c9a84c;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;color:#6b6355;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Número de pedido
            </p>
            <p style="margin:0;color:#1a3a2a;font-size:18px;font-weight:bold;font-family:Arial,sans-serif;letter-spacing:2px;">
              #${referencia}
            </p>
          </div>

          <!-- Cliente -->
          <div style="margin-bottom:24px;">
            <p style="margin:0 0 4px;color:#6b6355;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Cliente
            </p>
            <p style="margin:0;color:#1a3a2a;font-size:14px;">
              ${emailCliente}
            </p>
          </div>

          ${
            items && items.length > 0
              ? `
          <!-- Artículos -->
          <div style="margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#6b6355;font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;">
              Productos
            </p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${items
                .map(
                  (item) => `
              <tr>
                <td style="padding:6px 0;width:48px;">
                  ${
                    item.imagenUrl
                      ? `<img src="${item.imagenUrl}" width="48" height="48" alt="${item.nombre}" style="display:block;border-radius:4px;object-fit:cover;">`
                      : ""
                  }
                </td>
                <td style="padding:6px 0 6px 14px;color:#1a3a2a;font-size:14px;">
                  ${item.nombre}
                  <span style="color:#6b6355;">x${item.cantidad}</span>
                </td>
                <td style="padding:6px 0;text-align:right;color:#1a3a2a;font-size:14px;font-weight:bold;white-space:nowrap;">
                  ${(item.precio * item.cantidad).toFixed(2)} €
                </td>
              </tr>
              `,
                )
                .join("")}
            </table>
          </div>
          `
              : ""
          }

          <!-- Total -->
          <div style="border-top:1px solid #e8dcc8;border-bottom:1px solid #e8dcc8;padding:16px 0;margin-bottom:24px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr>
                <td style="color:#6b6355;font-family:Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:2px;vertical-align:middle;">
                  Total pagado
                </td>
                <td style="text-align:right;color:#1a3a2a;font-size:22px;font-weight:bold;vertical-align:middle;">
                  ${totalFormateado} €
                </td>
              </tr>
            </table>
          </div>

          ${
            direccion
              ? `
          <!-- Dirección -->
          <div>
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
        </div>
      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: "El Fútbol de Antes <pedidos@elfutboldeantes.com>",
    to: EMAIL_NOTIFICACIONES,
    subject: `🔔 Nuevo pedido #${referencia} — ${totalFormateado} €`,
    html,
  });
}
