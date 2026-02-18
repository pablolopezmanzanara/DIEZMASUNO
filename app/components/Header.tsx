"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalItems } = useCarrito();

  const itemsMarquee = [
    "ENVÍO GRATUITO EN PEDIDOS +50€",
    "EDICIÓN LIMITADA SEMANAL",
    "IMPRESIÓN DE ALTA CALIDAD",
    "FÚTBOL ESPAÑOL AÑOS 90 Y 2000",
    "ENMARCADO DISPONIBLE",
  ];

  return (
    <header className="sticky top-0 z-[100] bg-verde w-full">
      {/* 1. BARRA PRINCIPAL - Con márgenes laterales (max-w + px-12) */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 flex items-center justify-between h-[90px]">
        {/* Lado Izquierdo: Logo */}
        <Link
          href="/"
          className="flex items-center gap-5 no-underline shrink-0 group pl-12 "
        >
          <div
            className="w-12 h-12 bg-dorado rounded-full flex items-center justify-center
                       font-bebas text-[14px] text-verde text-center leading-[1.1]
                       shadow-[0_0_0_2px_#1a3a2a,0_0_0_4px_#c9a84c] shrink-0 transition-transform group-hover:scale-105"
          >
            10
            <br />
            +1
          </div>
          <div className="flex flex-col">
            <span className="font-playfair font-bold text-[20px] text-crema leading-tight tracking-[0.5px]">
              El Fútbol de Antes
            </span>
            <span className="font-bebas text-[11px] text-dorado tracking-[4px]">
              Arte · Nostalgia · Fútbol
            </span>
          </div>
        </Link>

        {/* Lado Derecho: Navegación */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/catalogo"
            className="font-bebas text-[15px] text-crema-osc tracking-[2.5px] no-underline hover:text-dorado transition-colors"
          >
            COLECCIÓN
          </Link>
          <Link
            href="/jugadores"
            className="font-bebas text-[15px] text-crema-osc tracking-[2.5px] no-underline hover:text-dorado transition-colors"
          >
            JUGADORES
          </Link>
          <Link
            href="/sobre-nosotros"
            className="font-bebas text-[15px] text-crema-osc tracking-[2.5px] no-underline hover:text-dorado transition-colors"
          >
            SOBRE NOSOTROS
          </Link>

          <Link
            href="/carrito"
            className="bg-dorado text-verde font-bebas text-[14px] tracking-[2px]
                       px-6 py-3 rounded-[2px] no-underline transition-all
                       hover:bg-crema flex items-center gap-2 ml-4"
          >
            <span className="text-lg">🛒</span> CARRITO ({totalItems})
          </Link>
        </nav>

        {/* Botón móvil */}
        <button
          className="md:hidden text-crema bg-transparent border-0 cursor-pointer text-3xl"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="font-bebas">{menuAbierto ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* 2. FRANJA ANIMADA - Más alta (py-5), letra más grande (text-sm) y más espacio (px-32) */}
      <div className="bg-dorado overflow-hidden py-5 border-t border-verde/10 shadow-sm">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex">
              {itemsMarquee.map((item) => (
                <span
                  key={item}
                  className="font-bebas text-[14px] text-verde tracking-[5px] px-32 border-r border-verde/15 flex items-center"
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
        <div className="md:hidden bg-verde-mid border-t border-dorado px-10 py-12 flex flex-col gap-8 animate-in fade-in slide-in-from-top-5">
          {["COLECCIÓN", "JUGADORES", "SOBRE NOSOTROS"].map((link) => (
            <Link
              key={link}
              href="#"
              className="text-crema font-bebas text-[24px] tracking-[4px] no-underline border-b border-white/5 pb-2"
            >
              {link}
            </Link>
          ))}
          <Link
            href="#"
            className="text-dorado font-bebas text-[24px] tracking-[4px] no-underline"
          >
            🛒 CARRITO ({totalItems})
          </Link>
        </div>
      )}
    </header>
  );
}
