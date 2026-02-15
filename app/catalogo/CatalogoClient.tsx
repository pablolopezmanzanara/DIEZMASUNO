"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCarrito } from "../context/CarritoContext";
import { urlFor } from "../lib/sanity";
import type { Producto } from "../lib/queries";

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "real-madrid", label: "Real Madrid" },
  { id: "barcelona", label: "F.C. Barcelona" },
  { id: "atletico", label: "Atlético" },
  { id: "valencia", label: "Valencia" },
  { id: "otros", label: "Otros" },
];

const ordenOpciones = [
  { id: "defecto", label: "Destacados" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "nombre", label: "Nombre A–Z" },
];

export default function CatalogoClient({
  productos,
}: {
  productos: Producto[];
}) {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [orden, setOrden] = useState("defecto");
  const { añadir, items } = useCarrito();

  const estaEnCarrito = (id: string) =>
    items.some((i) => i.id === parseInt(id));

  const productosFiltrados = productos
    .filter(
      (p) => categoriaActiva === "todos" || p.categoria === categoriaActiva,
    )
    .sort((a, b) => {
      if (orden === "precio-asc") return a.precio - b.precio;
      if (orden === "precio-desc") return b.precio - a.precio;
      if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  return (
    <>
      {/* Cabecera */}
      <div
        style={{ background: "var(--color-verde)" }}
        className="py-16 px-6 relative overflow-hidden"
      >
        <span
          className="font-bebas absolute right-6 top-1/2 -translate-y-1/2
                         text-[160px] leading-none pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.04)" }}
        >
          COLECCIÓN
        </span>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div
            style={{ color: "var(--color-dorado)" }}
            className="font-bebas text-[11px] tracking-[5px] mb-3 flex items-center gap-3"
          >
            <span
              style={{ background: "var(--color-dorado)" }}
              className="block w-8 h-px"
            />
            Temporada I · 2025
          </div>
          <h1
            style={{ color: "var(--color-crema)" }}
            className="font-playfair font-black text-[clamp(36px,5vw,64px)] leading-[1.05]"
          >
            Colección <em style={{ color: "var(--color-dorado)" }}>activa</em>
          </h1>
          <p
            style={{ color: "rgba(245,239,224,0.6)" }}
            className="text-[15px] leading-relaxed mt-4 max-w-[480px]"
          >
            Edición limitada semanal. Cada viernes se renuevan los cuadros
            disponibles.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div
        style={{ background: "var(--color-crema-osc)" }}
        className="sticky top-[83px] z-40 px-6 py-4"
      >
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                style={{
                  background:
                    categoriaActiva === cat.id
                      ? "var(--color-verde)"
                      : "transparent",
                  color:
                    categoriaActiva === cat.id
                      ? "var(--color-crema)"
                      : "var(--color-tinta)",
                  border: `1px solid ${categoriaActiva === cat.id ? "var(--color-verde)" : "var(--color-crema-osc)"}`,
                }}
                className="font-bebas text-[12px] tracking-[2px] px-4 py-2 rounded-sm transition-all"
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span
              style={{ color: "var(--color-gris)" }}
              className="font-bebas text-[11px] tracking-[2px]"
            >
              Ordenar:
            </span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              style={{
                background: "white",
                color: "var(--color-tinta)",
                border: "1px solid var(--color-crema-osc)",
              }}
              className="font-bebas text-[12px] tracking-[1px] px-3 py-2 rounded-sm outline-none cursor-pointer"
            >
              {ordenOpciones.map((op) => (
                <option key={op.id} value={op.id}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-16 px-6 max-w-[1100px] mx-auto">
        <div
          style={{ color: "var(--color-gris)" }}
          className="font-bebas text-[12px] tracking-[2px] mb-8"
        >
          {productosFiltrados.length} cuadros disponibles
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-sm overflow-hidden cursor-pointer
                         transition-all duration-300 hover:-translate-y-1.5
                         hover:shadow-[0_24px_48px_rgba(26,58,42,0.15)] group"
            >
              <Link
                href={`/catalogo/${p.slug.current}`}
                className="no-underline"
              >
                <div
                  style={{ background: "var(--color-verde)" }}
                  className="aspect-[3/4] flex items-center justify-center relative overflow-hidden"
                >
                  {p.imagen ? (
                    <Image
                      src={urlFor(p.imagen).width(400).height(533).url()}
                      alt={p.nombre}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <span
                        style={{ color: "rgba(255,255,255,0.08)" }}
                        className="font-bebas text-[80px] absolute top-2 right-3 leading-none select-none"
                      >
                        {p.dorsal}
                      </span>
                      <span className="text-[64px] opacity-90 transition-transform duration-300 group-hover:scale-110">
                        ⚽
                      </span>
                    </>
                  )}
                  {p.badge && (
                    <span
                      style={{
                        background:
                          p.badge === "Destacado" || p.badge === "Más vendido"
                            ? "var(--color-rojo)"
                            : "var(--color-dorado-osc)",
                      }}
                      className="absolute top-3 left-3 text-white font-bebas text-[10px] tracking-[2px] px-2.5 py-1 rounded-sm z-10"
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div
                  style={{ borderTop: "3px solid var(--color-crema-osc)" }}
                  className="px-4 py-4"
                >
                  <div
                    style={{ color: "var(--color-gris)" }}
                    className="font-bebas text-[10px] tracking-[3px] mb-1"
                  >
                    {p.equipo}
                  </div>
                  <div
                    style={{ color: "var(--color-tinta)" }}
                    className="font-playfair font-bold text-[16px] leading-tight mb-1"
                  >
                    {p.nombre}
                  </div>
                  <div
                    style={{ color: "var(--color-gris)" }}
                    className="text-[12px] italic mb-4"
                  >
                    {p.anio}
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4 flex items-center justify-between">
                <span
                  style={{ color: "var(--color-verde)" }}
                  className="font-playfair font-bold text-[20px]"
                >
                  {p.precio} €
                </span>
                <button
                  onClick={() =>
                    añadir({
                      id:
                        parseInt(p._id.replace(/\D/g, "").slice(0, 8)) ||
                        (Math.random() * 1000) | 0,
                      slug: p.slug.current,
                      nombre: p.nombre,
                      equipo: p.equipo,
                      dorsal: p.dorsal,
                      color: "linear-gradient(160deg, #1a3a2a, #0d2518)",
                      formato: {
                        id: "50x70",
                        label: "50×70 cm",
                        precio: p.precio,
                      },
                    })
                  }
                  style={{
                    background: estaEnCarrito(p._id)
                      ? "var(--color-dorado)"
                      : "var(--color-verde)",
                    color: estaEnCarrito(p._id)
                      ? "var(--color-verde)"
                      : "var(--color-crema)",
                  }}
                  className="font-bebas text-[11px] tracking-[2px] px-3 py-2 rounded-sm transition-colors"
                >
                  {estaEnCarrito(p._id) ? "✓ Añadido" : "Añadir"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-24">
            <div
              style={{ color: "var(--color-dorado)" }}
              className="font-bebas text-[80px] leading-none mb-4 opacity-30"
            >
              10+1
            </div>
            <p
              style={{ color: "var(--color-gris)" }}
              className="font-playfair italic text-[18px]"
            >
              No hay cuadros en esta categoría esta semana.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
