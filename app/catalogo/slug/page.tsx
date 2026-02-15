import { getProducto, getProductoSlugs } from "../../lib/queries";
import { urlFor } from "../../lib/sanity";
import DetalleClient from "./DetalleClient";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProductoSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function ProductoPage({
  params,
}: {
  params: { slug: string };
}) {
  const producto = await getProducto(params.slug);

  if (!producto) {
    return (
      <section
        style={{
          padding: "128px 24px",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "var(--color-dorado)",
            fontFamily: "var(--font-bebas)",
            fontSize: "80px",
            lineHeight: 1,
            marginBottom: "16px",
            opacity: 0.2,
          }}
        >
          10+1
        </div>
        <h1
          style={{
            color: "var(--color-verde)",
            fontFamily: "var(--font-playfair)",
            fontWeight: 900,
            fontSize: "32px",
            marginBottom: "16px",
          }}
        >
          Producto no encontrado
        </h1>
        <Link
          href="/catalogo"
          style={{
            background: "var(--color-verde)",
            color: "var(--color-crema)",
            fontFamily: "var(--font-bebas)",
            fontSize: "15px",
            letterSpacing: "2px",
            padding: "12px 32px",
            borderRadius: "2px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  const formatos = [
    {
      id: "a4",
      label: "A4 — 21×29 cm",
      precio: Math.round(producto.precio * 0.6),
    },
    {
      id: "a3",
      label: "A3 — 30×42 cm",
      precio: Math.round(producto.precio * 0.8),
    },
    { id: "50x70", label: "50×70 cm", precio: producto.precio },
    {
      id: "70x100",
      label: "70×100 cm",
      precio: Math.round(producto.precio * 1.4),
    },
  ];

  return (
    <>
      {/* ── MIGA DE PAN ── */}
      <div
        style={{
          background: "var(--color-crema-osc)",
          borderBottom: "1px solid var(--color-crema-osc)",
          padding: "12px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {[
            ["Inicio", "/"],
            ["Colección", "/catalogo"],
            [producto.nombre, ""],
          ].map((item, i) => (
            <span
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {i > 0 && (
                <span style={{ color: "var(--color-gris)", fontSize: "12px" }}>
                  ›
                </span>
              )}
              {item[1] ? (
                <Link
                  href={item[1]}
                  style={{
                    color: "var(--color-gris)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                    textDecoration: "none",
                  }}
                >
                  {item[0]}
                </Link>
              ) : (
                <span
                  style={{
                    color: "var(--color-tinta)",
                    fontFamily: "var(--font-bebas)",
                    fontSize: "11px",
                    letterSpacing: "2px",
                  }}
                >
                  {item[0]}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* ── DETALLE PRINCIPAL ── */}
      <section
        style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Imagen */}
          <div style={{ position: "relative" }}>
            {producto.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  zIndex: 10,
                  background: "var(--color-rojo)",
                  color: "white",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  padding: "4px 12px",
                  borderRadius: "2px",
                }}
              >
                {producto.badge}
              </span>
            )}
            <div
              style={{
                background: "var(--color-verde)",
                aspectRatio: "3/4",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 32px 64px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {producto.imagen ? (
                <Image
                  src={urlFor(producto.imagen).width(600).height(800).url()}
                  alt={producto.nombre}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.06)",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "140px",
                      position: "absolute",
                      top: "16px",
                      right: "24px",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {producto.dorsal}
                  </span>
                  <span
                    style={{
                      fontSize: "120px",
                      opacity: 0.9,
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    ⚽
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      inset: "16px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      pointerEvents: "none",
                    }}
                  />
                </>
              )}
            </div>
            <div
              style={{
                marginTop: "16px",
                borderLeft: "3px solid var(--color-dorado)",
                background: "var(--color-crema-osc)",
                padding: "12px 16px",
              }}
            >
              <div
                style={{
                  color: "var(--color-tinta)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  marginBottom: "4px",
                }}
              >
                Impresión de archivo
              </div>
              <p style={{ color: "var(--color-gris)", fontSize: "12px" }}>
                Papel Hahnemühle 308g · Tintas pigmentadas · +75 años de
                durabilidad
              </p>
            </div>
          </div>

          {/* Info y compra — componente cliente */}
          <DetalleClient producto={producto} formatos={formatos} />
        </div>
      </section>

      {/* ── HISTORIA ── */}
      {producto.historia && (
        <section
          style={{ background: "var(--color-verde)", padding: "80px 24px" }}
        >
          <div
            style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
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
              La historia
            </div>
            <p
              style={{
                color: "rgba(245,239,224,0.85)",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "clamp(18px,2.5vw,24px)",
                lineHeight: 1.6,
              }}
            >
              {producto.historia}
            </p>
            <div
              style={{
                width: "60px",
                height: "2px",
                background: "var(--color-dorado)",
                margin: "32px auto 0",
              }}
            />
          </div>
        </section>
      )}
    </>
  );
}
