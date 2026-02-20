import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-tinta)",
        borderTop: "3px solid var(--color-dorado)",
        padding: "60px 24px 32px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Columnas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "48px",
            marginBottom: "48px",
          }}
        >
          {/* Marca */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  background: "var(--color-dorado)",
                  color: "var(--color-verde)",
                  boxShadow:
                    "0 0 0 2px var(--color-tinta), 0 0 0 4px var(--color-dorado)",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "11px",
                  textAlign: "center",
                  lineHeight: "1.2",
                  flexShrink: 0,
                }}
              >
                10
                <br />
                +1
              </div>
              <div>
                <div
                  style={{
                    color: "var(--color-crema)",
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "1.2",
                  }}
                >
                  El Fútbol de Antes
                </div>
                <div
                  style={{
                    color: "var(--color-dorado)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "3px",
                  }}
                >
                  Arte · Nostalgia · Fútbol
                </div>
              </div>
            </div>
            <p
              style={{
                color: "rgba(245,239,224,0.4)",
                fontSize: "13px",
                lineHeight: "1.7",
                maxWidth: "280px",
              }}
            >
              Cuadros de edición limitada dedicados a los jugadores y momentos
              que hicieron grande el fútbol español.
            </p>
          </div>

          {/* Tienda */}
          <div>
            <div
              style={{
                color: "var(--color-dorado)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "3px",
                marginBottom: "20px",
              }}
            >
              Tienda
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                ["Colección actual", "/catalogo"],
                ["Jugadores", "/jugadores"],
                ["Formatos y precios", "/precios"],
                ["Ediciones anteriores", "/archivo"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "rgba(245,239,224,0.5)",
                    fontSize: "13px",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Información */}
          <div>
            <div
              style={{
                color: "var(--color-dorado)",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "3px",
                marginBottom: "20px",
              }}
            >
              Información
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                ["Sobre el proyecto", "/sobre-nosotros"],
                ["Envíos y devoluciones", "/envios"],
                ["Preguntas frecuentes", "/faq"],
                ["Contacto", "/contacto"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "rgba(245,239,224,0.5)",
                    fontSize: "13px",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
          className="md:flex-row"
        >
          <span style={{ color: "rgba(245,239,224,0.3)", fontSize: "12px" }}>
            © 2025 El Fútbol de Antes · Todos los derechos reservados
          </span>
          <span
            style={{
              color: "var(--color-dorado)",
              opacity: 0.4,
              fontFamily: "var(--font-bebas)",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            10+1
          </span>
        </div>
      </div>
    </footer>
  );
}
