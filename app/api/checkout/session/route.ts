import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Falta session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Pago no confirmado" },
        { status: 404 },
      );
    }

    const items = (session.line_items?.data ?? []).map((li) => ({
      id: li.id,
      nombre: li.description ?? "",
      cantidad: li.quantity ?? 1,
      formato: { precio: (li.amount_total ?? 0) / 100 / (li.quantity || 1) },
    }));

    return NextResponse.json({
      orderId: session.id,
      total: (session.amount_total ?? 0) / 100,
      items,
    });
  } catch (error) {
    console.error("Error recuperando sesión de Stripe:", error);
    return NextResponse.json(
      { error: "Sesión no encontrada" },
      { status: 404 },
    );
  }
}
