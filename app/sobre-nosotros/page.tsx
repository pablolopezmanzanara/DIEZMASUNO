export const dynamic = "force-dynamic";

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Cabecera */}
      <section
        style={{
          background: "var(--color-verde)",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "200px",
            color: "rgba(255,255,255,0.03)",
            lineHeight: 1,
            pointerEvents: "none",
          }}
        >
          10+1
        </span>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              color: "var(--color-dorado)",
              fontFamily: "var(--font-bebas)",
              fontSize: "11px",
              letterSpacing: "5px",
              marginBottom: "16px",
            }}
          >
            El proyecto
          </div>
          <h1
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(36px,5vw,64px)",
              lineHeight: 1.05,
              marginBottom: "24px",
            }}
          >
            Sobre{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              nosotros
            </em>
          </h1>
          <p
            style={{
              color: "rgba(245,239,224,0.7)",
              fontSize: "16px",
              lineHeight: 1.8,
              maxWidth: "600px",
            }}
          >
            Un proyecto nacido del amor por el fútbol español de los años 90 y
            2000 y por el arte que inspira.
          </p>
        </div>
      </section>

      {/* Contenido */}
      <section
        style={{ padding: "80px 24px", maxWidth: "800px", margin: "0 auto" }}
      >
        <div style={{ marginBottom: "56px" }}>
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
              fontSize: "28px",
              marginBottom: "20px",
            }}
          >
            ¿Qué es El Fútbol de Antes?
          </h2>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.9,
              marginBottom: "16px",
            }}
          >
            El Fútbol de Antes es una tienda de cuadros de edición limitada
            dedicados a los jugadores y momentos que hicieron grande el fútbol
            español. Cada semana publicamos una nueva selección de ilustraciones
            de alta calidad, disponibles por tiempo limitado.
          </p>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.9,
            }}
          >
            Nuestras impresiones están pensadas para quienes vivieron aquellos
            domingos frente al televisor y quieren llevar ese recuerdo a su
            hogar en forma de arte.
          </p>
        </div>

        <div style={{ marginBottom: "56px" }}>
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
              fontSize: "28px",
              marginBottom: "20px",
            }}
          >
            Edición limitada semanal
          </h2>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.9,
              marginBottom: "16px",
            }}
          >
            Cada viernes renovamos la colección con nuevos jugadores y momentos
            icónicos. Cuando se acaba la semana, los cuadros dejan de estar
            disponibles para siempre. No hay reposición.
          </p>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.9,
            }}
          >
            Esto garantiza que cada pieza sea verdaderamente exclusiva y que
            quien la tenga posea algo único.
          </p>
        </div>

        <div style={{ marginBottom: "56px" }}>
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
              fontSize: "28px",
              marginBottom: "20px",
            }}
          >
            Calidad de archivo
          </h2>
          <p
            style={{
              color: "var(--color-gris)",
              fontSize: "15px",
              lineHeight: 1.9,
            }}
          >
            Imprimimos en papel Hahnemühle 308g con tintas pigmentadas de alta
            durabilidad. Cada cuadro está diseñado para durar más de 75 años sin
            perder color ni definición. Disponible en varios formatos, con y sin
            marco.
          </p>
        </div>

        {/* Cita */}
        <div
          style={{
            background: "var(--color-verde)",
            borderLeft: "4px solid var(--color-dorado)",
            padding: "32px 40px",
            borderRadius: "2px",
          }}
        >
          <p
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "20px",
              lineHeight: 1.6,
              marginBottom: "16px",
            }}
          >
            &ldquo;Aquellos domingos frente al televisor, con el partido de las tres,
            no se olvidan.&rdquo;
          </p>
          <div
            style={{
              color: "var(--color-dorado)",
              fontFamily: "var(--font-bebas)",
              fontSize: "12px",
              letterSpacing: "3px",
            }}
          >
            El Fútbol de Antes · 10+1
          </div>
        </div>
      </section>
    </>
  );
}
