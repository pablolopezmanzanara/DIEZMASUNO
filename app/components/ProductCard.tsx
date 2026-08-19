"use client";

import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  producto: Producto;
  estaAniadido: boolean;
  onAniadir: (p: Producto, e: React.MouseEvent) => void;
};

export default function ProductCard({ producto: p, estaAniadido, onAniadir }: Props) {
  return (
    <Link href={`/catalogo/${p.slug.current}`} className="producto-card">
      <div className="producto-card-imagen">
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
      </div>

      <div className="producto-card-info">
        <div>
          <div className="producto-card-equipo">{p.equipo}</div>
          <div className="producto-card-nombre">{p.nombre}</div>
          <div className="producto-card-anio">{p.anio}</div>
        </div>

        <div className="producto-card-derecha">
          <span className="producto-card-precio">{p.precio} €</span>
          <button
            onClick={(e) => onAniadir(p, e)}
            disabled={estaAniadido}
            className={`producto-card-boton${estaAniadido ? " anadido" : ""}`}
          >
            {estaAniadido ? "Añadido" : "Añadir"}
          </button>
        </div>
      </div>
    </Link>
  );
}
