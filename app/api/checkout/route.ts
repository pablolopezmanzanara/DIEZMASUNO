import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    const lineItems = items.map(
      (item: {
        nombre: string;
        formato: { label: string; precio: number };
        cantidad: number;
      }) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.nombre,
            description: item.formato.label,
          },
          unit_amount: Math.round(item.formato.precio * 100),
        },
        quantity: item.cantidad,
      }),
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/pedido-confirmado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/carrito`,
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
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 495, currency: "eur" },
            display_name: "Envío estándar",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 2 },
              maximum: { unit: "business_day", value: 4 },
            },
          },
        },
      ],
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
