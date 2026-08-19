"use client";

import { useState } from "react";
import { type Producto } from "../lib/queries";
import { useCarrito } from "../context/CarritoContext";
import { trackAddToCart } from "../lib/analytics";
import ProductCard from "./ProductCard";

type Props = {
  productos: Producto[];
};

export default function TarjetasProductos({ productos }: Props) {
  const [aniadidos, setAniadidos] = useState<Set<string>>(new Set());
  const { aniadir } = useCarrito();

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
    trackAddToCart(p, 1);

    setAniadidos((prev) => new Set(prev).add(p._id));
  };

  return (
    <div
      id="coleccion"
      className="tarjetas-seccion"
      style={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      {/* Título */}
      <div
        style={{
          marginBottom: "64px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "15%",
          }}
        >
          <div
            style={{
              color: "var(--color-dorado-osc)",
              fontFamily: "var(--font-bebas)",
              fontSize: "11px",
              letterSpacing: "5px",
              marginBottom: "10px",
            }}
          >
            Coleccion 2025 · Temporada I
          </div>
          <h2
            style={{
              color: "var(--color-verde)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(28px,4vw,44px)",
              lineHeight: 1.1,
            }}
          >
            Edición{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--color-dorado-osc)",
              }}
            >
              limitada
            </em>
          </h2>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="productos-grid cromo">
        {productos.map((p, i) => (
          <ProductCard
            key={p._id}
            producto={p}
            estaAniadido={aniadidos.has(p._id)}
            onAniadir={handleAniadir}
            variante="cromo"
            numero={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
