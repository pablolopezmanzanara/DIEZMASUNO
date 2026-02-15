import { getProductos } from "../lib/queries";
import CatalogoClient from "./CatalogoClient";

export const revalidate = 3600;

export default async function CatalogoPage() {
  const productos = await getProductos();
  return <CatalogoClient productos={productos} />;
}
