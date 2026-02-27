/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";
import { useCarrito } from "../context/CarritoContext";

type Props = {
  productos: Producto[];
};

export default function TarjetasProductos({ productos }: Props) {
  const [aniadidos, setAniadidos] = useState<Set<string>>(new Set());
  const [imagenesActuales, setImagenesActuales] = useState<Map<string, number>>(
    new Map(),
  );
  const [animacionesUsadas, setAnimacionesUsadas] = useState<Set<string>>(
    new Set(),
  ); // NUEVO
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

    setAniadidos((prev) => new Set(prev).add(p._id));
  };

  const cambiarImagen = (productoId: string, imagenes: any[]) => {
    setImagenesActuales((prev) => {
      const nuevo = new Map(prev);
      const actual = nuevo.get(productoId) || 0;
      nuevo.set(productoId, (actual + 1) % imagenes.length);
      return nuevo;
    });
  };

  const marcarAnimacionUsada = (productoId: string) => {
    setAnimacionesUsadas((prev) => new Set(prev).add(productoId));
  };

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Título */}
      <div style={{ marginBottom: "48px" }}>
        <div
          style={{
            color: "var(--color-dorado-osc)",
            fontFamily: "var(--font-bebas)",
            fontSize: "11px",
            letterSpacing: "5px",
            marginBottom: "10px",
          }}
        >
          Descubre
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
          Algunos de nuestros{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "var(--color-dorado-osc)",
            }}
          >
            cuadros
          </em>
        </h2>
      </div>

      {/* Grid de tarjetas */}
      <div
        className="tarjetas-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 500px)",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {productos.map((p: Producto) => {
          const estaAniadido = aniadidos.has(p._id);
          const imagenes = [
            ...(p.imagen ? [p.imagen] : []),
            ...(p.galeria || []),
          ];
          const imagenActual = imagenesActuales.get(p._id) || 0;
          const animacionDisponible = !animacionesUsadas.has(p._id); // NUEVO

          return (
            <TarjetaProducto
              key={p._id}
              producto={p}
              estaAniadido={estaAniadido}
              imagenes={imagenes}
              imagenActual={imagenActual}
              animacionDisponible={animacionDisponible} // NUEVO
              onAniadir={handleAniadir}
              onCambiarImagen={() => cambiarImagen(p._id, imagenes)}
              onMarcarAnimacionUsada={() => marcarAnimacionUsada(p._id)} // NUEVO
            />
          );
        })}
      </div>
    </div>
  );
}

// Componente tarjeta individual
function TarjetaProducto({
  producto,
  estaAniadido,
  imagenes,
  imagenActual,
  animacionDisponible,
  onAniadir,
  onCambiarImagen,
  onMarcarAnimacionUsada,
}: {
  producto: any;
  estaAniadido: boolean;
  imagenes: any[];
  imagenActual: number;
  animacionDisponible: boolean;
  onAniadir: (p: any, e: React.MouseEvent) => void;
  onCambiarImagen: () => void;
  onMarcarAnimacionUsada: () => void;
}) {
  const [hover, setHover] = useState(false);
  const [mostrarFlechas, setMostrarFlechas] = useState(false);
  const [enTercioCentral, setEnTercioCentral] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const flechasTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Hover en desktop - cambiar imagen solo si animación disponible
  useEffect(() => {
    if (imagenes.length <= 1 || !animacionDisponible) return;

    const esDesktop = window.innerWidth > 768;
    if (!esDesktop) return;

    if (hover) {
      // Iniciar autoplay
      intervalRef.current = setInterval(() => {
        onCambiarImagen();
      }, 1500);

      // Mostrar flechas 1 segundo después
      flechasTimeoutRef.current = setTimeout(() => {
        setMostrarFlechas(true);
      }, 1000);

      // Marcar como usada después del primer cambio
      setTimeout(() => {
        onMarcarAnimacionUsada();
      }, 1500);
    } else {
      // Limpiar al quitar hover
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (flechasTimeoutRef.current) {
        clearTimeout(flechasTimeoutRef.current);
        flechasTimeoutRef.current = null;
      }
      setTimeout(() => setMostrarFlechas(false), 0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (flechasTimeoutRef.current) clearTimeout(flechasTimeoutRef.current);
    };
  }, [
    hover,
    imagenes.length,
    animacionDisponible,
    onCambiarImagen,
    onMarcarAnimacionUsada,
  ]);

  // IntersectionObserver móvil - solo si animación disponible
  useEffect(() => {
    if (imagenes.length <= 1 || !animacionDisponible) return;
    if (typeof window === "undefined") return;

    const esMobile = window.innerWidth <= 768;
    if (!esMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        const cardCenter = rect.top + rect.height / 2;
        const relativePosition = cardCenter / viewportHeight;

        const estaCentrado =
          relativePosition >= 0.33 && relativePosition <= 0.66;
        setEnTercioCentral(estaCentrado);

        // Autoplay solo una vez
        if (estaCentrado) {
          setTimeout(() => {
            onCambiarImagen();
            onMarcarAnimacionUsada();
            // Mostrar flechas 1 segundo después
            setTimeout(() => {
              setMostrarFlechas(true);
            }, 1000);
          }, 2000);
        }

        // Ocultar flechas si sale del tercio central
        if (!estaCentrado) {
          setTimeout(() => setMostrarFlechas(false), 0);
        }
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [
    imagenes.length,
    animacionDisponible,
    onCambiarImagen,
    onMarcarAnimacionUsada,
  ]);

  const esMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const mostrarFlechasActual = esMobile
    ? mostrarFlechas && enTercioCentral
    : mostrarFlechas && hover;

  return (
    <div ref={cardRef} className="tarjeta-producto">
      <Link
        href={`/catalogo/${producto.slug.current}`}
        style={{ textDecoration: "none" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.3s",
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            height: "400px",
            cursor: "pointer",
            position: "relative",
          }}
          className="tarjeta-interior"
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* Imagen */}
          <div
            style={{
              background: "var(--color-verde)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {imagenes.length > 0 ? (
              <Image
                src={urlFor(imagenes[imagenActual])
                  .width(300)
                  .height(400)
                  .url()}
                alt={producto.nombre}
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
                <span style={{ fontSize: "64px", opacity: 0.3 }}>⚽</span>
              </div>
            )}

            {/* Flechas - desktop: solo con hover, móvil: solo en tercio central */}
            {mostrarFlechasActual && imagenes.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCambiarImagen();
                  }}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: "var(--color-verde)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    zIndex: 10,
                  }}
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCambiarImagen();
                  }}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: "var(--color-verde)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    zIndex: 10,
                  }}
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Panel info */}
          <div
            style={{
              padding: "24px",
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
                  fontSize: "10px",
                  letterSpacing: "2px",
                  marginBottom: "8px",
                }}
              >
                {producto.equipo}
              </div>
              <div
                style={{
                  color: "var(--color-tinta)",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "18px",
                  marginBottom: "6px",
                  lineHeight: 1.2,
                }}
              >
                {producto.nombre}
              </div>
              <div
                style={{
                  color: "var(--color-gris)",
                  fontSize: "13px",
                  fontStyle: "italic",
                }}
              >
                {producto.anio}
              </div>
            </div>

            <div>
              <div
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "28px",
                  marginBottom: "12px",
                }}
              >
                {producto.precio} €
              </div>

              <button
                onClick={(e) => onAniadir(producto, e)}
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
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  cursor: estaAniadido ? "default" : "pointer",
                  padding: "12px 16px",
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
    </div>
  );
}
