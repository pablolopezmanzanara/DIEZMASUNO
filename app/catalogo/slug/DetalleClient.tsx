"use client";

import { useState } from "react";
import { useCarrito } from "../../context/CarritoContext";
import type { Producto } from "../../lib/queries";

type Formato = {
  id: string;
  label: string;
  precio: number;
};

export default function DetalleClient({
  producto,
  formatos,
}: {
  producto: Producto;
  formatos: Formato[];
}) {
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(formatos[2]);
  const [añadido, setAñadido] = useState(false);
  const { añadir } = useCarrito();

  const handleAñadir = () => {
    añadir({
      id:
        parseInt(producto._id.replace(/\D/g, "").slice(0, 8)) ||
        (Math.random() * 10000) | 0,
      slug: producto.slug.current,
      nombre: producto.nombre,
      equipo: producto.equipo,
      dorsal: producto.dorsal,
      color: "linear-gradient(160deg, #1a3a2a, #0d2518)",
      formato: formatoSeleccionado,
    });
    setAñadido(true);
    setTimeout(() => setAñadido(false), 2500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Cabecera */}
      <div>
        <div
          style={{
            color: "var(--color-dorado-osc)",
            fontFamily: "var(--font-bebas)",
            fontSize: "11px",
            letterSpacing: "4px",
            marginBottom: "8px",
          }}
        >
          {producto.equipo} · {producto.anio}
        </div>
        <h1
          style={{
            color: "var(--color-tinta)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(32px,4vw,52px)",
            lineHeight: 1.05,
            marginBottom: "16px",
          }}
        >
          {producto.nombre}
        </h1>
        <p
          style={{
            color: "var(--color-gris)",
            fontSize: "15px",
            lineHeight: 1.7,
          }}
        >
          {producto.descripcion}
        </p>
      </div>

      {/* Logros */}
      {producto.logros && producto.logros.length > 0 && (
        <div
          style={{
            borderTop: "1px solid var(--color-crema-osc)",
            borderBottom: "1px solid var(--color-crema-osc)",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-bebas)",
              fontSize: "11px",
              letterSpacing: "3px",
              marginBottom: "12px",
            }}
          >
            Palmarés destacado
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {producto.logros.map((logro, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{ color: "var(--color-dorado)", fontSize: "14px" }}
                >
                  ★
                </span>
                <span style={{ color: "var(--color-gris)", fontSize: "13px" }}>
                  {logro}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selector de formato */}
      <div>
        <div
          style={{
            color: "var(--color-tinta)",
            fontFamily: "var(--font-bebas)",
            fontSize: "11px",
            letterSpacing: "3px",
            marginBottom: "12px",
          }}
        >
          Formato
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {formatos.map((f) => (
            <button
              key={f.id}
              onClick={() => setFormatoSeleccionado(f)}
              style={{
                border: `2px solid ${formatoSeleccionado.id === f.id ? "var(--color-verde)" : "var(--color-crema-osc)"}`,
                background:
                  formatoSeleccionado.id === f.id
                    ? "var(--color-verde)"
                    : "white",
                color:
                  formatoSeleccionado.id === f.id
                    ? "var(--color-crema)"
                    : "var(--color-tinta)",
                padding: "12px",
                borderRadius: "2px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "12px",
                  letterSpacing: "1px",
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "18px",
                  marginTop: "4px",
                  color:
                    formatoSeleccionado.id === f.id
                      ? "var(--color-dorado)"
                      : "var(--color-verde)",
                }}
              >
                {f.precio} €
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Precio y CTA */}
      <div
        style={{
          background: "var(--color-crema-osc)",
          borderRadius: "2px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              color: "var(--color-gris)",
              fontSize: "12px",
              marginBottom: "4px",
            }}
          >
            {formatoSeleccionado.label}
          </div>
          <div
            style={{
              color: "var(--color-verde)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "36px",
              lineHeight: 1,
            }}
          >
            {formatoSeleccionado.precio} €
          </div>
        </div>
        <button
          onClick={handleAñadir}
          style={{
            background: añadido ? "var(--color-dorado)" : "var(--color-verde)",
            color: añadido ? "var(--color-verde)" : "var(--color-crema)",
            fontFamily: "var(--font-bebas)",
            fontSize: "15px",
            letterSpacing: "2px",
            padding: "16px 32px",
            borderRadius: "2px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            minWidth: "160px",
            textAlign: "center",
          }}
        >
          {añadido ? "✓ Añadido" : "Añadir al carrito"}
        </button>
      </div>

      {/* Garantías */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {[
          ["📦", "Envío gratuito en pedidos superiores a 50€"],
          ["🛡️", "Embalaje especial para cuadros, sin riesgo de daños"],
          ["↩️", "Devolución gratuita en 30 días"],
        ].map(([icon, text]) => (
          <div
            key={text}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <span style={{ fontSize: "16px" }}>{icon}</span>
            <span style={{ color: "var(--color-gris)", fontSize: "13px" }}>
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
