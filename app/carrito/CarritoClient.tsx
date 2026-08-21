"use client";

import Link from "next/link";
import Image from "next/image";
import { useCarrito } from "../context/CarritoContext";
import { useState, useEffect } from "react";
import { urlFor } from "../lib/sanity";

function IconoPapelera() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </svg>
  );
}

function IconoFlechaIzq() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

function IconoFlechaDer() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function CarritoClient() {
  const { items, totalPrecio, eliminar, actualizar } = useCarrito();
  const [procesando, setProcesando] = useState(false);

  // Al volver de Stripe (cancelar), algunos navegadores restauran la
  // pagina desde la bfcache tal cual estaba al salir, con "Procesando..."
  // congelado. pageshow con persisted:true detecta ese caso y lo resetea.
  useEffect(() => {
    const manejarPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setProcesando(false);
      }
    };

    window.addEventListener("pageshow", manejarPageShow);
    return () => window.removeEventListener("pageshow", manejarPageShow);
  }, []);

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
            Tu carrito esta vacio
          </h1>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.7,
              marginBottom: "32px",
            }}
          >
            Explora nuestra coleccion de cuadros de edicion limitada y encuentra
            el perfecto para tu espacio.
          </p>
          <Link
            href="/#coleccion"
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
            Ver colección
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrito-pagina">
      <div className="carrito-cabecera">
        <h1 className="carrito-titulo">Tu carrito</h1>
      </div>

      <div className="carrito-lista">
        {items.map((item) => (
          <div key={item.id} className="carrito-item-card">
            <Link href={`/catalogo/${item.slug}`} className="carrito-item-imagen">
              {item.imagen ? (
                <Image
                  src={urlFor(item.imagen).width(140).height(140).quality(85).url()}
                  alt={item.nombre}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <span className="carrito-item-imagen-placeholder">{item.dorsal}</span>
              )}
            </Link>

            <div className="carrito-item-info">
              <div className="carrito-item-encabezado">
                <Link href={`/catalogo/${item.slug}`} className="carrito-item-nombre">
                  {item.nombre}
                </Link>
                <button
                  onClick={() => eliminar(item.id)}
                  className="carrito-item-eliminar"
                  aria-label="Eliminar del carrito"
                >
                  <IconoPapelera />
                </button>
              </div>

              <div className="carrito-item-subtitulo">
                {item.equipo} · {item.formato.label}
              </div>

              <div className="carrito-item-pie">
                <div className="carrito-cantidad">
                  <button
                    onClick={() => actualizar(item.id, item.cantidad - 1)}
                    disabled={item.cantidad <= 1}
                    aria-label="Restar cantidad"
                  >
                    −
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => actualizar(item.id, item.cantidad + 1)}
                    aria-label="Sumar cantidad"
                  >
                    +
                  </button>
                </div>
                <div className="carrito-item-precio">
                  {item.formato.precio * item.cantidad} €
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/#coleccion" className="carrito-seguir">
        <IconoFlechaIzq />
        Seguir comprando
      </Link>

      <div className="carrito-resumen">
        <h2 className="carrito-resumen-titulo">Resumen del pedido</h2>

        <div className="carrito-resumen-fila">
          <span>Subtotal</span>
          <span>{totalPrecio} €</span>
        </div>
        <div className="carrito-resumen-fila">
          <span>Envío</span>
          <span className="carrito-resumen-gratis">Gratis</span>
        </div>

        <p className="carrito-resumen-entrega">
          Entrega estimada en 2-4 días laborables.
        </p>

        <p className="carrito-resumen-nota">
          📦 Envío gratuito en 2-4 días
          <br />
          🔒 Pago seguro con Stripe
        </p>
      </div>

      <div className="carrito-sticky">
        <div className="carrito-sticky-total">
          <span>Total</span>
          <span>{totalPrecio} €</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={procesando}
          className="carrito-finalizar"
        >
          {procesando ? (
            "Procesando..."
          ) : (
            <>
              Finalizar pedido <IconoFlechaDer />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
