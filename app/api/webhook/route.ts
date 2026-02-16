import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Error verificando webhook:", err);
    return NextResponse.json({ error: "Webhook inválido" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Aquí guardaremos el pedido en Supabase en el siguiente paso
    console.log("Pago completado:", {
      sessionId: session.id,
      email: session.customer_details?.email,
      total: session.amount_total,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      direccion: (session as any).shipping_details?.address,
    });
  }

  return NextResponse.json({ received: true });
}
