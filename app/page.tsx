import Link from "next/link";
import Image from "next/image";
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
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--color-verde)",
          display: "grid",
          gridTemplateColumns: "1fr",
          overflow: "hidden",
          position: "relative",
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
                  fontWeight: 900,
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
              Cuadros de edición limitada que reviven los momentos y jugadores
              que definieron el fútbol español. Impresiones de alta calidad,
              renovadas cada semana.
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
              {productosHome.slice(0, 3).map((p: Producto, i: number) => {
                const rotaciones = ["-4deg", "2deg", "-1deg"];
                const tops = ["0px", "40px", "20px"];
                const lefts = ["40px", "10px", "60px"];
                return (
                  <div
                    key={p._id}
                    style={{
                      position: "absolute",
                      top: tops[i],
                      left: lefts[i],
                      transform: `rotate(${rotaciones[i]})`,
                      zIndex: i + 1,
                      width: "220px",
                      height: "300px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                  >
                    {p.imagen ? (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Image
                          src={urlFor(p.imagen).width(220).height(300).url()}
                          alt={p.nombre}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "rgba(26,58,42,0.9)",
                            borderLeft: "3px solid var(--color-dorado)",
                            padding: "8px 12px",
                          }}
                        >
                          <div
                            style={{
                              color: "var(--color-crema)",
                              fontFamily: "var(--font-playfair)",
                              fontWeight: 700,
                              fontSize: "13px",
                            }}
                          >
                            {p.nombre}
                          </div>
                          <div
                            style={{
                              color: "var(--color-dorado)",
                              fontFamily: "var(--font-bebas)",
                              fontSize: "10px",
                              letterSpacing: "2px",
                            }}
                          >
                            {p.equipo}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          background: "linear-gradient(135deg,#1a3a2a,#2d5c3f)",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "flex-end",
                          padding: "16px",
                        }}
                      >
                        <div
                          style={{
                            background: "rgba(26,58,42,0.9)",
                            borderLeft: "3px solid var(--color-dorado)",
                            padding: "8px 12px",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{
                              color: "var(--color-crema)",
                              fontFamily: "var(--font-playfair)",
                              fontWeight: 700,
                              fontSize: "13px",
                            }}
                          >
                            {p.nombre}
                          </div>
                          <div
                            style={{
                              color: "var(--color-dorado)",
                              fontFamily: "var(--font-bebas)",
                              fontSize: "10px",
                              letterSpacing: "2px",
                            }}
                          >
                            {p.equipo}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section
        style={{ padding: "96px 24px", maxWidth: "1100px", margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "56px",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                color: "var(--color-dorado-osc)",
                fontFamily: "var(--font-bebas)",
                fontSize: "11px",
                letterSpacing: "5px",
                marginBottom: "10px",
              }}
            >
              Descubre
            </div>
            <h2
              style={{
                color: "var(--color-verde)",
                fontFamily: "var(--font-playfair)",
                fontWeight: 900,
                fontSize: "clamp(28px,4vw,44px)",
                lineHeight: 1.1,
              }}
            >
              Algunos de nuestros{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: "var(--color-dorado-osc)",
                }}
              >
                cuadros
              </em>
            </h2>
          </div>
          <Link
            href="/catalogo"
            style={{
              color: "var(--color-verde-mid)",
              fontFamily: "var(--font-bebas)",
              fontSize: "13px",
              letterSpacing: "2px",
              textDecoration: "none",
              borderBottom: "1px solid var(--color-verde-mid)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
            }}
          >
            Ver colección completa →
          </Link>
        </div>

        {productosHome.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p
              style={{
                color: "var(--color-gris)",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "18px",
              }}
            >
              Próximamente nuevos cuadros disponibles.
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
            {productosHome.slice(0, 3).map((p: Producto) => (
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
                          userSelect: "none",
                        }}
                      >
                        {p.dorsal}
                      </span>
                      <span style={{ fontSize: "64px", opacity: 0.9 }}>⚽</span>
                    </>
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
                titulo: "Elige tu leyenda",
                desc: "Cada semana renovamos la colección con nuevos jugadores y momentos icónicos del fútbol español de los años 90 y principios de los 2000.",
              },
              {
                num: "02",
                titulo: "Impresión de calidad",
                desc: "Cada cuadro se imprime bajo demanda en papel de archivo de alta gramaje con tintas de larga duración. Disponible en varios formatos.",
              },
              {
                num: "03",
                titulo: "En tu pared en 48h",
                desc: "Enviamos en tubo protector o con marco incluido. Cada pedido incluye certificado de edición y ficha del jugador.",
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
            Aquellos domingos frente al televisor, con el partido de las tres,
            no se olvidan.
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
