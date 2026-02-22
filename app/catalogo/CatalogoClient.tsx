"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";
import { useCarrito } from "../context/CarritoContext";

type Props = {
  productos: Producto[];
};

export default function CatalogoClient({ productos }: Props) {
  const [filtro, setFiltro] = useState<"todos" | "jugador" | "otro">("todos");
  const [aniadidos, setAniadidos] = useState<Set<string>>(new Set());
  const { aniadir } = useCarrito();

  const productosFiltrados =
    filtro === "todos" ? productos : productos.filter((p) => p.tipo === filtro);

  const handleAniadir = (p: Producto, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    aniadir(
      {
        id: parseInt(p._id.replace(/[^a-zA-Z0-9]/g, "").slice(0, 10)) || 0,
        slug: p.slug.current,
        nombre: p.nombre,
        equipo: p.equipo,
        dorsal: p.dorsal,
        color: "#FFFFFF",
        formato: {
          id: "50x70",
          label: "50×70 cm",
          precio: p.precio,
        },
      },
      1,
    );

    setAniadidos((prev) => new Set(prev).add(p._id));
  };

  return (
    <>
      {/* Barra de filtros minimalista responsive */}
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
            flexWrap: "wrap",
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
                className="filtro-btn"
                style={{
                  background: "transparent",
                  color:
                    filtro === value
                      ? "var(--color-verde)"
                      : "rgba(26, 58, 42, 0.5)",
                  border: "none",
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(20px, 4.5vw, 40px)",
                  fontWeight: filtro === value ? 700 : 400,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  padding: "clamp(6px, 2vw, 8px) clamp(16px, 4vw, 48px)",
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
                      left: "clamp(16px, 4vw, 48px)",
                      right: "clamp(16px, 4vw, 48px)",
                      height: "3px",
                      background: "var(--color-dorado)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </button>

              {index < 2 && (
                <div
                  style={{
                    width: "2px",
                    height: "clamp(32px, 6vw, 48px)",
                    background:
                      "linear-gradient(to bottom, transparent, var(--color-dorado), transparent)",
                    opacity: 0.6,
                  }}
                />
              )}
            </div>
          ))}
        </div>

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
          {productosFiltrados.map((p: Producto) => {
            const estaAniadido = aniadidos.has(p._id);

            return (
              <div
                key={p._id}
                className="producto-card"
                style={{
                  background: "white",
                  borderRadius: "4px",
                  overflow: "visible",
                  display: "block",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  position: "relative",
                }}
              >
                <Link
                  href={`/catalogo/${p.slug.current}`}
                  style={{ textDecoration: "none", display: "block" }}
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
                      borderRadius: "4px 4px 0 0",
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
                        <span style={{ fontSize: "64px", opacity: 0.9 }}>
                          ⚽
                        </span>
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
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
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
                          }}
                        >
                          {p.anio}
                        </div>
                      </div>

                      {/* Columna derecha: Precio y boton */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          minWidth: "80px",
                          marginTop: "-10px",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--color-verde)",
                            fontFamily: "var(--font-playfair)",
                            fontWeight: 700,
                            fontSize: "22px",
                            marginBottom: "8px",
                            marginRight: "10px",
                          }}
                        >
                          {p.precio} €
                        </span>

                        {/* Boton con capsula */}
                        <button
                          onClick={(e) => handleAniadir(p, e)}
                          disabled={estaAniadido}
                          style={{
                            background: estaAniadido
                              ? "rgba(201,168,76,0.15)"
                              : "rgba(26,58,42,0.08)",
                            border: estaAniadido
                              ? "1px solid rgba(201,168,76,0.3)"
                              : "1px solid rgba(26,58,42,0.2)",
                            color: estaAniadido
                              ? "var(--color-dorado-osc)"
                              : "var(--color-verde)",
                            fontFamily: "Georgia, serif",
                            fontSize: "14px",
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            cursor: estaAniadido ? "default" : "pointer",
                            padding: "8px 16px",
                            borderRadius: "20px",
                            transition: "all 0.3s",
                            opacity: estaAniadido ? 0.8 : 1,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={(e) => {
                            if (!estaAniadido) {
                              e.currentTarget.style.background =
                                "rgba(201,168,76,0.12)";
                              e.currentTarget.style.borderColor =
                                "rgba(201,168,76,0.4)";
                              e.currentTarget.style.color =
                                "var(--color-dorado-osc)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!estaAniadido) {
                              e.currentTarget.style.background =
                                "rgba(26,58,42,0.08)";
                              e.currentTarget.style.borderColor =
                                "rgba(26,58,42,0.2)";
                              e.currentTarget.style.color =
                                "var(--color-verde)";
                            }
                          }}
                        >
                          {estaAniadido ? "Añadido" : "Añadir"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
