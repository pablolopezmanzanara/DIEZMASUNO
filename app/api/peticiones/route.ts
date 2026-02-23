import { NextResponse } from "next/server";
import { getSupabaseClient } from "../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombreJugador, equipo, epoca, email, detalles } = body;

    const supabase = getSupabaseClient();

    const { error } = await supabase.from("peticiones").insert({
      nombre_jugador: nombreJugador,
      equipo: equipo || null,
      epoca: epoca || null,
      email_usuario: email || null,
      detalles: detalles || null,
    });

    if (error) {
      console.error("Error Supabase:", error);
      return NextResponse.json(
        { error: "Error al guardar peticion" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
