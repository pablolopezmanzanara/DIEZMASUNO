"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalItems } = useCarrito();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--color-verde)",
        borderBottom: "3px solid var(--color-dorado)",
      }}
    >
      {/* Barra principal */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              background: "var(--color-dorado)",
              color: "var(--color-verde)",
              boxShadow:
                "0 0 0 2px var(--color-verde), 0 0 0 4px var(--color-dorado)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-bebas)",
              fontSize: "12px",
              textAlign: "center",
              lineHeight: "1.2",
              flexShrink: 0,
            }}
          >
            10
            <br />
            +1
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "var(--color-crema)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                fontSize: "15px",
                lineHeight: "1.2",
              }}
            >
              El Fútbol de Antes
            </span>
            <span
              style={{
                color: "var(--color-dorado)",
                fontFamily: "var(--font-bebas)",
                fontSize: "11px",
                letterSpacing: "3px",
              }}
            >
              Arte · Nostalgia · Fútbol
            </span>
          </div>
        </Link>

        {/* Nav escritorio */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "28px",
          }}
          className="md:flex"
        >
          {[
            ["Colección", "/catalogo"],
            ["Jugadores", "/jugadores"],
            ["Sobre Nosotros", "/sobre-nosotros"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "var(--color-crema-osc)",
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "2px",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/carrito"
            style={{
              background: "var(--color-dorado)",
              color: "var(--color-verde)",
              fontFamily: "var(--font-bebas)",
              fontSize: "13px",
              letterSpacing: "2px",
              padding: "8px 16px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span
                style={{
                  background: "var(--color-verde)",
                  color: "var(--color-dorado)",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "11px",
                  lineHeight: 1,
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Botón móvil */}
        <button
          style={{
            color: "var(--color-crema)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            display: "block",
          }}
          className="md:hidden"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span style={{ fontFamily: "var(--font-bebas)" }}>
            {menuAbierto ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Franja animada */}
      <div
        style={{
          background: "var(--color-dorado)",
          overflow: "hidden",
          padding: "8px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            animation: "marquee 25s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ display: "flex", flexShrink: 0 }}>
              {[
                "ENVÍO GRATUITO EN PEDIDOS +50€",
                "EDICIÓN LIMITADA SEMANAL",
                "IMPRESIÓN DE ALTA CALIDAD",
                "FÚTBOL ESPAÑOL AÑOS 90 Y 2000",
                "ENMARCADO DISPONIBLE",
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    color: "var(--color-verde)",
                    borderRight: "1px solid var(--color-verde-mid)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "4px",
                    padding: "0 32px",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div
          style={{
            background: "var(--color-verde-mid)",
            borderTop: "1px solid var(--color-dorado)",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          className="md:hidden"
        >
          {[
            ["Colección", "/catalogo"],
            ["Jugadores", "/jugadores"],
            ["Sobre Nosotros", "/sobre-nosotros"],
            [`🛒 Carrito (${totalItems})`, "/carrito"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "var(--color-crema)",
                fontFamily: "var(--font-bebas)",
                fontSize: "16px",
                letterSpacing: "3px",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onClick={() => setMenuAbierto(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
