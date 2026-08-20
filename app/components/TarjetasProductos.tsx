"use client";

import { useState } from "react";
import { type Producto } from "../lib/queries";
import { useCarrito } from "../context/CarritoContext";
import { trackAddToCart } from "../lib/analytics";
import ProductCard from "./ProductCard";
import CromosDestacados from "./CromosDestacados";

type Props = {
  productos: Producto[];
  destacados: Producto[];
};

export default function TarjetasProductos({ productos, destacados }: Props) {
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
      <CromosDestacados productos={destacados} />

      {/* Título */}
      <h2 className="texto-eyebrow">Toda la colección</h2>

      {/* Grid de tarjetas */}
      <div className="productos-grid cromo">
        {productos.map((p, i) => (
          <ProductCard
            key={p._id}
            producto={p}
            estaAniadido={aniadidos.has(p._id)}
            onAniadir={handleAniadir}
            numero={i + 1}
          />
        ))}
      </div>
    </div>
  );
}
