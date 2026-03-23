import { MetadataRoute } from "next";
import { getProductos } from "./lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productos = await getProductos();

  const productosUrls = productos.map((producto) => ({
    url: `https://elfutboldeantes.com/catalogo/${producto.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://elfutboldeantes.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://elfutboldeantes.com/sobre-nosotros",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://elfutboldeantes.com/peticiones",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://elfutboldeantes.com/envios",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://elfutboldeantes.com/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...productosUrls,
  ];
}
