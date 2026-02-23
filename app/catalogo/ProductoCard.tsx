"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  producto: Producto;
  estaAniadido: boolean;
  onAniadir: (p: Producto, e: React.MouseEvent) => void;
};

export default function ProductoCard({
  producto: p,
  estaAniadido,
  onAniadir,
}: Props) {
  const [vistaActual, setVistaActual] = useState<"diseno" | "visualizer">(
    "diseno",
  );
  const [hover, setHover] = useState(false);
  const [mostrarFlechas, setMostrarFlechas] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;

        // Calcular en qué tercio del viewport está la tarjeta
        const cardCenter = rect.top + rect.height / 2;
        const relativePosition = cardCenter / viewportHeight;

        // Mostrar flechas solo si está en el tercio central (33% a 66%)
        setMostrarFlechas(relativePosition >= 0.33 && relativePosition <= 0.66);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="producto-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
            background:
              vistaActual === "diseno" ? "var(--color-verde)" : "#f0f0f0",
            position: "relative",
            overflow: "hidden",
            aspectRatio: "3/4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px 4px 0 0",
          }}
        >
          {vistaActual === "diseno" ? (
            p.imagen ? (
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
            )
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "50%",
                  aspectRatio: "3/4",
                  background: "white",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  border: "8px solid #8B7355",
                }}
              >
                {p.imagen ? (
                  <Image
                    src={urlFor(p.imagen).width(200).height(267).url()}
                    alt={p.nombre}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
              </div>
            </div>
          )}

          {/* Flechas - desktop hover o movil scroll visible */}
          {(hover || mostrarFlechas) && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVistaActual("diseno");
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
                  opacity: vistaActual === "diseno" ? 0.3 : 1,
                  pointerEvents: vistaActual === "diseno" ? "none" : "auto",
                  zIndex: 10,
                }}
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setVistaActual("visualizer");
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
                  opacity: vistaActual === "visualizer" ? 0.3 : 1,
                  pointerEvents: vistaActual === "visualizer" ? "none" : "auto",
                  zIndex: 10,
                }}
              >
                →
              </button>
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

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "space-between",
                minWidth: "80px",
              }}
            >
              <span
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "22px",
                  marginBottom: "8px",
                }}
              >
                {p.precio} €
              </span>

              <button
                onClick={(e) => onAniadir(p, e)}
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
                    e.currentTarget.style.background = "rgba(201,168,76,0.12)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                    e.currentTarget.style.color = "var(--color-dorado-osc)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!estaAniadido) {
                    e.currentTarget.style.background = "rgba(26,58,42,0.08)";
                    e.currentTarget.style.borderColor = "rgba(26,58,42,0.2)";
                    e.currentTarget.style.color = "var(--color-verde)";
                  }
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
