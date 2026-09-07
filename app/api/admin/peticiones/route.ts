import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // .trim() evita fallos por espacios o saltos de linea invisibles que se
  // cuelan al copiar la contraseña desde un archivo .env.
  const esperada = process.env.ADMIN_PASSWORD?.trim();
  if (!esperada || password?.trim() !== esperada) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("peticiones")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ peticiones: data });
  } catch (err) {
    console.error("Error cargando peticiones:", err);
    return NextResponse.json(
      { error: "Error cargando peticiones" },
      { status: 500 },
    );
  }
}
