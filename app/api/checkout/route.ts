import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getProducto } from "../../lib/queries";
import { SITE_URL } from "../../lib/site";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

type ItemCarritoInput = {
  slug: string;
  formato: { label: string };
  cantidad: number;
};

// Usa el origen real de la petición cuando es uno conocido (p. ej. localhost
// en desarrollo), y si no cae en el dominio de producción. Evita construir
// success_url/cancel_url con un Host arbitrario que un cliente pueda falsear.
function resolverOrigen(req: NextRequest): string {
  const origen = req.headers.get("origin") ?? req.nextUrl.origin;
  const permitidos = new Set([SITE_URL, "http://localhost:3000"]);
  return permitidos.has(origen) ? origen : SITE_URL;
}

export async function POST(req: NextRequest) {
  try {
    const { items } = (await req.json()) as { items: ItemCarritoInput[] };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const resumen: string[] = [];

    for (const item of items) {
      const producto = await getProducto(item.slug);

      if (!producto || !producto.disponible) {
        return NextResponse.json(
          { error: `Producto no disponible: ${item.slug}` },
          { status: 400 },
        );
      }

      const cantidad = Math.min(20, Math.max(1, Math.floor(item.cantidad) || 1));

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: producto.nombre,
            description: `${producto.equipo} · ${item.formato.label}`,
          },
          unit_amount: Math.round(producto.precio * 100),
        },
        quantity: cantidad,
      });

      resumen.push(`${producto.nombre} x${cantidad}`);
    }

    const origen = resolverOrigen(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origen}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origen}/carrito`,
      shipping_address_collection: {
        allowed_countries: ["ES", "PT", "FR", "DE", "IT"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "eur" },
            display_name: "Envío gratuito",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        },
      ],
      metadata: {
        items: resumen.join(" | ").slice(0, 490),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error Stripe:", error);
    return NextResponse.json(
      { error: "Error al crear la sesión de pago" },
      { status: 500 },
    );
  }
}
