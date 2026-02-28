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
  );
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
      {/* Título con estilo colección activa */}
      <div
        style={{
          marginBottom: "64px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginInline: "40px",
        }}
      >
        <div>
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
            Edicion{" "}
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
          const animacionDisponible = !animacionesUsadas.has(p._id);

          return (
            <TarjetaProducto
              key={p._id}
              producto={p}
              estaAniadido={estaAniadido}
              imagenes={imagenes}
              imagenActual={imagenActual}
              animacionDisponible={animacionDisponible}
              onAniadir={handleAniadir}
              onCambiarImagen={() => cambiarImagen(p._id, imagenes)}
              onMarcarAnimacionUsada={() => marcarAnimacionUsada(p._id)}
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

  // === DESKTOP: Hover ===
  useEffect(() => {
    if (imagenes.length <= 1 || !animacionDisponible) return;

    const esDesktop = window.innerWidth > 768;
    if (!esDesktop) return;

    if (hover) {
      intervalRef.current = setInterval(() => {
        onCambiarImagen();
      }, 1500);

      flechasTimeoutRef.current = setTimeout(() => {
        setMostrarFlechas(true);
      }, 1000);

      setTimeout(() => {
        onMarcarAnimacionUsada();
      }, 1500);
    } else {
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

  // === MÓVIL: IntersectionObserver + Timer ===
  useEffect(() => {
    if (imagenes.length <= 1) return;
    if (typeof window === "undefined") return;

    const esMobile = window.innerWidth <= 768;
    if (!esMobile) return;

    const headerHeight = 70;
    let timerEnCentro: NodeJS.Timeout | null = null;
    let enCentroDesdeInicio = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight - headerHeight;
        const cardCenter = rect.top - headerHeight + rect.height / 2;
        const relativePosition = cardCenter / viewportHeight;

        const estaCentrado =
          relativePosition >= 0.33 && relativePosition <= 0.66;
        setEnTercioCentral(estaCentrado);

        if (estaCentrado) {
          // ENTRÓ al tercio central

          if (animacionDisponible && !enCentroDesdeInicio) {
            // Primera vez en centro CON animación disponible
            enCentroDesdeInicio = true;

            // Esperar 1.5s → cambiar imagen
            timerEnCentro = setTimeout(() => {
              onCambiarImagen();
              onMarcarAnimacionUsada();

              // Esperar 1s más → mostrar flechas
              setTimeout(() => {
                setMostrarFlechas(true);
              }, 1000);
            }, 1500);
          } else if (!animacionDisponible) {
            // Ya se usó la animación, mostrar flechas inmediatamente
            setMostrarFlechas(true);
          }
        } else {
          // SALIÓ del tercio central

          // Cancelar timer si estaba esperando
          if (timerEnCentro) {
            clearTimeout(timerEnCentro);
            timerEnCentro = null;
          }

          // Resetear flag
          enCentroDesdeInicio = false;

          // Ocultar flechas
          setMostrarFlechas(false);
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
      if (timerEnCentro) {
        clearTimeout(timerEnCentro);
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

            {/* Flechas */}
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

          {/* Panel info - con las clases y estructura correcta */}
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
                className="equipo-text"
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
                className="nombre-text"
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
                className="anio-text"
                style={{
                  color: "var(--color-gris)",
                  fontSize: "13px",
                  fontStyle: "italic",
                }}
              >
                {producto.anio}
              </div>
            </div>

            <div
              className="columna-derecha"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                className="precio-text"
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "28px",
                }}
              >
                {producto.precio} €
              </div>

              <button
                onClick={(e) => onAniadir(producto, e)}
                disabled={estaAniadido}
                className="boton-anadir"
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
                  whiteSpace: "nowrap",
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
}
