import { Suspense } from "react";
import ConfirmacionResumen from "./ConfirmacionResumen";

export default function PedidoConfirmadoPage() {
  return (
    <section className="carrito-pagina confirmado-pagina">
      <div className="confirmado-check">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          stroke="var(--color-crema)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="confirmado-titulo">¡Pedido confirmado!</h1>
      <Suspense fallback={null}>
        <ConfirmacionResumen />
      </Suspense>
    </section>
  );
}
