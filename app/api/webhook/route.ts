import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabase";

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

    try {
      const { error } = await supabase.from("pedidos").insert({
        stripe_session_id: session.id,
        email: session.customer_details?.email,
        total: session.amount_total,
        estado: "pagado",
        direccion: (session as any).shipping_details?.address ?? null, // eslint-disable-line @typescript-eslint/no-explicit-any
        items: session.metadata ?? null,
      });

      if (error) {
        console.error("Error guardando pedido en Supabase:", error);
      } else {
        console.log("Pedido guardado correctamente:", session.id);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
    }
  }

  return NextResponse.json({ received: true });
}
