"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  productos: Producto[];
};

const INTERVALO_MS = 3000;

// TODO: sustituir por un campo "frase" propio de cada producto en Sanity
const FRASE_EJEMPLO = "El instante que el tiempo no pudo borrar.";

export default function CromosDestacados({ productos }: Props) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (productos.length <= 1) return;

    const timer = setInterval(() => {
      setIndice((prev) => (prev + 1) % productos.length);
    }, INTERVALO_MS);

    return () => clearInterval(timer);
  }, [productos.length]);

  if (productos.length === 0) return null;

  return (
    <div className="destacado-wrap">
      <p className="texto-titulo-seccion">
        Cromos <em>destacados</em>
      </p>

      <div className="destacado-card">
        <div className="destacado-viewport">
          <div
            className="destacado-track"
            style={{ transform: `translateX(-${indice * 100}%)` }}
          >
            {productos.map((p, i) => (
              <Link
                key={p._id}
                href={`/catalogo/${p.slug.current}`}
                className="destacado-slide"
              >
                <div className="destacado-imagen">
                  <span className="destacado-numero">
                    Nº {String(i + 1).padStart(3, "0")}
                  </span>
                  {p.imagen ? (
                    <Image
                      src={urlFor(p.imagen).width(500).height(700).quality(90).url()}
                      alt={p.nombre}
                      fill
                      style={{ objectFit: "cover" }}
                      quality={90}
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
            ))}
          </div>
        </div>

        {productos.length > 1 && (
          <div className="destacado-dots">
            {productos.map((_, i) => (
              <span
                key={i}
                className={`destacado-dot${i === indice ? " activo" : ""}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
