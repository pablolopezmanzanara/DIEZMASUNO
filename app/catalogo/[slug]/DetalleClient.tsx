"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "../../context/CarritoContext";
import { type Producto } from "../../lib/queries";
import { urlFor } from "../../lib/sanity";
import ProductSchema from "../../components/ProductSchema";
import { trackViewItem, trackAddToCart } from "../../lib/analytics";

type Props = {
  producto: Producto;
  relacionados: Producto[];
};

function IconoCamion() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="13" height="10" rx="1" />
      <path d="M14 9h4l3 3v4h-7z" />
      <circle cx="5.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  );
}

function IconoMedalla() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" />
    </svg>
  );
}

function IconoDevolucion() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <polyline points="3 4 3 9 8 9" />
    </svg>
  );
}

function IconoChevron() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function DetalleClient({ producto, relacionados }: Props) {
  const [cantidad, setCantidad] = useState(1);
  const [imagenActual, setImagenActual] = useState(0);
  const { aniadir } = useCarrito();
  const [aniadido, setAniadido] = useState(false);

  const imagenes = [
    ...(producto.imagen ? [producto.imagen] : []),
    ...(producto.galeria || []),
  ];

  useEffect(() => {
    trackViewItem(producto);
  }, [producto]);

  const handleAniadir = () => {
    aniadir(
      {
        slug: producto.slug.current,
        nombre: producto.nombre,
        equipo: producto.equipo,
        dorsal: producto.dorsal,
        color: "#FFFFFF",
        imagen: producto.imagen,
        formato: {
          id: "50x70",
          label: "50×70 cm",
          precio: producto.precio,
        },
      },
      cantidad,
    );

    trackAddToCart(producto, cantidad);

    setAniadido(true);
    setTimeout(() => setAniadido(false), 2000);
  };

  const siguiente = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  return (
    <div className="detalle-ficha">
      <ProductSchema producto={producto} />

      <div className="detalle-ficha-contenido">
        {/* Imagen centrada, flechas fuera del recuadro */}
        <div className="detalle-ficha-imagen-wrap">
          <div className="detalle-ficha-imagen-marco">
            {imagenes.length > 1 && (
              <button
                onClick={anterior}
                className="detalle-ficha-flecha izq"
                aria-label="Imagen anterior"
              >
                ‹
              </button>
            )}

            <div className="detalle-ficha-imagen">
              {imagenes.length > 0 ? (
                <Image
                  src={urlFor(imagenes[imagenActual])
                    .width(900)
                    .height(900)
                    .quality(95)
                    .url()}
                  alt={producto.nombre}
                  fill
                  style={{ objectFit: "cover" }}
                  quality={100}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMzMzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEzMzMiIGZpbGw9IiMxYTNhMmEiLz48L3N2Zz4="
                />
              ) : (
                <div className="detalle-ficha-imagen-placeholder">
                  <span>⚽</span>
                </div>
              )}
            </div>

            {imagenes.length > 1 && (
              <button
                onClick={siguiente}
                className="detalle-ficha-flecha der"
                aria-label="Imagen siguiente"
              >
                ›
              </button>
            )}
          </div>

          {imagenes.length > 1 && (
            <div className="detalle-ficha-dots">
              {imagenes.map((_, i) => (
                <button
                  key={i}
                  className={`detalle-ficha-dot${i === imagenActual ? " activo" : ""}`}
                  onClick={() => setImagenActual(i)}
                  aria-label={`Ver imagen ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Título y precio */}
        <div className="detalle-ficha-header">
          <div>
            <div className="detalle-ficha-equipo">{producto.equipo}</div>
            <h1 className="detalle-ficha-nombre">{producto.nombre}</h1>
          </div>
          <div className="detalle-ficha-precio">{producto.precio} €</div>
        </div>

        {/* Iconos */}
        <div className="detalle-ficha-iconos">
          <div>
            <IconoCamion />
            <span>Envío 2-4 días</span>
          </div>
          <div>
            <IconoMedalla />
            <span>Alta calidad</span>
          </div>
          <div>
            <IconoDevolucion />
            <span>Devolución 30d</span>
          </div>
        </div>

        {/* Formato */}
        <p className="detalle-ficha-formato">
          <strong>Formato:</strong> 50×70 cm · Impresión de alta calidad
        </p>

        {/* Cantidad + Añadir */}
        <div className="detalle-ficha-compra">
          <div className="detalle-ficha-cantidad">
            <button
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              aria-label="Restar cantidad"
            >
              −
            </button>
            <span>{cantidad}</span>
            <button
              onClick={() => setCantidad(cantidad + 1)}
              aria-label="Sumar cantidad"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAniadir}
            className={`detalle-ficha-anadir${aniadido ? " anadido" : ""}`}
          >
            {aniadido ? "✓ Añadido" : `Añadir · ${producto.precio * cantidad} €`}
          </button>
        </div>

        {producto.descripcion && (
          <p className="detalle-ficha-descripcion">{producto.descripcion}</p>
        )}

        {/* También te puede interesar */}
        {relacionados.length > 0 && (
          <div className="detalle-ficha-relacionados">
            <h2 className="detalle-ficha-relacionados-titulo">
              También te puede interesar
            </h2>
            <div className="detalle-ficha-relacionados-lista">
              {relacionados.map((r) => (
                <Link
                  key={r._id}
                  href={`/catalogo/${r.slug.current}`}
                  className="detalle-ficha-relacionado"
                >
                  <div className="detalle-ficha-relacionado-imagen">
                    {r.imagen && (
                      <Image
                        src={urlFor(r.imagen).width(112).height(112).quality(75).url()}
                        alt={r.nombre}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="detalle-ficha-relacionado-info">
                    <div className="detalle-ficha-relacionado-nombre">{r.nombre}</div>
                    <div className="detalle-ficha-relacionado-equipo">{r.equipo}</div>
                  </div>
                  <div className="detalle-ficha-relacionado-precio">{r.precio} €</div>
                  <IconoChevron />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
