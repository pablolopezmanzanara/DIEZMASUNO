"use client";

import { useState } from "react";
import Image from "next/image";
import { useCarrito } from "../../context/CarritoContext";
import { type Producto } from "../../lib/queries";
import { urlFor } from "../../lib/sanity";

type Props = {
  producto: Producto;
};

export default function DetalleClient({ producto }: Props) {
  const [cantidad, setCantidad] = useState(1);
  const [imagenActual, setImagenActual] = useState(0);
  const { aniadir } = useCarrito();
  const [aniadido, setAniadido] = useState(false);

  // Array de imágenes - combina imagen principal + galería
  const imagenes = [
    ...(producto.imagen ? [producto.imagen] : []),
    ...(producto.galeria || []),
  ];

  const handleAniadir = () => {
    aniadir(
      {
        slug: producto.slug.current,
        nombre: producto.nombre,
        equipo: producto.equipo,
        dorsal: producto.dorsal,
        color: "#FFFFFF",
        imagen: producto.imagen,
        formato: {
          id: "50x70",
          label: "50×70 cm",
          precio: producto.precio,
        },
      },
      cantidad,
    );
    setAniadido(true);
    setTimeout(() => setAniadido(false), 2000);
  };

  const siguiente = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "80px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 24px",
      }}
      className="detalle-grid"
    >
      {/* Galería de imágenes con flechas */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Imagen */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "500px",
            aspectRatio: "3/4",
            background: "var(--color-verde)",
            borderRadius: "4px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            marginBottom: "20px",
          }}
          className="detalle-imagen-container"
        >
          {imagenes.length > 0 ? (
            <Image
              src={urlFor(imagenes[imagenActual]).width(600).height(800).url()}
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

        {/* Flechas navegación - solo si hay más de 1 imagen */}
        {imagenes.length > 1 && (
          <>
            <button
              onClick={anterior}
              className="flecha-detalle-izq"
              style={{
                position: "absolute",
                left: "-85px",
                top: "45%",
                transform: "translateY(-50%)",
                background: "white",
                border: "none",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "var(--color-verde)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-dorado)";
                e.currentTarget.style.color = "var(--color-verde)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "var(--color-verde)";
              }}
            >
              ←
            </button>
            <button
              onClick={siguiente}
              className="flecha-detalle-der"
              style={{
                position: "absolute",
                right: "-85px",
                top: "45%",
                transform: "translateY(-50%)",
                background: "white",
                border: "none",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                color: "var(--color-verde)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-dorado)";
                e.currentTarget.style.color = "var(--color-verde)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "var(--color-verde)";
              }}
            >
              →
            </button>
          </>
        )}

        {/* Indicador de imagen actual - debajo */}
        {imagenes.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            {imagenes.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === imagenActual ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background:
                    i === imagenActual
                      ? "var(--color-dorado)"
                      : "rgba(26,58,42,0.3)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setImagenActual(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info y compra */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "40px",
        }}
      >
        <div
          style={{
            color: "var(--color-gris)",
            fontFamily: "var(--font-bebas)",
            fontSize: "11px",
            letterSpacing: "4px",
            marginBottom: "8px",
          }}
        >
          {producto.equipo}
        </div>

        <h1
          style={{
            color: "var(--color-tinta)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          {producto.nombre}
        </h1>

        <div
          style={{
            color: "var(--color-gris)",
            fontSize: "15px",
            fontStyle: "italic",
            marginBottom: "24px",
          }}
        >
          {producto.anio}
        </div>

        <div
          style={{
            color: "var(--color-verde)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 700,
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          {producto.precio} €
        </div>

        <div
          style={{
            background: "var(--color-crema)",
            padding: "12px 16px",
            borderRadius: "2px",
            borderLeft: "3px solid var(--color-dorado)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              color: "var(--color-gris)",
              fontSize: "13px",
            }}
          >
            <strong>Formato:</strong> 21x29 cm · Dimensión A4
          </div>
        </div>

        <p
          style={{
            color: "var(--color-gris)",
            fontSize: "14px",
            lineHeight: 1.7,
            marginBottom: "24px",
          }}
        >
          {producto.descripcion}
        </p>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-bebas)",
              fontSize: "12px",
              letterSpacing: "3px",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Cantidad
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              style={{
                background: "var(--color-crema-osc)",
                border: "none",
                width: "36px",
                height: "36px",
                borderRadius: "2px",
                cursor: "pointer",
                fontFamily: "var(--font-bebas)",
                fontSize: "18px",
                color: "var(--color-verde)",
              }}
            >
              −
            </button>
            <span
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "16px",
                fontWeight: 700,
                minWidth: "30px",
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
                width: "36px",
                height: "36px",
                borderRadius: "2px",
                cursor: "pointer",
                fontFamily: "var(--font-bebas)",
                fontSize: "18px",
                color: "var(--color-verde)",
              }}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAniadir}
          className="boton-anadir-detalle"
          style={{
            background: aniadido ? "var(--color-dorado)" : "var(--color-verde)",
            color: "var(--color-crema)",
            border: "none",
            fontFamily: "var(--font-bebas)",
            fontSize: "15px",
            letterSpacing: "3px",
            padding: "16px 36px",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.3s",
            marginBottom: "20px",
          }}
        >
          {aniadido ? "✓ AÑADIDO AL CARRITO" : "AÑADIR AL CARRITO"}
        </button>

        <div
          className="iconos-detalle"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            fontSize: "12px",
            color: "var(--color-gris)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>📦</div>
            <div>Envio 2-4 dias</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>✓</div>
            <div>Alta calidad</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "20px", marginBottom: "4px" }}>🔒</div>
            <div>Devolucion 30d</div>
          </div>
        </div>
      </div>
    </div>
  );
}
