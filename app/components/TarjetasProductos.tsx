"use client";

import { type Producto } from "../lib/queries";
import ProductCard from "./ProductCard";
import CromosDestacados from "./CromosDestacados";

type Props = {
  productos: Producto[];
  destacados: Producto[];
};

export default function TarjetasProductos({ productos, destacados }: Props) {
  return (
    <div
      id="coleccion"
      className="tarjetas-seccion"
      style={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      <CromosDestacados productos={destacados} />

      {/* Título */}
      <h2 id="todos-los-cuadros" className="texto-titulo-grid">
        Colección completa
      </h2>

      {/* Grid de tarjetas */}
      <div className="productos-grid cromo">
        {productos.map((p, i) => (
          <ProductCard key={p._id} producto={p} numero={i + 1} />
        ))}
      </div>
    </div>
  );
}
