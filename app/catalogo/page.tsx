import CatalogoClient from "./CatalogoClient";
import { getProductos } from "../lib/queries";

export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const productos = await getProductos();

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
            Nuestra{" "}
            <em style={{ color: "var(--color-dorado)", fontStyle: "italic" }}>
              colección
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
            Explora todos nuestros cuadros de edición limitada. Jugadores
            legendarios, entrenadores icónicos y momentos únicos del fútbol
            español.
          </p>
        </div>
      </section>

      {/* Catálogo con filtros */}
      <section
        style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <CatalogoClient productos={productos} />
      </section>
    </>
  );
}
