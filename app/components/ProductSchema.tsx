import { type Producto } from "../lib/queries";
import { urlFor } from "../lib/sanity";

export default function ProductSchema({ producto }: { producto: Producto }) {
  const imageUrl = producto.imagen
    ? urlFor(producto.imagen).width(1200).url()
    : "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${producto.nombre} - ${producto.equipo}`,
    description: producto.descripcion,
    image: imageUrl,
    brand: {
      "@type": "Brand",
      name: "El Fútbol de Antes",
    },
    offers: {
      "@type": "Offer",
      price: producto.precio,
      priceCurrency: "EUR",
      availability: producto.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `https://elfutboldeantes.com/catalogo/${producto.slug.current}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "23",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
