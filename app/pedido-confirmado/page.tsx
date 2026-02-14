import Link from "next/link";

export default function PedidoConfirmadoPage() {
  return (
    <section className="py-32 px-6 max-w-[600px] mx-auto text-center">
      <div
        style={{ color: "var(--color-verde)" }}
        className="font-bebas text-[80px] leading-none mb-2 opacity-20"
      >
        10+1
      </div>
      <div className="text-[64px] mb-6">✅</div>
      <h1
        style={{ color: "var(--color-verde)" }}
        className="font-playfair font-black text-[36px] mb-4"
      >
        ¡Pedido confirmado!
      </h1>
      <p
        style={{ color: "var(--color-gris)" }}
        className="text-[15px] leading-relaxed mb-4"
      >
        Gracias por tu compra. Recibirás un email de confirmación en breve con
        los detalles del envío.
      </p>
      <div
        style={{
          borderLeft: "3px solid var(--color-dorado)",
          background: "var(--color-crema-osc)",
        }}
        className="px-4 py-3 text-left mb-10"
      >
        <p style={{ color: "var(--color-tinta)" }} className="text-[13px]">
          Tu cuadro se imprimirá en las próximas 24h y llegará en un tubo
          protector en 2–4 días laborables.
        </p>
      </div>
      <Link
        href="/catalogo"
        style={{
          background: "var(--color-verde)",
          color: "var(--color-crema)",
        }}
        className="font-bebas text-[15px] tracking-[2px] px-8 py-3 rounded-sm
                   no-underline hover:bg-[var(--color-dorado)]
                   hover:text-[var(--color-verde)] transition-colors inline-block"
      >
        Seguir comprando
      </Link>
    </section>
  );
}
