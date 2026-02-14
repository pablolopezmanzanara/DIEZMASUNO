"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";

export default function CarritoPage() {
  const { items, eliminar, cambiarCantidad, total, vaciar } = useCarrito();
  const [cargando, setCargando] = useState(false);

  const handleCheckout = async () => {
    setCargando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      setCargando(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="py-32 px-6 max-w-[600px] mx-auto text-center">
        <div
          style={{ color: "var(--color-dorado)" }}
          className="font-bebas text-[100px] leading-none mb-4 opacity-20"
        >
          10+1
        </div>
        <h1
          style={{ color: "var(--color-verde)" }}
          className="font-playfair font-black text-[32px] mb-4"
        >
          Tu carrito está vacío
        </h1>
        <p
          style={{ color: "var(--color-gris)" }}
          className="text-[15px] leading-relaxed mb-8"
        >
          Aún no has añadido ningún cuadro. Descubre la colección de esta
          semana.
        </p>
        <Link
          href="/catalogo"
          style={{
            background: "var(--color-verde)",
            color: "var(--color-crema)",
          }}
          className="font-bebas text-[15px] tracking-[2px] px-8 py-3
                     rounded-sm no-underline hover:bg-[var(--color-dorado)]
                     hover:text-[var(--color-verde)] transition-colors inline-block"
        >
          Ver la colección
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* ── CABECERA ── */}
      <div style={{ background: "var(--color-verde)" }} className="py-12 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div
            style={{ color: "var(--color-dorado)" }}
            className="font-bebas text-[11px] tracking-[5px] mb-2"
          >
            Tu selección
          </div>
          <h1
            style={{ color: "var(--color-crema)" }}
            className="font-playfair font-black text-[clamp(32px,4vw,52px)]"
          >
            Carrito
          </h1>
        </div>
      </div>

      <section className="py-16 px-6 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ── LISTA DE ITEMS ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.formato.id}`}
                style={{ border: "1px solid var(--color-crema-osc)" }}
                className="bg-white rounded-sm overflow-hidden flex"
              >
                {/* Miniatura */}
                <div
                  style={{
                    background: item.color,
                    minWidth: "100px",
                    width: "100px",
                  }}
                  className="flex items-center justify-center relative shrink-0"
                >
                  <span
                    style={{ color: "rgba(255,255,255,0.08)" }}
                    className="font-bebas absolute top-1 right-2 text-[36px]
                               leading-none select-none"
                  >
                    {item.dorsal}
                  </span>
                  <span className="text-[40px]">⚽</span>
                </div>

                {/* Info */}
                <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                  <div>
                    <div
                      style={{ color: "var(--color-gris)" }}
                      className="font-bebas text-[10px] tracking-[3px] mb-0.5"
                    >
                      {item.equipo}
                    </div>
                    <div
                      style={{ color: "var(--color-tinta)" }}
                      className="font-playfair font-bold text-[17px] leading-tight mb-1"
                    >
                      {item.nombre}
                    </div>
                    <div
                      style={{ color: "var(--color-gris)" }}
                      className="font-bebas text-[11px] tracking-[2px]"
                    >
                      {item.formato.label}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 flex-wrap gap-3">
                    {/* Selector cantidad */}
                    <div
                      style={{ border: "1px solid var(--color-crema-osc)" }}
                      className="flex items-center rounded-sm overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          cambiarCantidad(
                            item.id,
                            item.formato.id,
                            item.cantidad - 1,
                          )
                        }
                        style={{ color: "var(--color-tinta)" }}
                        className="w-8 h-8 font-bebas text-[18px] flex items-center
                                   justify-center hover:bg-[var(--color-crema-osc)]
                                   transition-colors"
                      >
                        −
                      </button>
                      <span
                        style={{ color: "var(--color-tinta)" }}
                        className="w-8 text-center font-bebas text-[14px]"
                      >
                        {item.cantidad}
                      </span>
                      <button
                        onClick={() =>
                          cambiarCantidad(
                            item.id,
                            item.formato.id,
                            item.cantidad + 1,
                          )
                        }
                        style={{ color: "var(--color-tinta)" }}
                        className="w-8 h-8 font-bebas text-[18px] flex items-center
                                   justify-center hover:bg-[var(--color-crema-osc)]
                                   transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        style={{ color: "var(--color-verde)" }}
                        className="font-playfair font-bold text-[20px]"
                      >
                        {item.formato.precio * item.cantidad} €
                      </span>
                      <button
                        onClick={() => eliminar(item.id, item.formato.id)}
                        style={{ color: "var(--color-gris)" }}
                        className="font-bebas text-[11px] tracking-[1px]
                                   hover:text-[var(--color-rojo)] transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Vaciar carrito */}
            <button
              onClick={vaciar}
              style={{
                color: "var(--color-gris)",
                borderBottom: "1px solid var(--color-gris)",
              }}
              className="self-start font-bebas text-[11px] tracking-[2px] mt-2 pb-0.5
                         hover:text-[var(--color-rojo)] hover:border-[var(--color-rojo)]
                         transition-colors"
            >
              Vaciar carrito
            </button>
          </div>

          {/* ── RESUMEN DEL PEDIDO ── */}
          <div className="lg:col-span-1">
            <div
              style={{ background: "var(--color-crema-osc)" }}
              className="rounded-sm p-6 sticky top-[100px]"
            >
              <div
                style={{ color: "var(--color-tinta)" }}
                className="font-playfair font-bold text-[20px] mb-6"
              >
                Resumen del pedido
              </div>

              {/* Desglose items */}
              <div className="flex flex-col gap-3 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.formato.id}`}
                    className="flex justify-between items-start gap-2"
                  >
                    <div className="flex-1">
                      <div
                        style={{ color: "var(--color-tinta)" }}
                        className="text-[13px] font-bold leading-tight"
                      >
                        {item.nombre}
                      </div>
                      <div
                        style={{ color: "var(--color-gris)" }}
                        className="font-bebas text-[10px] tracking-[1px]"
                      >
                        {item.formato.label} × {item.cantidad}
                      </div>
                    </div>
                    <span
                      style={{ color: "var(--color-tinta)" }}
                      className="font-playfair font-bold text-[14px] shrink-0"
                    >
                      {item.formato.precio * item.cantidad} €
                    </span>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div
                style={{ borderTop: "2px solid var(--color-crema-osc)" }}
                className="pt-4 mb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    style={{ color: "var(--color-gris)" }}
                    className="text-[13px]"
                  >
                    Subtotal
                  </span>
                  <span
                    style={{ color: "var(--color-tinta)" }}
                    className="font-playfair font-bold text-[16px]"
                  >
                    {total} €
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    style={{ color: "var(--color-gris)" }}
                    className="text-[13px]"
                  >
                    Envío
                  </span>
                  <span
                    style={{
                      color:
                        total >= 50
                          ? "var(--color-verde-luz)"
                          : "var(--color-gris)",
                    }}
                    className="font-bebas text-[13px] tracking-[1px]"
                  >
                    {total >= 50 ? "GRATUITO" : "4,95 €"}
                  </span>
                </div>

                {/* Aviso envío gratuito */}
                {total < 50 && (
                  <div
                    style={{
                      background: "rgba(201,168,76,0.15)",
                      borderLeft: "3px solid var(--color-dorado)",
                    }}
                    className="px-3 py-2 mb-4"
                  >
                    <p
                      style={{ color: "var(--color-dorado-osc)" }}
                      className="text-[12px]"
                    >
                      Añade {(50 - total).toFixed(2)} € más para envío gratuito
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span
                    style={{ color: "var(--color-tinta)" }}
                    className="font-playfair font-bold text-[18px]"
                  >
                    Total
                  </span>
                  <span
                    style={{ color: "var(--color-verde)" }}
                    className="font-playfair font-black text-[28px]"
                  >
                    {total >= 50 ? total : (total + 4.95).toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Botón checkout Stripe */}
              <button
                onClick={handleCheckout}
                disabled={cargando}
                style={{
                  background: cargando
                    ? "var(--color-gris)"
                    : "var(--color-verde)",
                  color: "var(--color-crema)",
                  cursor: cargando ? "not-allowed" : "pointer",
                }}
                className="font-bebas text-[16px] tracking-[3px] py-4 rounded-sm
                           w-full hover:bg-[var(--color-dorado)]
                           hover:text-[var(--color-verde)] transition-colors
                           flex items-center justify-center gap-3"
              >
                {cargando ? (
                  <>
                    <span className="animate-spin text-[18px]">⏳</span>
                    Redirigiendo...
                  </>
                ) : (
                  "Finalizar pedido"
                )}
              </button>

              {/* Métodos de pago */}
              <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                {["VISA", "MASTERCARD", "AMEX", "STRIPE"].map((m) => (
                  <span
                    key={m}
                    style={{
                      border: "1px solid var(--color-crema-osc)",
                      color: "var(--color-gris)",
                    }}
                    className="font-bebas text-[9px] tracking-[1px] px-2 py-1 rounded-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Garantías */}
              <div className="flex flex-col gap-2 mt-5">
                {[
                  ["🔒", "Pago seguro con cifrado SSL"],
                  ["↩️", "Devolución gratuita en 30 días"],
                  ["📦", "Envío en tubo protector"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className="text-[13px]">{icon}</span>
                    <span
                      style={{ color: "var(--color-gris)" }}
                      className="text-[12px]"
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
