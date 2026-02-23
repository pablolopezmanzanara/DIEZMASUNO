"use client";

import { useState, useEffect } from "react";
import { getSupabaseClient } from "../../lib/supabase";

type Peticion = {
  id: number;
  nombre_jugador: string;
  equipo: string | null;
  epoca: string | null;
  email_usuario: string | null;
  detalles: string | null;
  created_at: string;
};

export default function AdminPeticionesPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [peticiones, setPeticiones] = useState<Peticion[]>([]);
  const [cargando, setCargando] = useState(false);

  const handleLogin = () => {
    if (password === "aubameyang2015") {
      setAutenticado(true);
      cargarPeticiones();
    }
  };

  const cargarPeticiones = async () => {
    setCargando(true);
    const supabase = getSupabaseClient();
    const { data } = await supabase
      .from("peticiones")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (data) setPeticiones(data);
    setCargando(false);
  };

  if (!autenticado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-crema)",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "4px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "24px",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Admin Peticiones
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Contrasena"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              background: "var(--color-verde)",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "var(--font-bebas)",
              letterSpacing: "2px",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "32px" }}>
          Peticiones de usuarios
        </h1>
        <button
          onClick={cargarPeticiones}
          style={{
            background: "var(--color-verde)",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "var(--font-bebas)",
            letterSpacing: "2px",
          }}
        >
          Recargar
        </button>
      </div>

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              background: "white",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <thead style={{ background: "var(--color-verde)", color: "white" }}>
              <tr>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Fecha
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Jugador
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Equipo
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Epoca
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    letterSpacing: "2px",
                  }}
                >
                  Detalles
                </th>
              </tr>
            </thead>
            <tbody>
              {peticiones.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px", fontSize: "13px" }}>
                    {new Date(p.created_at).toLocaleDateString("es-ES")}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {p.nombre_jugador}
                  </td>
                  <td style={{ padding: "12px", fontSize: "13px" }}>
                    {p.equipo || "-"}
                  </td>
                  <td style={{ padding: "12px", fontSize: "13px" }}>
                    {p.epoca || "-"}
                  </td>
                  <td style={{ padding: "12px", fontSize: "13px" }}>
                    {p.email_usuario || "-"}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      fontSize: "13px",
                      maxWidth: "300px",
                    }}
                  >
                    {p.detalles || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
