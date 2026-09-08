"use client";

import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  producto: Producto;
  numero?: number;
};

export default function ProductCard({ producto: p, numero }: Props) {
  // Siempre las dos primeras palabras del equipo en la primera linea, el
  // resto (si lo hay) debajo - asi el corte de linea es predecible en vez
  // de depender de cuanto quepa segun el ancho disponible.
  const palabrasEquipo = p.equipo.split(" ");
  const primeraLineaEquipo = palabrasEquipo.slice(0, 2).join(" ");
  const segundaLineaEquipo = palabrasEquipo.slice(2).join(" ");

  const imagenCromo = p.galeria?.[0];

  return (
    <Link href={`/catalogo/${p.slug.current}`} className="producto-card">
      <div className="producto-card-imagen">
        {numero !== undefined && (
          <span className="producto-card-numero">
            Nº {String(numero).padStart(3, "0")}
          </span>
        )}
        {p.imagen ? (
          <Image
            src={urlFor(p.imagen).width(500).height(667).quality(90).url()}
            alt={p.nombre}
            fill
            style={{ objectFit: "cover" }}
            quality={90}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0iIzFhM2EyYSIvPjwvc3ZnPg=="
          />
        ) : (
          <span className="producto-card-placeholder">⚽</span>
        )}

        {imagenCromo && (
          <div className="producto-card-cromo-mini">
            <Image
              src={urlFor(imagenCromo).width(120).height(160).quality(85).url()}
              alt={`Cromo de ${p.nombre}`}
              fill
              style={{ objectFit: "cover" }}
              quality={85}
            />
          </div>
        )}
      </div>

      <div className="producto-card-info">
        <div className="producto-card-nombre">{p.nombre}</div>
        <div className="producto-card-meta">
          <span className="producto-card-equipo">
            {primeraLineaEquipo}
            {segundaLineaEquipo && (
              <>
                <br />
                {segundaLineaEquipo}
              </>
            )}
          </span>
          <span className="producto-card-ticket">{p.precio} €</span>
        </div>
      </div>
    </Link>
  );
}
