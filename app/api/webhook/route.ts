import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "../../lib/supabase";
import { enviarEmailConfirmacion } from "../../lib/email";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shipping = (session as any).shipping_details;

    // Guardar en Supabase
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("pedidos").insert({
        stripe_session_id: session.id,
        email: session.customer_details?.email,
        total: session.amount_total,
        estado: "pagado",
        direccion: shipping?.address ?? null,
        items: session.metadata ?? null,
      });
      if (error) console.error("Error guardando pedido:", error);
    } catch (err) {
      console.error("Error Supabase:", err);
    }

    // Enviar email de confirmación
    if (session.customer_details?.email) {
      console.log("Intentando enviar email a:", session.customer_details.email);
      console.log("RESEND_API_KEY presente:", !!process.env.RESEND_API_KEY);

      try {
        await enviarEmailConfirmacion({
          email: session.customer_details.email,
          sessionId: session.id,
          total: session.amount_total ?? 0,
          direccion: shipping?.address ?? null,
        });
        console.log(
          "✅ Email enviado correctamente a:",
          session.customer_details.email,
        );
      } catch (err) {
        console.error("❌ Error enviando email:", err);
        // Log del error completo
        if (err instanceof Error) {
          console.error("Error message:", err.message);
          console.error("Error stack:", err.stack);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
