export const dynamic = "force-dynamic";

// ⚠️ PENDIENTE DE COMPLETAR: sustituye los datos entre [corchetes] por los
// reales de tu negocio antes de dar la web por lista para clientes reales.
const TITULAR = "[Nombre completo o razón social]";
const NIF = "[NIF / CIF]";
const DOMICILIO = "[Dirección completa]";
const EMAIL_CONTACTO = "diezmasuno.fa@gmail.com";

const secciones = [
  {
    titulo: "Responsable del tratamiento",
    contenido: [
      {
        pregunta: "¿Quién trata tus datos?",
        respuesta: `${TITULAR}, con NIF/CIF ${NIF} y domicilio en ${DOMICILIO}. Puedes contactar con nosotros en ${EMAIL_CONTACTO} para cualquier duda sobre tus datos personales.`,
      },
    ],
  },
  {
    titulo: "Qué datos recogemos y para qué",
    contenido: [
      {
        pregunta: "¿Qué datos tratamos al hacer un pedido?",
        respuesta:
          "Nombre, email, dirección de envío y datos de pago (gestionados directamente por Stripe, no por nosotros), para gestionar tu pedido, procesarlo, enviarlo y darte soporte. La base legal es la ejecución del contrato de compraventa.",
      },
      {
        pregunta: "¿Qué datos tratamos si nos escribes o usas el formulario de peticiones?",
        respuesta:
          "Nombre y email, para poder responderte. La base legal es tu consentimiento al enviarnos el formulario.",
      },
      {
        pregunta: "¿Usáis cookies de analítica?",
        respuesta:
          "Sí, Google Analytics, únicamente si aceptas las cookies en el aviso que aparece al entrar en la web. Nos ayuda a entender cómo se usa el sitio de forma agregada y anónima. Puedes rechazarlas sin que afecte a tu compra.",
      },
    ],
  },
  {
    titulo: "Con quién compartimos tus datos",
    contenido: [
      {
        pregunta: "¿A qué terceros enviáis mis datos?",
        respuesta:
          "Stripe (procesamiento de pagos), Resend (envío de emails transaccionales) y Supabase (almacenamiento de pedidos), todos ellos actuando como encargados del tratamiento bajo sus propias políticas de seguridad. No vendemos ni cedemos tus datos a terceros con fines publicitarios.",
      },
    ],
  },
  {
    titulo: "Tus derechos",
    contenido: [
      {
        pregunta: "¿Qué puedo pedir sobre mis datos?",
        respuesta:
          "Puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos escribiendo a " +
          EMAIL_CONTACTO +
          ". También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es) si consideras que no hemos atendido correctamente tu solicitud.",
      },
      {
        pregunta: "¿Cuánto tiempo conserváis mis datos?",
        respuesta:
          "Los datos de pedidos se conservan mientras exista una obligación legal (fiscal y contable) de hacerlo. Los datos de contacto se conservan hasta que solicites su supresión.",
      },
    ],
  },
];

export default function PrivacidadPage() {
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
            Información legal
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
            Política de{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              privacidad
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
