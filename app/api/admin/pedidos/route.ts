import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../lib/supabaseAdmin";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  // .trim() evita fallos por espacios o saltos de linea invisibles que se
  // cuelan al copiar la contraseña desde un archivo .env.
  const esperada = process.env.ADMIN_PASSWORD?.trim();
  const recibida = password?.trim();
  if (!esperada || recibida !== esperada) {
    // DIAGNOSTICO TEMPORAL: no se expone la contraseña, solo si la variable
    // esta configurada y las longitudes, para localizar el fallo real.
    // Quitar en cuanto se resuelva.
    return NextResponse.json(
      {
        error: "No autorizado",
        debug: {
          envConfigurada: !!process.env.ADMIN_PASSWORD,
          envLongitud: esperada?.length ?? 0,
          recibidaLongitud: recibida?.length ?? 0,
        },
      },
      { status: 401 },
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ pedidos: data });
  } catch (err) {
    console.error("Error cargando pedidos:", err);
    return NextResponse.json(
      { error: "Error cargando pedidos" },
      { status: 500 },
    );
  }
}
