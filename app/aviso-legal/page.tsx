export const dynamic = "force-dynamic";

// ⚠️ PENDIENTE DE COMPLETAR: sustituye los datos entre [corchetes] por los
// reales de tu negocio (nombre/razón social, NIF/CIF, domicilio) antes de
// dar la web por lista para clientes reales.
const TITULAR = "[Nombre completo o razón social]";
const NIF = "[NIF / CIF]";
const DOMICILIO = "[Dirección completa]";
const EMAIL_CONTACTO = "diezmasuno.fa@gmail.com";

const secciones = [
  {
    titulo: "Datos identificativos",
    contenido: [
      {
        pregunta: "¿Quién es el titular de esta web?",
        respuesta: `${TITULAR}, con NIF/CIF ${NIF} y domicilio en ${DOMICILIO}. Puedes contactar con nosotros en ${EMAIL_CONTACTO}.`,
      },
    ],
  },
  {
    titulo: "Condiciones de uso",
    contenido: [
      {
        pregunta: "¿Qué normas rigen el uso de esta web?",
        respuesta:
          "El acceso y uso de este sitio web atribuye la condición de usuario y supone la aceptación de las condiciones aquí recogidas. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen, y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe y al ordenamiento legal.",
      },
      {
        pregunta: "¿A quién pertenecen los contenidos de la web?",
        respuesta:
          "Las ilustraciones, textos, diseños, logotipos y demás contenidos de esta web son propiedad de El Fútbol de Antes o se usan con la debida autorización, y están protegidos por la normativa de propiedad intelectual. Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa.",
      },
    ],
  },
  {
    titulo: "Condiciones de venta",
    contenido: [
      {
        pregunta: "¿Dónde se realizan las ventas?",
        respuesta:
          "La venta de productos a través de esta web se dirige a usuarios residentes en España. Los precios mostrados incluyen impuestos aplicables, salvo que se indique lo contrario.",
      },
      {
        pregunta: "¿Cómo se procesan los pagos?",
        respuesta:
          "Los pagos se procesan a través de Stripe, una pasarela de pago externa que cumple con los estándares de seguridad PCI-DSS. No almacenamos los datos de tu tarjeta en nuestros servidores.",
      },
    ],
  },
  {
    titulo: "Responsabilidad",
    contenido: [
      {
        pregunta: "¿Qué responsabilidad asume el titular sobre el contenido?",
        respuesta:
          "El titular no se hace responsable de los daños y perjuicios de cualquier naturaleza que puedan deberse a la falta de disponibilidad o continuidad del funcionamiento de la web, ni de los que puedan derivarse de un uso inadecuado por parte del usuario.",
      },
    ],
  },
];

export default function AvisoLegalPage() {
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
            Aviso{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              legal
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
