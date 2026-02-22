import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-tinta)",
        color: "var(--color-crema)",
        padding: "64px 24px 24px",
        borderTop: "3px solid var(--color-dorado)",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Grid principal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "48px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Columna 1: Marca */}
          <div className="footer-marca">
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
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  El Fútbol de Antes
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "10px",
                    letterSpacing: "2px",
                    color: "var(--color-dorado)",
                  }}
                >
                  Arte · Nostalgia · Fútbol
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.6,
                color: "rgba(245,239,224,0.7)",
              }}
            >
              Cuadros de edición limitada que reviven los momentos y jugadores
              que definieron el fútbol español.
            </p>
          </div>

          {/* Columna 2: Tienda */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "3px",
                marginBottom: "16px",
                color: "var(--color-dorado)",
              }}
            >
              Tienda
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                ["Catálogo", "/catalogo"],
                ["Sobre nosotros", "/sobre-nosotros"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "rgba(245,239,224,0.7)",
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

          {/* Columna 3: Información */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "14px",
                letterSpacing: "3px",
                marginBottom: "16px",
                color: "var(--color-dorado)",
              }}
            >
              Información
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {[
                ["Envíos y devoluciones", "/envios"],
                ["FAQ", "/faq"],
                ["Contacto", "/contacto"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "rgba(245,239,224,0.7)",
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
            paddingTop: "24px",
            borderTop: "1px solid rgba(245,239,224,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "12px",
            color: "rgba(245,239,224,0.5)",
          }}
          className="footer-bottom"
        >
          <div className="footer-copyright">
            © 2025 El Fútbol de Antes · Todos los derechos reservados
          </div>
          <div
            style={{ fontFamily: "var(--font-bebas)", letterSpacing: "2px" }}
          >
            10+1
          </div>
        </div>
      </div>
    </footer>
  );
}
