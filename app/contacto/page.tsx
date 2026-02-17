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

      <section
        style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
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
              Respondemos en menos de 24 horas.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {[
                { label: "Email general", valor: "hola@elfutboldeantes.com" },
                {
                  label: "Pedidos y envíos",
                  valor: "pedidos@elfutboldeantes.com",
                },
                { label: "Horario", valor: "Lunes a viernes, 9:00–18:00" },
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

          {/* Formulario */}
          <div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                { label: "Nombre", type: "text", placeholder: "Tu nombre" },
                { label: "Email", type: "email", placeholder: "tu@email.com" },
                {
                  label: "Asunto",
                  type: "text",
                  placeholder: "Motivo de contacto",
                },
              ].map((campo) => (
                <div key={campo.label}>
                  <label
                    style={{
                      color: "var(--color-tinta)",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "12px",
                      letterSpacing: "2px",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    {campo.label}
                  </label>
                  <input
                    type={campo.type}
                    placeholder={campo.placeholder}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      border: "1px solid var(--color-crema-osc)",
                      borderRadius: "2px",
                      fontFamily: "var(--font-libre)",
                      fontSize: "14px",
                      color: "var(--color-tinta)",
                      background: "white",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  style={{
                    color: "var(--color-tinta)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Mensaje
                </label>
                <textarea
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1px solid var(--color-crema-osc)",
                    borderRadius: "2px",
                    fontFamily: "var(--font-libre)",
                    fontSize: "14px",
                    color: "var(--color-tinta)",
                    background: "white",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                style={{
                  background: "var(--color-verde)",
                  color: "var(--color-crema)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  padding: "14px 32px",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
