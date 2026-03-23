import { notFound } from "next/navigation";
import { getProducto } from "../../lib/queries";
import DetalleClient from "./DetalleClient";
import { urlFor } from "../../lib/sanity";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const producto = await getProducto(slug);

  if (!producto) {
    return {
      title: "Producto no encontrado",
    };
  }

  const imageUrl = producto.imagen
    ? urlFor(producto.imagen).width(1200).height(630).url()
    : "/og-image.jpg";

  return {
    title: `${producto.nombre} - ${producto.equipo} | El Fútbol de Antes`,
    description: `${producto.descripcion} Cuadro de edición limitada del ${producto.equipo}. ${producto.anio}. Envío gratis en 2-4 días.`,
    keywords: `${producto.nombre}, ${producto.equipo}, cuadro ${producto.nombre}, poster ${producto.equipo}, ${producto.anio}`,
    openGraph: {
      title: `${producto.nombre} - ${producto.equipo}`,
      description: producto.descripcion,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${producto.nombre} - ${producto.equipo}`,
        },
      ],
      type: "website", // CAMBIO AQUÍ: de 'product' a 'website'
    },
    twitter: {
      card: "summary_large_image",
      title: `${producto.nombre} - ${producto.equipo}`,
      description: producto.descripcion,
      images: [imageUrl],
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = await getProducto(slug);

  if (!producto) {
    notFound();
  }

  return <DetalleClient producto={producto} />;
}
