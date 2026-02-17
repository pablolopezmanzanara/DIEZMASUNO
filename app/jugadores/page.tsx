import { getProductos } from "../lib/queries";
import { urlFor } from "../lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function JugadoresPage() {
  const productos = await getProductos();

  return (
    <>
      <section
        style={{ background: "var(--color-verde)", padding: "80px 24px" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              color: "var(--color-dorado)",
              fontFamily: "var(--font-bebas)",
              fontSize: "11px",
              letterSpacing: "5px",
              marginBottom: "16px",
            }}
          >
            Colección
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
            Los{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              jugadores
            </em>
          </h1>
          <p
            style={{
              color: "rgba(245,239,224,0.6)",
              fontSize: "15px",
              marginTop: "16px",
            }}
          >
            {productos.length} jugadores disponibles esta semana
          </p>
        </div>
      </section>

      <section
        style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "32px",
          }}
        >
          {productos.map((p) => (
            <Link
              key={p._id}
              href={`/catalogo/${p.slug.current}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  background: "var(--color-verde)",
                  aspectRatio: "3/4",
                  borderRadius: "4px",
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: "12px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                {p.imagen ? (
                  <Image
                    src={urlFor(p.imagen).width(300).height(400).url()}
                    alt={p.nombre}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: "48px", opacity: 0.5 }}>⚽</span>
                  </div>
                )}
              </div>
              <div
                style={{
                  color: "var(--color-gris)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "10px",
                  letterSpacing: "3px",
                  marginBottom: "4px",
                }}
              >
                {p.equipo}
              </div>
              <div
                style={{
                  color: "var(--color-tinta)",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: "15px",
                  lineHeight: 1.2,
                }}
              >
                {p.nombre}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
