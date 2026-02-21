import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductos, type Producto } from "../../lib/queries";
import { urlFor } from "../../lib/sanity";

export const dynamic = "force-dynamic";

const equiposMap: { [key: string]: string } = {
  "real-madrid": "Real Madrid",
  barcelona: "Barcelona",
  "atletico-madrid": "Atlético",
  valencia: "Valencia",
  athletic: "Athletic",
  deportivo: "Deportivo",
  "real-sociedad": "Real Sociedad",
  sevilla: "Sevilla",
  betis: "Betis",
  otros: "Otros equipos",
};

type Props = {
  params: Promise<{ equipo: string }>;
};

export default async function EquipoPage({ params }: Props) {
  const { equipo } = await params;
  const nombreEquipo = equiposMap[equipo];

  if (!nombreEquipo) {
    notFound();
  }

  const todosProductos = await getProductos();

  const productos = todosProductos.filter((p) => {
    if (equipo === "otros") {
      return !Object.keys(equiposMap)
        .slice(0, -1)
        .some((slug) =>
          p.equipo.toLowerCase().includes(equiposMap[slug].toLowerCase()),
        );
    }
    return p.equipo.toLowerCase().includes(nombreEquipo.toLowerCase());
  });

  return (
    <>
      {/* Hero equipo */}
      <section
        style={{ background: "var(--color-verde)", padding: "64px 24px" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Link
            href="/catalogo"
            style={{
              color: "var(--color-dorado)",
              fontFamily: "var(--font-bebas)",
              fontSize: "12px",
              letterSpacing: "3px",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: "16px",
            }}
          >
            ← Volver al catálogo
          </Link>
          <h1
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(32px,4vw,48px)",
              marginBottom: "12px",
            }}
          >
            {nombreEquipo}
          </h1>
          <p style={{ color: "rgba(245,239,224,0.7)", fontSize: "15px" }}>
            {productos.length}{" "}
            {productos.length === 1
              ? "cuadro disponible"
              : "cuadros disponibles"}
          </p>
        </div>
      </section>

      {/* Grid productos */}
      <section
        style={{ padding: "64px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        {productos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ color: "var(--color-gris)", fontSize: "16px" }}>
              Aún no hay cuadros disponibles de este equipo.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 320px)",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            {productos.map((p: Producto) => (
              <Link
                key={p._id}
                href={`/catalogo/${p.slug.current}`}
                style={{
                  textDecoration: "none",
                  background: "white",
                  borderRadius: "4px",
                  overflow: "hidden",
                  display: "block",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    background: "var(--color-verde)",
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {p.imagen ? (
                    <Image
                      src={urlFor(p.imagen).width(400).height(533).url()}
                      alt={p.nombre}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.08)",
                          fontFamily: "var(--font-bebas)",
                          fontSize: "80px",
                          position: "absolute",
                          top: "12px",
                          right: "16px",
                          lineHeight: 1,
                        }}
                      >
                        {p.dorsal}
                      </span>
                      <span style={{ fontSize: "64px", opacity: 0.9 }}>⚽</span>
                    </>
                  )}
                  {p.badge && (
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: "var(--color-rojo)",
                        color: "white",
                        fontFamily: "var(--font-bebas)",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        padding: "4px 10px",
                        borderRadius: "2px",
                        zIndex: 10,
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    padding: "20px 22px 22px",
                    borderTop: "3px solid var(--color-crema-osc)",
                  }}
                >
                  <div
                    style={{
                      color: "var(--color-gris)",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "10px",
                      letterSpacing: "3px",
                      marginBottom: "6px",
                    }}
                  >
                    {p.equipo}
                  </div>
                  <div
                    style={{
                      color: "var(--color-tinta)",
                      fontFamily: "var(--font-playfair)",
                      fontWeight: 700,
                      fontSize: "18px",
                      marginBottom: "4px",
                      lineHeight: 1.2,
                    }}
                  >
                    {p.nombre}
                  </div>
                  <div
                    style={{
                      color: "var(--color-gris)",
                      fontSize: "13px",
                      fontStyle: "italic",
                      marginBottom: "14px",
                    }}
                  >
                    {p.anio}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-verde)",
                        fontFamily: "var(--font-playfair)",
                        fontWeight: 700,
                        fontSize: "22px",
                      }}
                    >
                      {p.precio} €
                    </span>
                    <span
                      style={{
                        color: "var(--color-verde)",
                        fontFamily: "var(--font-bebas)",
                        fontSize: "12px",
                        letterSpacing: "2px",
                      }}
                    >
                      Ver cuadro →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
