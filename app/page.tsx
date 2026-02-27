import Link from "next/link";
import Image from "next/image";
import Marquee from "./components/Marquee";
import TarjetasProductos from "./components/TarjetasProductos";

import {
  getProductosDestacados,
  getProductos,
  type Producto,
} from "./lib/queries";
import { urlFor } from "./lib/sanity";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const destacados = await getProductosDestacados();
  const productosHome = destacados.slice(0, 3);
  const todosProductos = await getProductos();

  return (
    <>
      {/* ── MARQUEE NOMBRES ── */}
      <Marquee />
      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--color-verde)",
          display: "grid",
          gridTemplateColumns: "1fr",
          overflow: "hidden",
          position: "relative",
          paddingBottom: "30px",
        }}
      >
        {/* Líneas verticales decorativas - espaciado fijo */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
          }}
        >
          {[...Array(30)].map((_, i) => {
            const esDestacada = (i + 1) % 5 === 0;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${i * 91}px`,
                  top: 0,
                  bottom: 0,
                  width: esDestacada ? "2px" : "1px",
                  background: "white",
                  opacity: esDestacada ? 0.025 : 0.015,
                }}
              />
            );
          })}
        </div>

        {/* Campo de fútbol SVG decorativo - solo desktop */}
        <svg
          style={{
            position: "absolute",
            left: "78%",
            top: "47%",
            transform: "translate(-10%, -50%)",
            height: "90%",
            width: "auto",
            opacity: 0.04,
            pointerEvents: "none",
            display: "none",
          }}
          className="campo-svg"
          viewBox="0 0 400 600"
          fill="none"
        >
          <rect
            x="50"
            y="50"
            width="300"
            height="500"
            stroke="white"
            strokeWidth="2"
          />
          <line
            x1="50"
            y1="300"
            x2="350"
            y2="300"
            stroke="white"
            strokeWidth="2"
          />
          <circle cx="200" cy="300" r="60" stroke="white" strokeWidth="2" />
          {/* Área grande superior */}
          <rect
            x="120"
            y="50"
            width="160"
            height="80"
            stroke="white"
            strokeWidth="2"
          />
          {/* Área pequeña superior */}
          <rect
            x="155"
            y="50"
            width="90"
            height="30"
            stroke="white"
            strokeWidth="2"
          />
          {/* Punto de penalti superior */}
          <circle cx="200" cy="100" r="3" fill="white" />
          {/* Área grande inferior */}
          <rect
            x="120"
            y="470"
            width="160"
            height="80"
            stroke="white"
            strokeWidth="2"
          />
          {/* Área pequeña inferior */}
          <rect
            x="155"
            y="520"
            width="90"
            height="30"
            stroke="white"
            strokeWidth="2"
          />
          {/* Punto de penalti inferior */}
          <circle cx="200" cy="500" r="3" fill="white" />
          {/* Círculo central */}
          <circle cx="200" cy="300" r="5" fill="white" />
        </svg>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-content"
        >
          {/* Texto hero */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "75px 40px",
              marginInlineStart: "40px",
            }}
          >
            <div
              style={{
                color: "var(--color-dorado)",
                marginBottom: "24px",
                fontFamily: "var(--font-bebas)",
                fontSize: "12px",
                letterSpacing: "5px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  background: "var(--color-dorado)",
                  display: "block",
                  width: "32px",
                  height: "1px",
                }}
              />
              Colección 2025 · Temporada I
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                lineHeight: 1.05,
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  color: "var(--color-crema)",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  display: "block",
                  fontFamily: "Playfair Display, serif",
                  fontWeight: 700,
                }}
              >
                El arte del{" "}
                <em
                  style={{
                    color: "var(--color-dorado)",
                    fontStyle: "italic",
                    fontWeight: "initial",
                  }}
                >
                  fútbol
                </em>
              </span>
              <span
                style={{
                  color: "var(--color-crema)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(48px, 8vw, 110px)",
                  display: "block",
                  lineHeight: 0.9,
                  letterSpacing: "2px",
                  marginBottom: "28px",
                  marginTop: "6px",
                }}
              >
                de antes
              </span>
            </h1>

            <p
              style={{
                color: "rgba(245,239,224,0.7)",
                fontSize: "15px",
                lineHeight: 1.7,
                maxWidth: "420px",
                marginBottom: "40px",
              }}
            >
              Aquí cuelga la historia: retratos de las leyendas que hicieron del
              fútbol una religión, desde los grandes colosos hasta los héroes
              del barrio.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/catalogo"
                style={{
                  background: "var(--color-dorado)",
                  color: "var(--color-verde)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "15px",
                  letterSpacing: "2px",
                  padding: "14px 32px",
                  borderRadius: "2px",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "all 0.2s",
                }}
              >
                Ver la colección
              </Link>
              <Link
                href="/sobre-nosotros"
                style={{
                  background: "transparent",
                  color: "var(--color-crema)",
                  fontFamily: "var(--font-bebas)",
                  fontSize: "15px",
                  letterSpacing: "2px",
                  padding: "13px 32px",
                  border: "1px solid rgba(245,239,224,0.3)",
                  borderRadius: "2px",
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "all 0.2s",
                }}
              >
                Conoce el proyecto
              </Link>
            </div>
          </div>

          {/* Cards apiladas - solo desktop */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 80px 60px 40px",
            }}
            className="cards-apiladas"
          >
            <div
              style={{ position: "relative", width: "280px", height: "380px" }}
            >
              {[2, 3].map((i) => {
                const rotaciones = ["-4deg", "2deg", "-1deg"];
                const tops = ["0px", "40px", "20px"];
                const lefts = ["40px", "0px", "60px"];
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      top: tops[i - 1],
                      left: lefts[i - 1],
                      transform: `rotate(${rotaciones[i - 1]})`,
                      zIndex: i,
                      width: "220px",
                      height: "300px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                      backgroundImage: `url(/heroes/img${i}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "top-center",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TODOS LOS PRODUCTOS ── */}
      <section
        style={{ padding: "80px 24px", background: "var(--color-crema)" }}
      >
        <TarjetasProductos productos={todosProductos} />
      </section>

      {/* ── PROCESO ── */}
      <section
        style={{
          background: "var(--color-verde)",
          padding: "96px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            position: "absolute",
            right: "-40px",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "300px",
            color: "rgba(255,255,255,0.03)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          10+1
        </span>

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: "64px" }}>
            <div
              style={{
                color: "var(--color-dorado)",
                fontFamily: "var(--font-bebas)",
                fontSize: "11px",
                letterSpacing: "5px",
                marginBottom: "12px",
              }}
            >
              Cómo funciona
            </div>
            <h2
              style={{
                color: "var(--color-crema)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(28px,4vw,44px)",
                lineHeight: 1.1,
              }}
            >
              Del recuerdo{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-dorado)" }}>
                al cuadro
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, 320px)",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            {[
              {
                num: "01",
                titulo: "Tu equipo, tu leyenda",
                desc: "Revive momentos icónicos y jugadores del fútbol español de los años 90 y principios de los 2000.",
              },
              {
                num: "02",
                titulo: "Impresión de calidad",
                desc: "Cada cuadro se imprime bajo demanda en papel de archivo de alto gramaje con tintas de larga duración.",
              },
              {
                num: "03",
                titulo: "Envío a domicilio",
                desc: "Enviamos el producto empaquetado con su propio marco.",
              },
            ].map((paso) => (
              <div
                key={paso.num}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderTop: "2px solid rgba(201,168,76,0.3)",
                  padding: "40px 36px",
                }}
              >
                <div
                  style={{
                    color: "var(--color-dorado)",
                    opacity: 0.6,
                    fontFamily: "var(--font-bebas)",
                    fontSize: "48px",
                    lineHeight: 1,
                    marginBottom: "16px",
                  }}
                >
                  {paso.num}
                </div>
                <div
                  style={{
                    color: "var(--color-crema)",
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "20px",
                    marginBottom: "12px",
                  }}
                >
                  {paso.titulo}
                </div>
                <p
                  style={{
                    color: "rgba(245,239,224,0.6)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── CITA NOSTALGIA ── */}
      <section
        style={{
          padding: "96px 24px",
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <blockquote style={{ position: "relative" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "120px",
              color: "var(--color-crema-osc)",
              position: "absolute",
              top: "-40px",
              left: "-20px",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              color: "var(--color-verde)",
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(22px, 3.5vw, 36px)",
              lineHeight: 1.4,
              marginBottom: "24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            Aquellos domingos frente al televisor, con el partido de las nueve,
            y el teletexto de la jornada.
          </p>
        </blockquote>
        <div
          style={{
            width: "60px",
            height: "2px",
            background: "var(--color-dorado)",
            margin: "0 auto 24px",
          }}
        />
        <div
          style={{
            color: "var(--color-dorado-osc)",
            fontFamily: "var(--font-bebas)",
            fontSize: "12px",
            letterSpacing: "4px",
          }}
        >
          El Fútbol de Antes · 10+1
        </div>
      </section>
    </>
  );
}
