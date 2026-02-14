import Link from "next/link";

const productosDestacados = [
  {
    id: 1,
    nombre: "Raúl González Blanco",
    equipo: "Real Madrid C.F.",
    año: "La leyenda blanca · 1994–2010",
    precio: 49,
    dorsal: "7",
    color: "linear-gradient(160deg, #1a3a2a, #0d2518)",
    badge: "Destacado",
    featured: true,
  },
  {
    id: 2,
    nombre: "Rivaldo",
    equipo: "F.C. Barcelona",
    año: "Balón de Oro · 1999",
    precio: 39,
    dorsal: "10",
    color: "linear-gradient(160deg, #2c1a4a, #1a0d30)",
    badge: null,
    featured: false,
  },
  {
    id: 3,
    nombre: "Fernando Torres",
    equipo: "Atlético de Madrid",
    año: "El Niño · 2001–2007",
    precio: 39,
    dorsal: "9",
    color: "linear-gradient(160deg, #1a2a3a, #0d1825)",
    badge: "Últimas unidades",
    featured: false,
  },
  {
    id: 4,
    nombre: "Gaizka Mendieta",
    equipo: "Valencia C.F.",
    año: "El mediocampo dorado · 1991–2001",
    precio: 35,
    dorsal: "8",
    color: "linear-gradient(160deg, #3a2a1a, #251a0d)",
    badge: null,
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ background: "var(--color-verde)" }}
        className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden relative"
      >
        {/* Líneas decorativas de campo */}
        <svg
          className="absolute right-0 top-0 bottom-0 h-full w-1/2 opacity-[0.04] pointer-events-none"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
          <rect
            x="120"
            y="50"
            width="160"
            height="80"
            stroke="white"
            strokeWidth="2"
          />
          <rect
            x="120"
            y="470"
            width="160"
            height="80"
            stroke="white"
            strokeWidth="2"
          />
          <circle cx="200" cy="300" r="5" fill="white" />
        </svg>

        {/* Columna izquierda */}
        <div className="flex flex-col justify-center px-8 md:px-20 py-20 relative z-10">
          <div
            style={{ color: "var(--color-dorado)" }}
            className="font-bebas text-[12px] tracking-[5px] mb-6 flex items-center gap-3"
          >
            <span
              style={{ background: "var(--color-dorado)" }}
              className="block w-8 h-px"
            />
            Colección 2025 · Temporada I
          </div>

          <h1 className="font-playfair font-black leading-[1.05] mb-3">
            <span
              style={{ color: "var(--color-crema)" }}
              className="block text-[clamp(42px,5vw,68px)]"
            >
              El arte del{" "}
              <em style={{ color: "var(--color-dorado)" }}>fútbol</em>
            </span>
            <span
              style={{ color: "var(--color-crema)" }}
              className="font-bebas block text-[clamp(60px,8vw,110px)] leading-[0.9] tracking-[2px]"
            >
              de antes
            </span>
          </h1>

          <p
            style={{ color: "rgba(245,239,224,0.7)" }}
            className="text-[15px] leading-relaxed max-w-[420px] mb-10"
          >
            Cuadros de edición limitada que reviven los momentos y jugadores que
            definieron el fútbol español. Impresiones de alta calidad, renovadas
            cada semana.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/catalogo"
              style={{
                background: "var(--color-dorado)",
                color: "var(--color-verde)",
              }}
              className="font-bebas text-[15px] tracking-[2px] px-8 py-3
                         rounded-sm no-underline hover:bg-[var(--color-crema)]
                         transition-all hover:-translate-y-0.5"
            >
              Ver la colección
            </Link>
            <Link
              href="/sobre-nosotros"
              style={{
                color: "var(--color-crema)",
                border: "1px solid rgba(245,239,224,0.3)",
              }}
              className="font-bebas text-[15px] tracking-[2px] px-8 py-3
                         rounded-sm no-underline hover:border-[var(--color-dorado)]
                         hover:text-[var(--color-dorado)] transition-all"
            >
              Conoce el proyecto
            </Link>
          </div>
        </div>

        {/* Columna derecha — cards apiladas */}
        <div className="hidden md:flex items-center justify-center px-10 py-16 relative z-10">
          <div className="relative w-[280px] h-[380px]">
            {[
              {
                top: "0px",
                left: "40px",
                rotate: "-4deg",
                z: 1,
                color: "linear-gradient(135deg,#1a3a2a,#2d5c3f)",
                nombre: "Raúl González",
                era: "Real Madrid · 1994–2010",
              },
              {
                top: "40px",
                left: "10px",
                rotate: "2deg",
                z: 2,
                color: "linear-gradient(135deg,#2c1a4a,#4a2d80)",
                nombre: "Rivaldo",
                era: "F.C. Barcelona · 1997–2002",
              },
              {
                top: "20px",
                left: "60px",
                rotate: "-1deg",
                z: 3,
                color: "linear-gradient(135deg,#3a1a1a,#7a2d2d)",
                nombre: "Fernando Torres",
                era: "Atlético Madrid · 2001–2007",
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: card.top,
                  left: card.left,
                  transform: `rotate(${card.rotate})`,
                  zIndex: card.z,
                  width: "220px",
                  height: "300px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  style={{
                    background: card.color,
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
                      style={{ color: "var(--color-crema)" }}
                      className="font-playfair font-bold text-[13px]"
                    >
                      {card.nombre}
                    </div>
                    <div
                      style={{ color: "var(--color-dorado)" }}
                      className="font-bebas text-[10px] tracking-[2px]"
                    >
                      {card.era}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTOS DESTACADOS ── */}
      <section className="py-24 px-6 max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <div
              style={{ color: "var(--color-dorado-osc)" }}
              className="font-bebas text-[11px] tracking-[5px] mb-2"
            >
              Esta semana
            </div>
            <h2
              style={{ color: "var(--color-verde)" }}
              className="font-playfair font-black text-[clamp(28px,4vw,44px)] leading-[1.1]"
            >
              Colección{" "}
              <em style={{ color: "var(--color-dorado-osc)" }}>activa</em>
            </h2>
          </div>
          <Link
            href="/catalogo"
            style={{
              color: "var(--color-verde-mid)",
              borderBottom: "1px solid var(--color-verde-mid)",
            }}
            className="font-bebas text-[13px] tracking-[2px] no-underline pb-0.5
                       hover:text-[var(--color-dorado-osc)] hover:border-[var(--color-dorado-osc)]
                       transition-colors whitespace-nowrap"
          >
            Ver todos los cuadros →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productosDestacados.map((p) => (
            <div
              key={p.id}
              className={`bg-white rounded-sm overflow-hidden cursor-pointer
                          transition-all duration-300 hover:-translate-y-1.5
                          hover:shadow-[0_24px_48px_rgba(26,58,42,0.15)]
                          ${p.featured ? "md:col-span-2" : ""}`}
            >
              {/* Imagen */}
              <div
                style={{ background: p.color }}
                className={`flex items-center justify-center relative overflow-hidden
                            ${p.featured ? "aspect-video" : "aspect-[3/4]"}`}
              >
                <span
                  style={{ color: "rgba(255,255,255,0.08)" }}
                  className="font-bebas text-[80px] absolute top-3 right-4 leading-none select-none"
                >
                  {p.dorsal}
                </span>
                {p.badge && (
                  <span
                    style={{
                      background:
                        p.badge === "Destacado"
                          ? "var(--color-rojo)"
                          : "var(--color-dorado-osc)",
                    }}
                    className="absolute top-3 left-3 text-white font-bebas
                               text-[10px] tracking-[2px] px-2.5 py-1 rounded-sm"
                  >
                    {p.badge}
                  </span>
                )}
                <span
                  className={`${p.featured ? "text-[96px]" : "text-[64px]"} opacity-90`}
                >
                  ⚽
                </span>
              </div>

              {/* Info */}
              <div
                style={{ borderTop: "3px solid var(--color-crema-osc)" }}
                className="px-5 py-5"
              >
                <div
                  style={{ color: "var(--color-gris)" }}
                  className="font-bebas text-[10px] tracking-[3px] mb-1"
                >
                  {p.equipo}
                </div>
                <div
                  style={{ color: "var(--color-tinta)" }}
                  className="font-playfair font-bold text-[18px] leading-tight mb-1"
                >
                  {p.nombre}
                </div>
                <div
                  style={{ color: "var(--color-gris)" }}
                  className="text-[13px] italic mb-4"
                >
                  {p.año}
                </div>
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: "var(--color-verde)" }}
                    className="font-playfair font-bold text-[22px]"
                  >
                    {p.precio} €
                    <span
                      style={{ color: "var(--color-gris)" }}
                      className="text-[13px] font-normal font-baskerville ml-1"
                    >
                      / 50×70 cm
                    </span>
                  </span>
                  <button
                    style={{
                      background: "var(--color-verde)",
                      color: "var(--color-crema)",
                    }}
                    className="font-bebas text-[12px] tracking-[2px] px-4 py-2
                               rounded-sm hover:bg-[var(--color-dorado)]
                               hover:text-[var(--color-verde)] transition-colors"
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section
        style={{ background: "var(--color-verde)" }}
        className="py-24 px-6 relative overflow-hidden"
      >
        <span
          className="font-bebas absolute right-[-40px] top-1/2 -translate-y-1/2
                         text-[300px] leading-none pointer-events-none select-none"
          style={{ color: "rgba(255,255,255,0.03)" }}
        >
          10+1
        </span>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="mb-16">
            <div
              style={{ color: "var(--color-dorado)" }}
              className="font-bebas text-[11px] tracking-[5px] mb-3"
            >
              Cómo funciona
            </div>
            <h2
              style={{ color: "var(--color-crema)" }}
              className="font-playfair font-black text-[clamp(28px,4vw,44px)] leading-[1.1]"
            >
              Del recuerdo{" "}
              <em style={{ color: "var(--color-dorado)" }}>al cuadro</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
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
                  borderTop: "2px solid rgba(201,168,76,0.3)",
                  background: "rgba(255,255,255,0.04)",
                }}
                className="px-9 py-10 hover:bg-[rgba(255,255,255,0.07)] transition-colors"
              >
                <div
                  style={{ color: "var(--color-dorado)", opacity: 0.6 }}
                  className="font-bebas text-[48px] leading-none mb-4"
                >
                  {paso.num}
                </div>
                <div
                  style={{ color: "var(--color-crema)" }}
                  className="font-playfair font-bold text-[20px] mb-3"
                >
                  {paso.titulo}
                </div>
                <p
                  style={{ color: "rgba(245,239,224,0.6)" }}
                  className="text-[14px] leading-relaxed"
                >
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITA NOSTALGIA ── */}
      <section className="py-24 px-6 max-w-[900px] mx-auto text-center">
        <blockquote className="relative">
          <span
            style={{ color: "var(--color-crema-osc)" }}
            className="font-playfair absolute text-[120px] leading-none top-[-40px] left-[-20px]
                       pointer-events-none select-none"
          ></span>
          <p
            style={{ color: "var(--color-verde)" }}
            className="font-playfair font-bold italic relative z-10
                       text-[clamp(22px,3.5vw,36px)] leading-[1.4] mb-6"
          >
            Aquellos domingos frente al televisor, con el partido de las tres,
            no se olvidan.
          </p>
        </blockquote>
        <div
          style={{ background: "var(--color-dorado)" }}
          className="w-16 h-0.5 mx-auto mb-6"
        />
        <div
          style={{ color: "var(--color-dorado-osc)" }}
          className="font-bebas text-[12px] tracking-[4px]"
        >
          El Fútbol de Antes · 10+1
        </div>
      </section>
    </>
  );
}
