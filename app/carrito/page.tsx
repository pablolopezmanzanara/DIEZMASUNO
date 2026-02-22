"use client";

import Link from "next/link";
import Image from "next/image";
import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";

export default function CarritoPage() {
  const { items, totalPrecio, eliminar, actualizar, vaciar } = useCarrito();
  const [procesando, setProcesando] = useState(false);

  const handleCheckout = async () => {
    setProcesando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      setProcesando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "500px" }}>
          <div style={{ fontSize: "80px", marginBottom: "24px", opacity: 0.3 }}>
            🛒
          </div>
          <h1
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-playfair)",
              fontSize: "32px",
              fontWeight: 900,
              marginBottom: "16px",
            }}
          >
            Tu carrito está vacío
          </h1>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Explora nuestra colección de cuadros de edición limitada y encuentra
            el perfecto para tu espacio.
          </p>
          <Link
            href="/catalogo"
            style={{
              display: "inline-block",
              background: "var(--color-verde)",
              color: "var(--color-crema)",
              fontFamily: "var(--font-bebas)",
              fontSize: "14px",
              letterSpacing: "2px",
              padding: "14px 32px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              color: "var(--color-tinta)",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 900,
              marginBottom: "8px",
            }}
          >
            Tu carrito
          </h1>
          <p style={{ color: "var(--color-gris)", fontSize: "14px" }}>
            {items.length} {items.length === 1 ? "artículo" : "artículos"}
          </p>
        </div>
        <button
          onClick={vaciar}
          style={{
            background: "transparent",
            color: "var(--color-gris)",
            border: "1px solid var(--color-crema-osc)",
            fontFamily: "var(--font-bebas)",
            fontSize: "12px",
            letterSpacing: "2px",
            padding: "8px 16px",
            borderRadius: "2px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          Vaciar carrito
        </button>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}
        className="carrito-layout"
      >
        {/* Lista de productos */}
        <div>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: "4px",
                padding: "24px",
                marginBottom: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                display: "grid",
                gridTemplateColumns: "120px 1fr auto",
                gap: "24px",
                alignItems: "center",
              }}
              className="carrito-item"
            >
              {/* Imagen placeholder */}
              <div
                style={{
                  background: "var(--color-verde)",
                  aspectRatio: "3/4",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "32px",
                  opacity: 0.3,
                }}
              >
                ⚽
              </div>

              {/* Info */}
              <div>
                <h3
                  style={{
                    color: "var(--color-tinta)",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "6px",
                  }}
                >
                  {item.nombre}
                </h3>
                <div
                  style={{
                    color: "var(--color-gris)",
                    fontSize: "13px",
                    marginBottom: "12px",
                  }}
                >
                  {item.equipo} · {item.formato.label}
                </div>

                {/* Controles cantidad */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <button
                    onClick={() => actualizar(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                    style={{
                      background: "var(--color-crema-osc)",
                      border: "none",
                      width: "32px",
                      height: "32px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "var(--color-verde)",
                      opacity: item.cantidad <= 1 ? 0.3 : 1,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "16px",
                      fontWeight: 600,
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                  >
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => actualizar(item.id, item.cantidad + 1)}
                    style={{
                      background: "var(--color-crema-osc)",
                      border: "none",
                      width: "32px",
                      height: "32px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "var(--color-verde)",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminar(item.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--color-gris)",
                      fontSize: "13px",
                      cursor: "pointer",
                      marginLeft: "12px",
                      textDecoration: "underline",
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              {/* Precio */}
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: "var(--color-verde)",
                    fontFamily: "var(--font-playfair)",
                    fontSize: "24px",
                    fontWeight: 700,
                  }}
                >
                  {item.formato.precio * item.cantidad} €
                </div>
                {item.cantidad > 1 && (
                  <div
                    style={{
                      color: "var(--color-gris)",
                      fontSize: "12px",
                      marginTop: "4px",
                    }}
                  >
                    {item.formato.precio} € c/u
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Resumen */}
        <div
          style={{
            background: "var(--color-verde)",
            borderRadius: "4px",
            padding: "32px",
            position: "sticky",
            top: "100px",
          }}
        >
          <h2
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "24px",
            }}
          >
            Resumen del pedido
          </h2>

          <div
            style={{
              marginBottom: "24px",
              paddingBottom: "24px",
              borderBottom: "1px solid rgba(245,239,224,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span
                style={{ color: "rgba(245,239,224,0.7)", fontSize: "14px" }}
              >
                Subtotal
              </span>
              <span
                style={{
                  color: "var(--color-crema)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {totalPrecio} €
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{ color: "rgba(245,239,224,0.7)", fontSize: "14px" }}
              >
                Envío
              </span>
              <span
                style={{
                  color: "var(--color-dorado)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                GRATIS
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                color: "var(--color-crema)",
                fontFamily: "var(--font-bebas)",
                fontSize: "16px",
                letterSpacing: "2px",
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                color: "var(--color-dorado)",
                fontFamily: "var(--font-playfair)",
                fontSize: "32px",
                fontWeight: 700,
              }}
            >
              {totalPrecio} €
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={procesando}
            style={{
              width: "100%",
              background: "var(--color-dorado)",
              color: "var(--color-verde)",
              border: "none",
              fontFamily: "var(--font-bebas)",
              fontSize: "16px",
              letterSpacing: "3px",
              padding: "18px",
              borderRadius: "2px",
              cursor: procesando ? "not-allowed" : "pointer",
              opacity: procesando ? 0.7 : 1,
              transition: "all 0.2s",
              marginBottom: "16px",
            }}
          >
            {procesando ? "PROCESANDO..." : "FINALIZAR PEDIDO"}
          </button>

          <div
            style={{
              color: "rgba(245,239,224,0.6)",
              fontSize: "12px",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            📦 Envío gratuito en 2-4 días
            <br />
            🔒 Pago seguro con Stripe
          </div>
        </div>
      </div>
    </div>
  );
}
