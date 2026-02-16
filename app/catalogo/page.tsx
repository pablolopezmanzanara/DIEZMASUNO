import { getProductos } from "../lib/queries";
import CatalogoClient from "./CatalogoClient";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export default async function CatalogoPage() {
  const productos = await getProductos();
  return <CatalogoClient productos={productos} />;
}
