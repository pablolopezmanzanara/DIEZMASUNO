export const dynamic = "force-dynamic";

export default function SobreNosotrosPage() {
  return (
    <div style={{ background: "var(--color-crema)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          background: "var(--color-verde)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px,5vw,56px)",
              fontWeight: 900,
              marginBottom: "16px",
            }}
          >
            Sobre nosotros
          </h1>
          <p
            style={{
              color: "rgba(245,239,224,0.8)",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            Reviviendo la magia del fútbol español
          </p>
        </div>
      </section>

      {/* Contenido */}
      <div
        style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          className="sobre-nosotros-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
          }}
        >
          {/* Seccion informativa */}
          <div>
            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "28px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Qué es El Fútbol de Antes
              </h2>
              <p
                style={{
                  color: "var(--color-gris)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                Somos un proyecto que nace de la pasión por el fútbol español y
                su historia. Creamos cuadros de edición limitada que capturan
                momentos icónicos y jugadores legendarios que marcaron épocas
                doradas del fútbol en España.
              </p>
            </div>

            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "28px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Edición limitada semanal
              </h2>
              <p
                style={{
                  color: "var(--color-gris)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                Cada diseño estará disponible por un tiempo limitado, lanzando
                nuevos diseños de forma periódica.
              </p>
            </div>

            <div style={{ marginBottom: "48px" }}>
              <h2
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "28px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Calidad de archivo
              </h2>
              <p
                style={{
                  color: "var(--color-gris)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                }}
              >
                Todos nuestros diseños son creados con la máxima calidad.
                Imprimimos en papel tamaño A4 y utilizamos tintas de alta
                durabilidad que mantienen los colores vibrantes durante años.
                Por supuesto, con el marco incluido.
              </p>
            </div>

            <div
              style={{
                borderLeft: "4px solid var(--color-dorado)",
                paddingLeft: "24px",
                background: "rgba(201,168,76,0.05)",
                padding: "24px",
              }}
            >
              <p
                style={{
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "18px",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;El fútbol no es solo un deporte, es memoria, emoción y
                arte. Queremos que cada cuadro te lleve de vuelta a esos
                momentos mágicos.&ldquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
