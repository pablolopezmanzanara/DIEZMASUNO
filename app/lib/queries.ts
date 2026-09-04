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
  notaDestacada?: string;
  imagen?: any;
  galeria?: any[]; // AÑADIR
  precio: number;
  badge?: string;
  categoria?: string;
  logros?: string[];
  disponible: boolean;
  tieneCromo?: boolean;
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
      tipo,
      orden
    }`,
  );
}

export async function getProductosConCromo(): Promise<Producto[]> {
  return client.fetch(
    `*[_type == "producto" && disponible == true && tieneCromo == true] | order(orden asc, _createdAt desc) {
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
      notaDestacada,
      imagen,
      galeria,
      precio,
      badge,
      categoria,
      logros,
      disponible,
      tieneCromo,
      tipo,
      orden
    }`,
    { slug },
  );
}
