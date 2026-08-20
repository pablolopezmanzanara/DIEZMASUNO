"use client";

import Link from "next/link";
import Image from "next/image";
import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

type Props = {
  producto: Producto;
  estaAniadido: boolean;
  onAniadir: (p: Producto, e: React.MouseEvent) => void;
  numero?: number;
};

function IconoMas() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function IconoCheck() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

export default function ProductCard({ producto: p, estaAniadido, onAniadir, numero }: Props) {
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

        <button
          onClick={(e) => onAniadir(p, e)}
          disabled={estaAniadido}
          className={`producto-card-add-rapido${estaAniadido ? " anadido" : ""}`}
          aria-label={estaAniadido ? "Añadido al carrito" : "Añadir al carrito"}
        >
          {estaAniadido ? <IconoCheck /> : <IconoMas />}
        </button>
      </div>

      <div className="producto-card-info">
        <div className="producto-card-nombre">{p.nombre}</div>
        <div className="producto-card-meta">
          <span className="producto-card-equipo">{p.equipo}</span>
          <span className="producto-card-ticket">{p.precio} €</span>
        </div>
      </div>
    </Link>
  );
}
