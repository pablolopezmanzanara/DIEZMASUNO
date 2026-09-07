import { getProducto } from "./queries";
import { urlFor } from "./sanity";

export type ItemPedido = {
  slug: string;
  nombre: string;
  cantidad: number;
  precio: number;
  imagenUrl?: string;
};

// El checkout guarda "slug:cantidad,slug:cantidad" en metadata.pedido_items
// (ver app/api/checkout/route.ts). Se usa tanto para el email de pedido
// (confirmación al cliente y aviso interno) como para la página de
// pedido confirmado, para mostrar el nombre y la imagen reales de Sanity.
export async function obtenerItemsPedido(pedidoItems: string | undefined) {
  if (!pedidoItems) return [] as ItemPedido[];

  const pares = pedidoItems.split(",").filter(Boolean);

  const items = await Promise.all(
    pares.map(async (par) => {
      const [slug, cantidadStr] = par.split(":");
      const cantidad = Number(cantidadStr) || 1;
      const producto = await getProducto(slug);
      if (!producto) return null;

      return {
        slug,
        nombre: producto.nombre,
        cantidad,
        precio: producto.precio,
        imagenUrl: producto.imagen
          ? urlFor(producto.imagen).width(120).height(120).url()
          : undefined,
      };
    }),
  );

  return items.filter((item): item is NonNullable<typeof item> => item !== null);
}
