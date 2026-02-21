"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  productos: Producto[];
};

export default function CatalogoClient({ productos }: Props) {
  const [filtro, setFiltro] = useState<"todos" | "jugador" | "otro">("todos");

  const productosFiltrados =
    filtro === "todos" ? productos : productos.filter((p) => p.tipo === filtro);

  return (
    <>
      {/* Barra de filtros minimalista */}
      <div
        style={{
          marginBottom: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
          }}
        >
          {[
            ["Todos", "todos"],
            ["Jugadores", "jugador"],
            ["Otros", "otro"],
          ].map(([label, value], index) => (
            <div key={value} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => setFiltro(value as "todos" | "jugador" | "otro")}
                style={{
                  background: "transparent",
                  color:
                    filtro === value
                      ? "var(--color-verde)"
                      : "rgba(26, 58, 42, 0.5)",
                  border: "none",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "40px", // era 32px
                  fontWeight: filtro === value ? 700 : 400,
                  fontStyle: "italic",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: "8px 48px", // era 40px
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (filtro !== value) {
                    e.currentTarget.style.color = "var(--color-verde)";
                    e.currentTarget.style.opacity = "0.8";
                  }
                }}
                onMouseLeave={(e) => {
                  if (filtro !== value) {
                    e.currentTarget.style.color = "rgba(26, 58, 42, 0.5)";
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                {label}
                {filtro === value && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "40px",
                      right: "40px",
                      height: "3px",
                      background: "var(--color-dorado)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </button>

              {/* Separador vertical dorado - no después del último */}
              {index < 2 && (
                <div
                  style={{
                    width: "2px",
                    height: "48px", // era 40px
                    background:
                      "linear-gradient(to bottom, transparent, var(--color-dorado), transparent)",
                    opacity: 0.6,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Contador de resultados */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            color: "var(--color-gris)",
            fontSize: "13px",
            fontFamily: "var(--font-bebas)",
            letterSpacing: "3px",
          }}
        >
          {productosFiltrados.length}{" "}
          {productosFiltrados.length === 1 ? "CUADRO" : "CUADROS"}
        </div>
      </div>

      {/* Grid de productos */}
      {productosFiltrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ color: "var(--color-gris)", fontSize: "16px" }}>
            No hay cuadros en esta categoría todavía.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 320px)",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {productosFiltrados.map((p: Producto) => (
            <Link
              key={p._id}
              href={`/catalogo/${p.slug.current}`}
              style={{
                textDecoration: "none",
                background: "white",
                borderRadius: "4px",
                overflow: "hidden",
                display: "block",
                transition: "all 0.3s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  background: "var(--color-verde)",
                  position: "relative",
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {p.imagen ? (
                  <Image
                    src={urlFor(p.imagen).width(400).height(533).url()}
                    alt={p.nombre}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.08)",
                        fontFamily: "var(--font-bebas)",
                        fontSize: "80px",
                        position: "absolute",
                        top: "12px",
                        right: "16px",
                        lineHeight: 1,
                      }}
                    >
                      {p.dorsal}
                    </span>
                    <span style={{ fontSize: "64px", opacity: 0.9 }}>⚽</span>
                  </>
                )}
              </div>

              <div
                style={{
                  padding: "20px 22px 22px",
                  borderTop: "3px solid var(--color-crema-osc)",
                }}
              >
                <div
                  style={{
                    color: "var(--color-gris)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "10px",
                    letterSpacing: "3px",
                    marginBottom: "6px",
                  }}
                >
                  {p.equipo}
                </div>
                <div
                  style={{
                    color: "var(--color-tinta)",
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "18px",
                    marginBottom: "4px",
                    lineHeight: 1.2,
                  }}
                >
                  {p.nombre}
                </div>
                <div
                  style={{
                    color: "var(--color-gris)",
                    fontSize: "13px",
                    fontStyle: "italic",
                    marginBottom: "14px",
                  }}
                >
                  {p.anio}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-verde)",
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      fontSize: "22px",
                    }}
                  >
                    {p.precio} €
                  </span>
                  <span
                    style={{
                      color: "var(--color-verde)",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "12px",
                      letterSpacing: "2px",
                    }}
                  >
                    Ver cuadro →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
