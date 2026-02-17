export const dynamic = "force-dynamic";

const secciones = [
  {
    titulo: "Plazos de entrega",
    contenido: [
      {
        pregunta: "¿Cuándo recibiré mi pedido?",
        respuesta:
          "Los pedidos se procesan en 24-48 horas laborables. El tiempo de entrega estimado es de 2 a 4 días hábiles para España peninsular, 4-6 días para Canarias, Baleares, Ceuta y Melilla, y 5-8 días para el resto de Europa.",
      },
      {
        pregunta: "¿Cuándo se envía mi pedido?",
        respuesta:
          "Los pedidos realizados antes de las 12:00 se procesan el mismo día. Los realizados después se procesan el siguiente día laborable.",
      },
    ],
  },
  {
    titulo: "Costes de envío",
    contenido: [
      {
        pregunta: "¿Cuánto cuesta el envío?",
        respuesta:
          "El envío es gratuito en pedidos superiores a 50€. Para pedidos inferiores, el coste es de 4,95€ para España y 9,95€ para el resto de Europa.",
      },
      {
        pregunta: "¿Cómo se embala el pedido?",
        respuesta:
          "Los cuadros sin marco se envían en tubo protector rígido. Los cuadros con marco se envían en caja de cartón reforzado con esquineras de protección. Todos los envíos incluyen seguro de transporte.",
      },
    ],
  },
  {
    titulo: "Devoluciones",
    contenido: [
      {
        pregunta: "¿Puedo devolver mi pedido?",
        respuesta:
          "Sí. Aceptamos devoluciones en un plazo de 30 días desde la recepción del pedido. El producto debe estar en perfectas condiciones y en su embalaje original.",
      },
      {
        pregunta: "¿Cómo gestiono una devolución?",
        respuesta:
          "Escríbenos a contacto@elfutboldeantes.com indicando tu número de pedido y el motivo de la devolución. Te enviaremos las instrucciones para el proceso de recogida, que es gratuito si el producto llegó en mal estado.",
      },
      {
        pregunta: "¿Cuándo recibiré el reembolso?",
        respuesta:
          "Una vez recibido y verificado el producto, procesamos el reembolso en un plazo de 5-7 días hábiles. El dinero aparecerá en tu cuenta según los tiempos de tu banco.",
      },
    ],
  },
];

export default function EnviosPage() {
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
            Información
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
            Envíos y{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              devoluciones
            </em>
          </h1>
        </div>
      </section>

      <section
        style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}
      >
        {secciones.map((seccion) => (
          <div key={seccion.titulo} style={{ marginBottom: "56px" }}>
            <div
              style={{
                width: "48px",
                height: "3px",
                background: "var(--color-dorado)",
                marginBottom: "20px",
              }}
            />
            <h2
              style={{
                color: "var(--color-verde)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "24px",
                marginBottom: "28px",
              }}
            >
              {seccion.titulo}
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              {seccion.contenido.map((item) => (
                <div
                  key={item.pregunta}
                  style={{
                    borderLeft: "2px solid var(--color-crema-osc)",
                    paddingLeft: "20px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--color-tinta)",
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    {item.pregunta}
                  </div>
                  <p
                    style={{
                      color: "var(--color-gris)",
                      fontSize: "14px",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.respuesta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
