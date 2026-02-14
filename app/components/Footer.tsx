import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-tinta)",
        borderTop: "3px solid var(--color-dorado)",
      }}
      className="px-6 pt-14 pb-8"
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                style={{
                  background: "var(--color-dorado)",
                  color: "var(--color-verde)",
                  boxShadow:
                    "0 0 0 2px var(--color-tinta), 0 0 0 4px var(--color-dorado)",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center
                           font-bebas text-[11px] text-center leading-tight shrink-0"
              >
                10
                <br />
                +1
              </div>
              <div className="flex flex-col">
                <span
                  style={{ color: "var(--color-crema)" }}
                  className="font-playfair font-bold text-[18px] leading-tight"
                >
                  El Fútbol de Antes
                </span>
                <span
                  style={{ color: "var(--color-dorado)" }}
                  className="font-bebas text-[11px] tracking-[3px]"
                >
                  Arte · Nostalgia · Fútbol
                </span>
              </div>
            </div>
            <p
              style={{ color: "rgba(245,239,224,0.4)" }}
              className="text-[13px] leading-relaxed max-w-[280px]"
            >
              Cuadros de edición limitada dedicados a los jugadores y momentos
              que hicieron grande el fútbol español.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <div
              style={{ color: "var(--color-dorado)" }}
              className="font-bebas text-[12px] tracking-[3px] mb-5"
            >
              Tienda
            </div>
            <div className="flex flex-col gap-3">
              {[
                ["Colección actual", "/catalogo"],
                ["Jugadores", "/jugadores"],
                ["Formatos y precios", "/precios"],
                ["Ediciones anteriores", "/archivo"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: "rgba(245,239,224,0.5)" }}
                  className="text-[13px] no-underline hover:text-[var(--color-crema)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Información */}
          <div>
            <div
              style={{ color: "var(--color-dorado)" }}
              className="font-bebas text-[12px] tracking-[3px] mb-5"
            >
              Información
            </div>
            <div className="flex flex-col gap-3">
              {[
                ["Sobre el proyecto", "/sobre-nosotros"],
                ["Envíos y devoluciones", "/envios"],
                ["Preguntas frecuentes", "/faq"],
                ["Contacto", "/contacto"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{ color: "rgba(245,239,224,0.5)" }}
                  className="text-[13px] no-underline hover:text-[var(--color-crema)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <span
            style={{ color: "rgba(245,239,224,0.3)" }}
            className="text-[12px]"
          >
            © 2025 El Fútbol de Antes · Todos los derechos reservados
          </span>
          <span
            style={{ color: "var(--color-dorado)", opacity: 0.4 }}
            className="font-bebas text-[18px] tracking-[2px]"
          >
            10+1
          </span>
        </div>
      </div>
    </footer>
  );
}
