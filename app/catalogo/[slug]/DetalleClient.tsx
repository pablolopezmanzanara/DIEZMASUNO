"use client";

import { useState } from "react";
import Image from "next/image";
import { useCarrito } from "../../context/CarritoContext";
import { type Producto } from "../../lib/queries";
import { urlFor } from "../../lib/sanity";

type Props = {
  producto: Producto;
};

const formatos = [
  { id: "a4", label: "A4 · 21×29 cm", multiplicador: 0.6 },
  { id: "a3", label: "A3 · 30×42 cm", multiplicador: 0.8 },
  { id: "50x70", label: "50×70 cm", multiplicador: 1 },
  { id: "70x100", label: "70×100 cm", multiplicador: 1.4 },
];

export default function DetalleClient({ producto }: Props) {
  const [formatoSeleccionado, setFormatoSeleccionado] = useState(formatos[2]);
  const [cantidad, setCantidad] = useState(1);
  const { aniadir } = useCarrito();
  const [aniadido, setAniadido] = useState(false);

  const precioFinal = Math.round(
    producto.precio * formatoSeleccionado.multiplicador,
  );

  const handleAniadir = () => {
    aniadir(
      {
        id: Date.now(),
        slug: producto.slug.current,
        nombre: producto.nombre,
        equipo: producto.equipo,
        dorsal: producto.dorsal,
        color: "#FFFFFF",
        formato: {
          id: formatoSeleccionado.id,
          label: formatoSeleccionado.label,
          precio: precioFinal,
        },
      },
      cantidad,
    ); // <-- Aquí va cantidad como segundo parámetro

    setAniadido(true);
    setTimeout(() => setAniadido(false), 2000);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "80px 24px",
      }}
      className="detalle-grid"
    >
      {/* Imagen */}
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          background: "var(--color-verde)",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {producto.imagen ? (
          <Image
            src={urlFor(producto.imagen).width(600).height(800).url()}
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
            <span style={{ fontSize: "120px", opacity: 0.3 }}>⚽</span>
          </div>
        )}
      </div>

      {/* Info y compra */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Equipo */}
        <div
          style={{
            color: "var(--color-gris)",
            fontFamily: "var(--font-bebas)",
            fontSize: "11px",
            letterSpacing: "4px",
            marginBottom: "12px",
          }}
        >
          {producto.equipo}
        </div>

        {/* Nombre */}
        <h1
          style={{
            color: "var(--color-tinta)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 48px)",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          {producto.nombre}
        </h1>

        {/* Precio */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              color: "var(--color-verde)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              fontSize: "36px",
            }}
          >
            {precioFinal} €
          </span>
          {formatoSeleccionado.multiplicador !== 1 && (
            <span
              style={{
                color: "var(--color-gris)",
                fontSize: "16px",
                textDecoration: "line-through",
              }}
            >
              {producto.precio} €
            </span>
          )}
        </div>

        {/* Descripción corta */}
        <p
          style={{
            color: "var(--color-gris)",
            fontSize: "15px",
            lineHeight: 1.7,
            marginBottom: "32px",
            borderLeft: "3px solid var(--color-dorado)",
            paddingLeft: "16px",
          }}
        >
          {producto.descripcion}
        </p>

        {/* Selector de formato */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-bebas)",
              fontSize: "12px",
              letterSpacing: "3px",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Tamaño
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {formatos.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormatoSeleccionado(f)}
                style={{
                  background:
                    formatoSeleccionado.id === f.id
                      ? "var(--color-verde)"
                      : "white",
                  color:
                    formatoSeleccionado.id === f.id
                      ? "var(--color-crema)"
                      : "var(--color-verde)",
                  border:
                    formatoSeleccionado.id === f.id
                      ? "none"
                      : "1px solid var(--color-verde)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "13px",
                  letterSpacing: "2px",
                  padding: "14px 20px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cantidad */}
        <div style={{ marginBottom: "32px" }}>
          <label
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-bebas)",
              fontSize: "12px",
              letterSpacing: "3px",
              display: "block",
              marginBottom: "12px",
            }}
          >
            Cantidad
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              style={{
                background: "var(--color-crema-osc)",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "2px",
                cursor: "pointer",
                fontFamily: "var(--font-bebas)",
                fontSize: "20px",
                color: "var(--color-verde)",
              }}
            >
              −
            </button>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "18px",
                fontWeight: 700,
                minWidth: "40px",
                textAlign: "center",
              }}
            >
              {cantidad}
            </span>
            <button
              onClick={() => setCantidad(cantidad + 1)}
              style={{
                background: "var(--color-crema-osc)",
                border: "none",
                width: "40px",
                height: "40px",
                borderRadius: "2px",
                cursor: "pointer",
                fontFamily: "var(--font-bebas)",
                fontSize: "20px",
                color: "var(--color-verde)",
              }}
            >
              +
            </button>
          </div>
        </div>

        {/* Botón añadir */}
        <button
          onClick={handleAniadir}
          style={{
            background: aniadido ? "var(--color-dorado)" : "var(--color-verde)",
            color: "var(--color-crema)",
            border: "none",
            fontFamily: "var(--font-bebas)",
            fontSize: "16px",
            letterSpacing: "3px",
            padding: "18px 40px",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.3s",
            marginBottom: "24px",
          }}
        >
          {aniadido ? "✓ AÑADIDO AL CARRITO" : "AÑADIR AL CARRITO"}
        </button>

        {/* Detalles adicionales */}
        <div
          style={{
            background: "var(--color-crema)",
            padding: "20px",
            borderRadius: "2px",
            borderLeft: "3px solid var(--color-dorado)",
          }}
        >
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "16px" }}>📦</span>
            <span style={{ color: "var(--color-gris)", fontSize: "13px" }}>
              Envío gratuito en 2-4 días
            </span>
          </div>
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "16px" }}>✓</span>
            <span style={{ color: "var(--color-gris)", fontSize: "13px" }}>
              Impresión de alta calidad
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "16px" }}>🔒</span>
            <span style={{ color: "var(--color-gris)", fontSize: "13px" }}>
              Devolución gratuita en 30 días
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
