"use client";

import { useState, useEffect } from "react";
import { getSupabaseClient } from "../../lib/supabase";

type Pedido = {
  id: string;
  stripe_session_id: string;
  email: string;
  total: number;
  estado: string;
  direccion: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  items: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  created_at: string;
};

export default function AdminPedidosPage() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "aubameyang2015") {
      setAutenticado(true);
      cargarPedidos();
    } else {
      setError("Contraseña incorrecta");
    }
  };

  const cargarPedidos = async () => {
    setCargando(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("pedidos")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setPedidos(data || []);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("Error cargando pedidos");
    }
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
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "4px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                background: "var(--color-dorado)",
                color: "var(--color-verde)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                margin: "0 auto 16px",
                lineHeight: "1.2",
              }}
            >
              10
              <br />
              +1
            </div>
            <h1
              style={{
                color: "var(--color-tinta)",
                fontFamily: "var(--font-playfair)",
                fontSize: "24px",
                margin: 0,
              }}
            >
              Panel de administración
            </h1>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--color-crema-osc)",
                borderRadius: "2px",
                fontSize: "14px",
                marginBottom: "16px",
                boxSizing: "border-box",
              }}
            />
            {error && (
              <p
                style={{
                  color: "var(--color-rojo)",
                  fontSize: "13px",
                  marginBottom: "16px",
                }}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: "100%",
                background: "var(--color-verde)",
                color: "var(--color-crema)",
                border: "none",
                padding: "14px",
                borderRadius: "2px",
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "2px",
                cursor: "pointer",
              }}
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-crema)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header compacto */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                color: "var(--color-tinta)",
                fontFamily: "var(--font-playfair)",
                fontSize: "28px",
                margin: "0 0 4px",
              }}
            >
              Pedidos recientes
            </h1>
            <p
              style={{
                color: "var(--color-gris)",
                fontSize: "13px",
                margin: 0,
              }}
            >
              {pedidos.length} pedidos encontrados
            </p>
          </div>
          <button
            onClick={cargarPedidos}
            disabled={cargando}
            style={{
              background: "var(--color-verde)",
              color: "var(--color-crema)",
              border: "none",
              padding: "10px 20px",
              borderRadius: "2px",
              fontFamily: "var(--font-bebas)",
              fontSize: "13px",
              letterSpacing: "2px",
              cursor: "pointer",
            }}
          >
            {cargando ? "Cargando..." : "Recargar"}
          </button>
        </div>

        {/* Tabla responsive */}
        <div
          style={{
            background: "white",
            borderRadius: "4px",
            overflow: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--color-verde)",
                  color: "var(--color-crema)",
                }}
              >
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Fecha
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Total
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Estado
                </th>
                <th
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ref
                </th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr
                  key={pedido.id}
                  style={{ borderBottom: "1px solid var(--color-crema-osc)" }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      color: "var(--color-gris)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(pedido.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "12px",
                      color: "var(--color-tinta)",
                    }}
                  >
                    {pedido.email}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "13px",
                      color: "var(--color-tinta)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {(pedido.total / 100).toFixed(2)} €
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        background: "var(--color-verde)",
                        color: "var(--color-crema)",
                        fontSize: "9px",
                        padding: "3px 6px",
                        borderRadius: "2px",
                        fontFamily: "var(--font-bebas)",
                        letterSpacing: "1px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pedido.estado.toUpperCase()}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontSize: "11px",
                      color: "var(--color-gris)",
                      fontFamily: "monospace",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #{pedido.stripe_session_id.slice(-8).toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pedidos.length === 0 && !cargando && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "var(--color-gris)",
              }}
            >
              <p style={{ fontSize: "14px", margin: 0 }}>
                No hay pedidos todavía
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
