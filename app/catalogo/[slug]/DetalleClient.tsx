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
  const [vista, setVista] = useState<"diseno" | "visualizer">("diseno");
  const { aniadir } = useCarrito();
  const [aniadido, setAniadido] = useState(false);

  const handleAniadir = () => {
    aniadir(
      {
        slug: producto.slug.current,
        nombre: producto.nombre,
        equipo: producto.equipo,
        dorsal: producto.dorsal,
        color: "#FFFFFF",
        imagen: producto.imagen, // AÑADIR ESTA LÍNEA
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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "60px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "60px 24px",
      }}
      className="detalle-grid"
    >
      {/* Columna izquierda: Tabs fijos + Imagen centrada */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Tabs DISENO / VISUALIZER - fijos arriba */}
        <div
          className="detalle-tabs"
          style={{
            display: "flex",
            gap: "24px",
            marginBottom: "24px",
            justifyContent: "center",
          }}
        >
          {[
            ["DISENO", "diseno"],
            ["VISUALIZER", "visualizer"],
          ].map(([label, value]) => (
            <button
              key={value}
              onClick={() => setVista(value as "diseno" | "visualizer")}
              style={{
                background: "transparent",
                color:
                  vista === value
                    ? "var(--color-verde)"
                    : "rgba(26, 58, 42, 0.4)",
                border: "none",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: vista === value ? 700 : 400,
                cursor: "pointer",
                transition: "all 0.3s",
                padding: "8px 16px",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (vista !== value) {
                  e.currentTarget.style.color = "var(--color-verde)";
                  e.currentTarget.style.opacity = "0.7";
                }
              }}
              onMouseLeave={(e) => {
                if (vista !== value) {
                  e.currentTarget.style.color = "rgba(26, 58, 42, 0.4)";
                  e.currentTarget.style.opacity = "1";
                }
              }}
            >
              {label}
              {vista === value && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "16px",
                    right: "16px",
                    height: "3px",
                    background: "var(--color-dorado)",
                    borderRadius: "2px",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Contenedor de imagen - centrado y con limites verticales */}
        <div
          className="detalle-imagen"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: vista === "diseno" ? "500px" : "100%",
              aspectRatio: vista === "diseno" ? "3/4" : "16/10",
              background: vista === "diseno" ? "var(--color-verde)" : "#f0f0f0",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            {vista === "diseno" ? (
              producto.imagen ? (
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
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {/* Simulacion pared con cuadro */}
                <div
                  style={{
                    position: "absolute",
                    width: "40%",
                    aspectRatio: "3/4",
                    background: "white",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                    border: "12px solid #8B7355",
                    borderRadius: "2px",
                  }}
                >
                  {producto.imagen ? (
                    <Image
                      src={urlFor(producto.imagen).width(400).height(533).url()}
                      alt={producto.nombre}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "var(--color-verde)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ fontSize: "48px", opacity: 0.3 }}>⚽</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Columna derecha: Info y compra */}
      <div
        className="detalle-info"
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
            marginBottom: "8px",
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
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          {producto.nombre}
        </h1>

        {/* Anio */}
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

        {/* Precio */}
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

        {/* Info formato */}
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
            <strong>Formato:</strong> 50×70 cm · Impresion de alta calidad
          </div>
        </div>

        {/* Descripcion corta */}
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

        {/* Cantidad */}
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

        {/* Boton aniadir */}
        <button
          onClick={handleAniadir}
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
          {aniadido ? "✓ ANADIDO AL CARRITO" : "ANADIR AL CARRITO"}
        </button>

        {/* Detalles adicionales compactos */}
        <div
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
