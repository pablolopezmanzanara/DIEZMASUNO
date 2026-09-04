"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { trackPurchase } from "../lib/analytics";

type ItemPedido = {
  id: string;
  nombre: string;
  cantidad: number;
  formato: { precio: number };
};

type Pedido = {
  orderId: string;
  total: number;
  items: ItemPedido[];
};

export default function ConfirmacionResumen() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Pedido | null) => {
        if (!data) return;
        setPedido(data);

        const claveRegistro = `compra_registrada_${sessionId}`;
        if (sessionStorage.getItem(claveRegistro)) return;
        trackPurchase(data.orderId, data.total, data.items);
        sessionStorage.setItem(claveRegistro, "1");
      })
      .catch((err) => console.error("Error registrando compra:", err));
  }, [sessionId]);

  return (
    <>
      <p className="confirmado-texto">
        Gracias por tu compra. Te hemos enviado un email de confirmación con
        todos los detalles de tu pedido y del envío.
      </p>

      {pedido && (
        <div className="confirmado-resumen">
          <h2 className="confirmado-resumen-titulo">Tu pedido</h2>
          <div className="confirmado-resumen-lista">
            {pedido.items.map((item) => (
              <div key={item.id} className="confirmado-resumen-fila">
                <span>
                  {item.nombre}{" "}
                  <span className="confirmado-resumen-cantidad">
                    x{item.cantidad}
                  </span>
                </span>
                <span>{item.formato.precio * item.cantidad} €</span>
              </div>
            ))}
          </div>
          <div className="confirmado-resumen-total">
            <span>Total</span>
            <span>{pedido.total} €</span>
          </div>
        </div>
      )}

      <div className="confirmado-aviso">
        Tu cuadro se imprimirá en las próximas 24h y llegará en un tubo
        protector en 2–4 días laborables.
      </div>

      <Link href="/#todos-los-cuadros" className="confirmado-seguir">
        Seguir comprando
      </Link>
    </>
  );
}
