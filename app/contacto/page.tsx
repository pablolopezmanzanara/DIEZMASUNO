export const dynamic = "force-dynamic";

export default function ContactoPage() {
  return (
    <>
      <section
        style={{ background: "var(--color-verde)", padding: "80px 24px" }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              color: "var(--color-dorado)",
              fontFamily: "var(--font-bebas)",
              fontSize: "11px",
              letterSpacing: "5px",
              marginBottom: "16px",
            }}
          >
            Contacto
          </div>
          <h1
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(36px,5vw,64px)",
              lineHeight: 1.05,
            }}
          >
            Hablemos del{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              fútbol
            </em>
          </h1>
        </div>
      </section>

      <section style={{ padding: "80px 24px", marginLeft: "20%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {/* Info */}
          <div>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "var(--color-dorado)",
                marginBottom: "24px",
              }}
            />
            <h2
              style={{
                color: "var(--color-verde)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              ¿En qué podemos ayudarte?
            </h2>
            <p
              style={{
                color: "var(--color-gris)",
                fontSize: "14px",
                lineHeight: 1.9,
                marginBottom: "32px",
              }}
            >
              Para consultas sobre pedidos, devoluciones, sugerencias de
              jugadores o simplemente para hablar de fútbol, escríbenos.
              Respondemos en menos de 72 horas.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {[
                { label: "Email general", valor: "diezmasuno.fa@gmail.com" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      color: "var(--color-dorado-osc)",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "11px",
                      letterSpacing: "3px",
                      marginBottom: "4px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{ color: "var(--color-tinta)", fontSize: "14px" }}
                  >
                    {item.valor}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
