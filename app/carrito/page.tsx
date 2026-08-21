import CarritoClient from "./CarritoClient";

// Evita que se sirva una version estatica/cacheada tras volver de Stripe
export const dynamic = "force-dynamic";

export default function CarritoPage() {
  return <CarritoClient />;
}
