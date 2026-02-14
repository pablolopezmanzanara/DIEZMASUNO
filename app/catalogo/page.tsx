"use client";

import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

const productos = [
  {
    id: 1,
    slug: "raul-gonzalez-blanco",
    nombre: "Raúl González Blanco",
    equipo: "Real Madrid C.F.",
    año: "1994–2010",
    descripcion:
      "La leyenda blanca. Máximo goleador histórico del Real Madrid durante más de una década.",
    precio: 49,
    dorsal: "7",
    color: "linear-gradient(160deg, #1a3a2a, #0d2518)",
    badge: "Destacado",
    categoria: "real-madrid",
  },
  {
    id: 2,
    slug: "rivaldo",
    nombre: "Rivaldo",
    equipo: "F.C. Barcelona",
    año: "1997–2002",
    descripcion:
      "Balón de Oro 1999. Uno de los jugadores más elegantes que ha visto el Camp Nou.",
    precio: 39,
    dorsal: "10",
    color: "linear-gradient(160deg, #2c1a4a, #1a0d30)",
    badge: null,
    categoria: "barcelona",
  },
  {
    id: 3,
    slug: "fernando-torres",
    nombre: "Fernando Torres",
    equipo: "Atlético de Madrid",
    año: "2001–2007",
    descripcion:
      "El Niño del Manzanares. Ídolo del Atlético antes de conquistar el mundo.",
    precio: 39,
    dorsal: "9",
    color: "linear-gradient(160deg, #1a2a3a, #0d1825)",
    badge: "Últimas unidades",
    categoria: "atletico",
  },
  {
    id: 4,
    slug: "gaizka-mendieta",
    nombre: "Gaizka Mendieta",
    equipo: "Valencia C.F.",
    año: "1991–2001",
    descripcion:
      "El mejor mediapunta español de su generación. Dos finales de Champions con el Valencia.",
    precio: 35,
    dorsal: "8",
    color: "linear-gradient(160deg, #3a2a1a, #251a0d)",
    badge: null,
    categoria: "valencia",
  },
  {
    id: 5,
    slug: "ronaldo-nazario",
    nombre: "Ronaldo Nazário",
    equipo: "F.C. Barcelona",
    año: "1996–1997",
    descripcion:
      "Una sola temporada bastó para que el mundo se rindiera ante el Fenómeno.",
    precio: 49,
    dorsal: "9",
    color: "linear-gradient(160deg, #2c1a4a, #1a0d30)",
    badge: "Más vendido",
    categoria: "barcelona",
  },
  {
    id: 6,
    slug: "fernando-hierro",
    nombre: "Fernando Hierro",
    equipo: "Real Madrid C.F.",
    año: "1989–2003",
    descripcion: "Capitán y símbolo del Real Madrid durante más de una década.",
    precio: 35,
    dorsal: "6",
    color: "linear-gradient(160deg, #1a3a2a, #0d2518)",
    badge: null,
    categoria: "real-madrid",
  },
  {
    id: 7,
    slug: "roberto-carlos",
    nombre: "Roberto Carlos",
    equipo: "Real Madrid C.F.",
    año: "1996–2007",
    descripcion:
      "El lateral izquierdo más ofensivo de la historia. Sus golpeos cambiaron el fútbol.",
    precio: 39,
    dorsal: "3",
    color: "linear-gradient(160deg, #1a3a2a, #0d2518)",
    badge: null,
    categoria: "real-madrid",
  },
  {
    id: 8,
    slug: "luis-enrique",
    nombre: "Luis Enrique",
    equipo: "F.C. Barcelona",
    año: "1996–2004",
    descripcion:
      "Guerrero incansable que entregó todo por el escudo del Barça durante ocho temporadas.",
    precio: 35,
    dorsal: "21",
    color: "linear-gradient(160deg, #2c1a4a, #1a0d30)",
    badge: null,
    categoria: "barcelona",
  },
];

const categorias = [
  { id: "todos", label: "Todos" },
  { id: "real-madrid", label: "Real Madrid" },
  { id: "barcelona", label: "F.C. Barcelona" },
  { id: "atletico", label: "Atlético" },
  { id: "valencia", label: "Valencia" },
];

const ordenOpciones = [
  { id: "defecto", label: "Destacados" },
  { id: "precio-asc", label: "Precio: menor a mayor" },
  { id: "precio-desc", label: "Precio: mayor a menor" },
  { id: "nombre", label: "Nombre A–Z" },
];

export default function CatalogoPage() {
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [orden, setOrden] = useState("defecto");
  const { añadir, items } = useCarrito();

  const estaEnCarrito = (id: number) => items.some((i) => i.id === id);

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
      {/* ── CABECERA ── */}
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

      {/* ── FILTROS ── */}
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
                className="font-bebas text-[12px] tracking-[2px] px-4 py-2
                           rounded-sm transition-all hover:border-[var(--color-verde)]"
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
              className="font-bebas text-[12px] tracking-[1px] px-3 py-2
                         rounded-sm outline-none cursor-pointer"
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

      {/* ── GRID ── */}
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
              key={p.id}
              className="bg-white rounded-sm overflow-hidden cursor-pointer
                         transition-all duration-300 hover:-translate-y-1.5
                         hover:shadow-[0_24px_48px_rgba(26,58,42,0.15)] group"
            >
              <div
                style={{ background: p.color }}
                className="aspect-[3/4] flex items-center justify-center relative overflow-hidden"
              >
                <span
                  style={{ color: "rgba(255,255,255,0.08)" }}
                  className="font-bebas text-[80px] absolute top-2 right-3
                             leading-none select-none"
                >
                  {p.dorsal}
                </span>
                {p.badge && (
                  <span
                    style={{
                      background:
                        p.badge === "Destacado" || p.badge === "Más vendido"
                          ? "var(--color-rojo)"
                          : "var(--color-dorado-osc)",
                    }}
                    className="absolute top-3 left-3 text-white font-bebas
                               text-[10px] tracking-[2px] px-2.5 py-1 rounded-sm z-10"
                  >
                    {p.badge}
                  </span>
                )}
                <span
                  className="text-[64px] opacity-90 transition-transform
                                 duration-300 group-hover:scale-110"
                >
                  ⚽
                </span>
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
                  className="text-[12px] italic mb-1"
                >
                  {p.año}
                </div>
                <div
                  style={{ color: "var(--color-gris)" }}
                  className="text-[12px] leading-snug mb-4 line-clamp-2"
                >
                  {p.descripcion}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: "var(--color-verde)" }}
                    className="font-playfair font-bold text-[20px]"
                  >
                    {p.precio} €
                  </span>
                  <button
                    onClick={() =>
                      añadir({
                        id: p.id,
                        slug: p.slug,
                        nombre: p.nombre,
                        equipo: p.equipo,
                        dorsal: p.dorsal,
                        color: p.color,
                        formato: {
                          id: "50x70",
                          label: "50×70 cm",
                          precio: p.precio,
                        },
                      })
                    }
                    style={{
                      background: estaEnCarrito(p.id)
                        ? "var(--color-dorado)"
                        : "var(--color-verde)",
                      color: estaEnCarrito(p.id)
                        ? "var(--color-verde)"
                        : "var(--color-crema)",
                    }}
                    className="font-bebas text-[11px] tracking-[2px] px-3 py-2
                               rounded-sm transition-colors"
                  >
                    {estaEnCarrito(p.id) ? "✓ Añadido" : "Añadir"}
                  </button>
                </div>
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
