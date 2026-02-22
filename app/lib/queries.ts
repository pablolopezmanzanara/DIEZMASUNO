import { client } from "./sanity";

export type Producto = {
  _id: string;
  nombre: string;
  slug: { current: string };
  equipo: string;
  anio: string;
  dorsal: string;
  descripcion: string;
  historia: string;
  imagen: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  precio: number;
  badge: string;
  categoria: string;
  logros: string[];
  disponible: boolean;
  destacado: boolean;
  tipo: "jugador" | "otro";
};

// Todos los productos disponibles
export async function getProductos(): Promise<Producto[]> {
  return client.fetch(`
    *[_type == "producto" && disponible == true] | order(_createdAt desc) {
      _id, nombre, slug, equipo, anio, dorsal,
      descripcion, imagen, precio, badge, categoria, disponible, destacado, tipo
    }
  `);
}

// Productos destacados para la página de inicio
export async function getProductosDestacados(): Promise<Producto[]> {
  return client.fetch(`
    *[_type == "producto" && disponible == true && destacado == true] | order(_createdAt desc) {
      _id, nombre, slug, equipo, anio, dorsal,
      descripcion, imagen, precio, badge, categoria, tipo
    }
  `);
}

// Un producto por slug
export async function getProducto(slug: string): Promise<Producto | null> {
  return client.fetch(
    `*[_type == "producto" && slug.current == $slug][0] {
      _id,
      nombre,
      slug,
      equipo,
      anio,
      dorsal,
      descripcion,
      historia,
      imagen,
      precio,
      badge,
      categoria,
      logros,
      disponible,
      destacado,
      tipo
    }`,
    { slug }, // <-- ESTO ES CRÍTICO: pasar el slug como parámetro
  );
}

// Slugs para generateStaticParams
export async function getProductoSlugs(): Promise<{ slug: string }[]> {
  return client.fetch(`
    *[_type == "producto" && disponible == true] {
      "slug": slug.current
    }
  `);
}
