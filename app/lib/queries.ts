/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "./sanity";
export type Producto = {
  _id: string;
  nombre: string;
  slug: { current: string };
  equipo: string;
  anio: string;
  dorsal: string;
  descripcion: string;
  historia?: string;
  imagen?: any;
  galeria?: any[]; // AÑADIR
  precio: number;
  badge?: string;
  categoria?: string;
  logros?: string[];
  disponible: boolean;
  destacado?: boolean;
  tipo?: "jugador" | "otro";
  orden?: number; // AÑADIR ESTE CAMPO
};

export async function getProductos(): Promise<Producto[]> {
  return client.fetch(
    `*[_type == "producto" && disponible == true] | order(orden asc, _createdAt desc) {
      _id,
      nombre,
      slug,
      equipo,
      anio,
      dorsal,
      descripcion,
      imagen,
      galeria,
      precio,
      badge,
      destacado,
      tipo,
      orden
    }`,
  );
}

export async function getProductosDestacados(): Promise<Producto[]> {
  return client.fetch(
    `*[_type == "producto" && disponible == true && destacado == true] | order(orden asc, _createdAt desc) {
      _id,
      nombre,
      slug,
      equipo,
      anio,
      dorsal,
      descripcion,
      imagen,
      galeria,
      precio,
      badge,
      tipo,
      orden
    }`,
  );
}

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
      galeria,
      precio,
      badge,
      categoria,
      logros,
      disponible,
      destacado,
      tipo,
      orden
    }`,
    { slug },
  );
}
