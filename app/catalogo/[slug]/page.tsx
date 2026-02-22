import { notFound } from "next/navigation";
import { getProducto } from "../../lib/queries";
import DetalleClient from "./DetalleClient";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = await getProducto(slug);

  if (!producto) {
    notFound();
  }

  return <DetalleClient producto={producto} />;
}
