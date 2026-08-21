"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  productos: Producto[];
};

const INTERVALO_MS = 3500;
const UMBRAL_CAMBIO_PX = 50;
const UMBRAL_ARRASTRE_PX = 6;

// TODO: sustituir por un campo "frase" propio de cada producto en Sanity
const FRASE_EJEMPLO = "El instante que el tiempo no pudo borrar.";

export default function CromosDestacados({ productos }: Props) {
  const [indice, setIndice] = useState(0);
  const [arrastrando, setArrastrando] = useState(false);
  const [desplazamiento, setDesplazamiento] = useState(0);
  const inicioXRef = useRef(0);
  const huboArrastreRef = useRef(false);

  // Se reprograma cada vez que "indice" cambia (automatico o manual) y se
  // pausa mientras el usuario arrastra, para no interrumpirle el gesto.
  useEffect(() => {
    if (productos.length <= 1 || arrastrando) return;

    const timer = setTimeout(() => {
      setIndice((prev) => (prev + 1) % productos.length);
    }, INTERVALO_MS);

    return () => clearTimeout(timer);
  }, [indice, productos.length, arrastrando]);

  if (productos.length === 0) return null;

  const manejarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Solo tactil: en ordenador el carrusel avanza unicamente en automatico
    if (productos.length <= 1 || e.pointerType !== "touch") return;
    inicioXRef.current = e.clientX;
    huboArrastreRef.current = false;
    setArrastrando(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const manejarPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!arrastrando) return;
    const delta = e.clientX - inicioXRef.current;
    if (Math.abs(delta) > UMBRAL_ARRASTRE_PX) {
      huboArrastreRef.current = true;
    }
    setDesplazamiento(delta);
  };

  const finalizarArrastre = () => {
    if (!arrastrando) return;

    if (desplazamiento > UMBRAL_CAMBIO_PX) {
      setIndice((prev) => (prev - 1 + productos.length) % productos.length);
    } else if (desplazamiento < -UMBRAL_CAMBIO_PX) {
      setIndice((prev) => (prev + 1) % productos.length);
    }

    setArrastrando(false);
    setDesplazamiento(0);
  };

  const manejarClickSlide = (e: React.MouseEvent) => {
    if (huboArrastreRef.current) {
      e.preventDefault();
    }
  };

  return (
    <div className="destacado-wrap">
      <p className="texto-titulo-seccion">
        Cromos <em>incluidos</em>
      </p>

      <div className="destacado-card">
        <div className="destacado-viewport">
          <div
            className="destacado-track"
            onPointerDown={manejarPointerDown}
            onPointerMove={manejarPointerMove}
            onPointerUp={finalizarArrastre}
            onPointerCancel={finalizarArrastre}
            onPointerLeave={finalizarArrastre}
            style={{
              transform: `translateX(calc(-${indice * 100}% + ${desplazamiento}px))`,
              transition: arrastrando
                ? "none"
                : "transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {productos.map((p) => {
              // El cromo destacado usa la 2ª imagen del producto (1ª de la
              // galeria, tras la principal); si aun no existe, cae en la
              // principal para no dejar el hueco vacio.
              const imagenCromo = p.galeria?.[0] ?? p.imagen;

              return (
                <Link
                  key={p._id}
                  href={`/catalogo/${p.slug.current}`}
                  className="destacado-slide"
                  onClick={manejarClickSlide}
                  draggable={false}
                >
                  <div className="destacado-imagen">
                    {imagenCromo ? (
                      <Image
                        src={urlFor(imagenCromo).width(500).height(700).quality(90).url()}
                        alt={p.nombre}
                        fill
                        style={{ objectFit: "cover" }}
                        quality={90}
                        draggable={false}
                      />
                    ) : (
                      <span className="destacado-placeholder">⚽</span>
                    )}
                  </div>

                  <div className="destacado-info">
                    <p className="destacado-frase">&ldquo;{FRASE_EJEMPLO}&rdquo;</p>
                    <div className="destacado-divisor" />
                    <div className="destacado-identidad">
                      <div className="destacado-equipo">{p.equipo}</div>
                      <div className="destacado-nombre">{p.nombre}</div>
                    </div>
                    <span className="destacado-boton">Ver ficha · {p.precio} €</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {productos.length > 1 && (
          <div className="destacado-dots">
            {productos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                className={`destacado-dot${i === indice ? " activo" : ""}`}
                aria-label={`Ir al cromo ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
