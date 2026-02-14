"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header
      style={{
        background: "var(--verde)",
        borderBottom: "3px solid var(--dorado)",
      }}
      className="sticky top-0 z-50"
    >
      {/* Franja animada */}
      <div
        style={{ background: "var(--dorado)" }}
        className="overflow-hidden py-2"
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
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
                    color: "var(--verde)",
                    borderRight: "1px solid var(--verde-mid)",
                  }}
                  className="font-bebas text-[11px] tracking-[4px] px-8"
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Barra principal */}
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div
            style={{
              background: "var(--dorado)",
              color: "var(--verde)",
              boxShadow: "0 0 0 2px var(--verde), 0 0 0 4px var(--dorado)",
            }}
            className="w-11 h-11 rounded-full flex items-center justify-center
                       font-bebas text-[12px] text-center leading-tight shrink-0"
          >
            10
            <br />
            +1
          </div>
          <div className="flex flex-col">
            <span
              style={{ color: "var(--crema)" }}
              className="font-playfair font-bold text-[15px] leading-tight"
            >
              El Fútbol de Antes
            </span>
            <span
              style={{ color: "var(--dorado)" }}
              className="font-bebas text-[11px] tracking-[3px]"
            >
              Arte · Nostalgia · Fútbol
            </span>
          </div>
        </Link>

        {/* Nav escritorio */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            ["Colección", "/catalogo"],
            ["Jugadores", "/jugadores"],
            ["Sobre Nosotros", "/sobre-nosotros"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{ color: "var(--crema-osc)" }}
              className="font-bebas text-[14px] tracking-[2px] no-underline
                         hover:text-[var(--dorado)] transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/carrito"
            style={{ background: "var(--dorado)", color: "var(--verde)" }}
            className="font-bebas text-[13px] tracking-[2px] px-4 py-2
                       rounded-sm no-underline hover:bg-[var(--crema)] transition-colors"
          >
            🛒 Carrito (0)
          </Link>
        </nav>

        {/* Botón menú móvil */}
        <button
          className="md:hidden"
          style={{ color: "var(--crema)" }}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="font-bebas text-[24px]">
            {menuAbierto ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div
          style={{
            background: "var(--verde-mid)",
            borderTop: "1px solid var(--dorado)",
          }}
          className="md:hidden px-6 py-4 flex flex-col gap-4"
        >
          {[
            ["Colección", "/catalogo"],
            ["Jugadores", "/jugadores"],
            ["Sobre Nosotros", "/sobre-nosotros"],
            ["🛒 Carrito (0)", "/carrito"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              style={{ color: "var(--crema)" }}
              className="font-bebas text-[16px] tracking-[3px] no-underline
                         hover:text-[var(--dorado)] transition-colors"
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
