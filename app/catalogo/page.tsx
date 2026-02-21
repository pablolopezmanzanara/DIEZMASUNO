import Link from "next/link";
import { getProductos } from "../lib/queries";

export const dynamic = "force-dynamic";

// Equipos disponibles con sus colores y slugs
const equipos = [
  {
    nombre: "Real Madrid",
    slug: "real-madrid",
    color: "#FFFFFF",
    colorSecundario: "#001F54",
  },
  {
    nombre: "FC Barcelona",
    slug: "barcelona",
    color: "#A50044",
    colorSecundario: "#004D98",
  },
  {
    nombre: "Atlético de Madrid",
    slug: "atletico-madrid",
    color: "#CB3524",
    colorSecundario: "#FFFFFF",
  },
  {
    nombre: "Valencia CF",
    slug: "valencia",
    color: "#EE3524",
    colorSecundario: "#000000",
  },
  {
    nombre: "Athletic Club",
    slug: "athletic",
    color: "#EE2523",
    colorSecundario: "#FFFFFF",
  },
  {
    nombre: "Deportivo de La Coruña",
    slug: "deportivo",
    color: "#1C4C9E",
    colorSecundario: "#FFFFFF",
  },
  {
    nombre: "Real Sociedad",
    slug: "real-sociedad",
    color: "#003D8F",
    colorSecundario: "#FFFFFF",
  },
  {
    nombre: "Sevilla FC",
    slug: "sevilla",
    color: "#F43333",
    colorSecundario: "#FFFFFF",
  },
  {
    nombre: "Real Betis",
    slug: "betis",
    color: "#00954C",
    colorSecundario: "#FFFFFF",
  },
  {
    nombre: "Otros equipos",
    slug: "otros",
    color: "#6b6050",
    colorSecundario: "#f5efe0",
  },
];

export default async function CatalogoPage() {
  const productos = await getProductos();

  // Contar productos por equipo
  const productosCount = equipos
    .map((equipo) => ({
      ...equipo,
      count: productos.filter(
        (p) =>
          p.equipo.toLowerCase().includes(equipo.slug.replace("-", " ")) ||
          (equipo.slug === "otros" &&
            !equipos
              .slice(0, -1)
              .some((e) =>
                p.equipo.toLowerCase().includes(e.slug.replace("-", " ")),
              )),
      ).length,
    }))
    .filter((e) => e.count > 0); // Solo mostrar equipos con productos

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "var(--color-verde)",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            opacity: 0.015,
            backgroundImage:
              "repeating-linear-gradient(to right, transparent, transparent 99px, white 99px, white 100px)",
          }}
        />

        <div
          style={{
            maxWidth: "1100px",
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
              marginBottom: "12px",
            }}
          >
            Catálogo completo
          </div>
          <h1
            style={{
              color: "var(--color-crema)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 900,
              fontSize: "clamp(36px,5vw,64px)",
              lineHeight: 1.05,
              marginBottom: "16px",
            }}
          >
            Elige tu{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              equipo
            </em>
          </h1>
          <p
            style={{
              color: "rgba(245,239,224,0.7)",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: "600px",
            }}
          >
            Explora nuestra colección organizada por equipos. Cada club tiene
            sus leyendas, plantillas históricas y escudos vintage.
          </p>
        </div>
      </section>

      {/* Grid de equipos */}
      <section
        style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "32px",
          }}
        >
          {productosCount.map((equipo) => (
            <Link
              key={equipo.slug}
              href={`/catalogo/${equipo.slug}`}
              style={{
                textDecoration: "none",
                background: "white",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                transition: "all 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Franja de color del equipo */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${equipo.color}, ${equipo.colorSecundario})`,
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "48px",
                    color: "rgba(255,255,255,0.15)",
                    position: "absolute",
                    fontWeight: "bold",
                    letterSpacing: "4px",
                  }}
                >
                  {equipo.nombre.split(" ")[0]}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    color: "var(--color-tinta)",
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  {equipo.nombre}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-gris)",
                      fontSize: "13px",
                    }}
                  >
                    {equipo.count} {equipo.count === 1 ? "cuadro" : "cuadros"}
                  </span>
                  <span
                    style={{
                      color: "var(--color-verde)",
                      fontFamily: "var(--font-bebas)",
                      fontSize: "12px",
                      letterSpacing: "2px",
                    }}
                  >
                    Ver colección →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
