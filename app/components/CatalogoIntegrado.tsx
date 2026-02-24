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

export default function CatalogoIntegrado({ productos }: Props) {
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
        slug: p.slug.current,
        nombre: p.nombre,
        equipo: p.equipo,
        dorsal: p.dorsal,
        color: "#FFFFFF",
        imagen: p.imagen,
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
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Barra de filtros */}
      <div style={{ marginBottom: "64px" }}>
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

      {/* Grid de tarjetas */}
      {productosFiltrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <p style={{ color: "var(--color-gris)", fontSize: "16px" }}>
            No hay cuadros en esta categoria todavia.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 420px)",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {productosFiltrados.map((p: Producto) => {
            const estaAniadido = aniadidos.has(p._id);

            return (
              <Link
                key={p._id}
                href={`/catalogo/${p.slug.current}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.3s",
                    display: "grid",
                    gridTemplateColumns: "240px 1fr",
                    height: "320px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.08)";
                  }}
                >
                  {/* Imagen - sin recortar */}
                  <div
                    style={{
                      background: "var(--color-verde)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {p.imagen ? (
                      <Image
                        src={urlFor(p.imagen).width(240).height(320).url()}
                        alt={p.nombre}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <span style={{ fontSize: "64px", opacity: 0.3 }}>
                          ⚽
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info - panel derecho más estrecho */}
                  <div
                    style={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: "var(--color-gris)",
                          fontFamily: "var(--font-bebas)",
                          fontSize: "9px",
                          letterSpacing: "2px",
                          marginBottom: "8px",
                        }}
                      >
                        {p.equipo}
                      </div>
                      <div
                        style={{
                          color: "var(--color-tinta)",
                          fontFamily: "var(--font-playfair)",
                          fontWeight: 700,
                          fontSize: "16px",
                          marginBottom: "6px",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.nombre}
                      </div>
                      <div
                        style={{
                          color: "var(--color-gris)",
                          fontSize: "12px",
                          fontStyle: "italic",
                        }}
                      >
                        {p.anio}
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          color: "var(--color-verde)",
                          fontFamily: "var(--font-playfair)",
                          fontWeight: 700,
                          fontSize: "24px",
                          marginBottom: "12px",
                        }}
                      >
                        {p.precio} €
                      </div>

                      <button
                        onClick={(e) => handleAniadir(p, e)}
                        disabled={estaAniadido}
                        style={{
                          width: "100%",
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
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                          cursor: estaAniadido ? "default" : "pointer",
                          padding: "10px 16px",
                          borderRadius: "20px",
                          transition: "all 0.3s",
                          opacity: estaAniadido ? 0.8 : 1,
                        }}
                      >
                        {estaAniadido ? "Anadido" : "Anadir"}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
