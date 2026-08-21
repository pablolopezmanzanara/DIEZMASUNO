import { MetadataRoute } from "next";
import { getProductos } from "./lib/queries";
import { SITE_URL } from "./lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productos = await getProductos();

  const productosUrls = productos.map((producto) => ({
    url: `${SITE_URL}/catalogo/${producto.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/peticiones`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/envios`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...productosUrls,
  ];
}
