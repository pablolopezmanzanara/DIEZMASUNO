"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalItems } = useCarrito();

  return (
    <header className="sticky top-0 z-50 bg-verde border-b-[3px] border-dorado">
      {/* Franja animada */}
      <div className="bg-dorado overflow-hidden py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
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
                  className="text-verde border-r border-verde-mid font-bebas text-[11px] tracking-[4px] px-8"
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
            className="bg-dorado text-verde shadow-[0_0_0_2px_var(--color-verde),0_0_0_4px_var(--color-dorado)]
                          w-11 h-11 rounded-full flex items-center justify-center
                          font-bebas text-[12px] text-center leading-tight shrink-0"
          >
            10
            <br />
            +1
          </div>
          <div className="flex flex-col">
            <span className="text-crema font-playfair font-bold text-[15px] leading-tight">
              El Fútbol de Antes
            </span>
            <span className="text-dorado font-bebas text-[11px] tracking-[3px]">
              Arte · Nostalgia · Fútbol
            </span>
          </div>
        </Link>

        {/* Nav escritorio */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/catalogo"
            className="text-crema-osc font-bebas text-[14px] tracking-[2px] no-underline transition-colors hover:text-dorado"
          >
            Colección
          </Link>
          <Link
            href="/jugadores"
            className="text-crema-osc font-bebas text-[14px] tracking-[2px] no-underline transition-colors hover:text-dorado"
          >
            Jugadores
          </Link>
          <Link
            href="/sobre-nosotros"
            className="text-crema-osc font-bebas text-[14px] tracking-[2px] no-underline transition-colors hover:text-dorado"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/carrito"
            className="bg-dorado text-verde font-bebas text-[13px] tracking-[2px]
                       px-4 py-2 rounded-sm no-underline transition-all hover:bg-[#d4a84c]
                       flex items-center gap-2"
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span
                className="bg-verde text-dorado rounded-full w-5 h-5
                             flex items-center justify-center font-bebas text-[11px] leading-none"
              >
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Botón móvil */}
        <button
          className="md:hidden text-crema bg-transparent border-0 cursor-pointer text-2xl"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="font-bebas">{menuAbierto ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-verde-mid border-t border-dorado px-6 py-4 flex flex-col gap-4">
          {[
            ["Colección", "/catalogo"],
            ["Jugadores", "/jugadores"],
            ["Sobre Nosotros", "/sobre-nosotros"],
            [`🛒 Carrito (${totalItems})`, "/carrito"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-crema font-bebas text-[16px] tracking-[3px] no-underline transition-colors hover:text-dorado"
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
