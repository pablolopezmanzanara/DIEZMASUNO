export const dynamic = "force-dynamic";

const preguntas = [
  {
    pregunta: "¿Qué es una edición limitada?",
    respuesta:
      "Cada cuadro solo está disponible durante una semana. Pasado ese tiempo, no se vuelve a imprimir ni a vender. Esto garantiza la exclusividad de cada pieza.",
  },
  {
    pregunta: "¿Las ilustraciones son originales?",
    respuesta:
      "Sí. Todas las ilustraciones son obras originales creadas específicamente para El Fútbol de Antes. No son fotografías ni reproducciones de imágenes existentes.",
  },
  {
    pregunta: "¿Qué formatos están disponibles?",
    respuesta:
      "Ofrecemos cuatro formatos: A4 (21×29 cm), A3 (30×42 cm), 50×70 cm y 70×100 cm. Todos disponibles con o sin marco.",
  },
  {
    pregunta: "¿El marco está incluido en el precio?",
    respuesta:
      "El precio base es sin marco. Puedes añadir marco al realizar el pedido. Los marcos son de madera natural o negro mate, con vidrio antirreflectante.",
  },
  {
    pregunta: "¿Cómo sé que mi pedido ha sido recibido?",
    respuesta:
      "Recibirás un email de confirmación inmediatamente después de completar el pago con el resumen de tu pedido y el número de referencia.",
  },
  {
    pregunta: "¿Puedo pedir un jugador que no esté en la colección?",
    respuesta:
      "Por el momento no aceptamos encargos personalizados. Sin embargo, puedes sugerirnos jugadores a través del formulario de contacto y los tendremos en cuenta para futuras colecciones.",
  },
  {
    pregunta: "¿Los cuadros incluyen certificado de autenticidad?",
    respuesta:
      "Sí. Cada pedido incluye una ficha del jugador con datos de su carrera y un certificado de edición limitada firmado digitalmente.",
  },
  {
    pregunta: "¿Puedo hacer un regalo?",
    respuesta:
      "Perfectamente. Durante el proceso de compra puedes indicar una dirección de envío diferente y añadir un mensaje personalizado. También ofrecemos packaging de regalo opcional.",
  },
];

export default function FaqPage() {
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
            Ayuda
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
            Preguntas{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              frecuentes
            </em>
          </h1>
        </div>
      </section>

      <section
        style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {preguntas.map((item, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid var(--color-crema-osc)",
                padding: "28px 0",
              }}
            >
              <div
                style={{
                  color: "var(--color-tinta)",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "17px",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    color: "var(--color-dorado)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "20px",
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.pregunta}
              </div>
              <p
                style={{
                  color: "var(--color-gris)",
                  fontSize: "14px",
                  lineHeight: 1.9,
                  paddingLeft: "36px",
                }}
              >
                {item.respuesta}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
