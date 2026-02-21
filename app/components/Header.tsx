"use client";

import Link from "next/link";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
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
          padding: "0 clamp(12px, 3vw, 24px)",
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

        {/* Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 3vw, 28px)",
          }}
        >
          <Link
            href="/catalogo"
            className="nav-desktop"
            style={{
              color: "var(--color-crema-osc)",
              fontFamily: "var(--font-bebas)",
              fontSize: "14px",
              letterSpacing: "2px",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            Colección
          </Link>
          <Link
            href="/sobre-nosotros"
            className="nav-desktop"
            style={{
              color: "var(--color-crema-osc)",
              fontFamily: "var(--font-bebas)",
              fontSize: "14px",
              letterSpacing: "2px",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            Sobre Nosotros
          </Link>
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
              gap: "6px",
            }}
          >
            <span className="carrito-texto">🛒 Carrito</span>
            <span className="carrito-icono">🛒</span>
            <span>({totalItems})</span>
          </Link>
        </nav>
      </div>

      {/* Franja animada */}
      <div
        style={{
          background: "var(--color-dorado)",
          overflow: "hidden",
          paddingTop: "18px",
          paddingBottom: "10px",
          position: "relative",
          alignItems: "center",
        }}
      >
        <div className="marquee-container">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="marquee-content">
              {[
                "RAÚL GONZÁLEZ BLANCO",
                "FERNANDO TORRES",
                "MANOLO PRECIADO",
                "EUROMALAGA",
                "IKER MUÑAIN",
                "ANTONIO PUERTA",
                "IAGO ASPAS",
                "DANI PAREJO",
                "JAVI MORENO",
                "MÁGICO GONZÁLEZ",
                "MICHEL",
                "PABLO INFANTE",
              ].map((nombre, j) => (
                <span
                  key={`${i}-${j}`}
                  style={{
                    color: "var(--color-verde)",
                    borderRight: "1px solid var(--color-verde-mid)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "13px",
                    letterSpacing: "4px",
                    padding: "0 32px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {nombre}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
