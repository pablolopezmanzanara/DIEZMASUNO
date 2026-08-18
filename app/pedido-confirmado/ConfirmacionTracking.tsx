"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { trackPurchase } from "../lib/analytics";

export default function ConfirmacionTracking() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) return;

    const claveRegistro = `compra_registrada_${sessionId}`;
    if (sessionStorage.getItem(claveRegistro)) return;

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        trackPurchase(data.orderId, data.total, data.items);
        sessionStorage.setItem(claveRegistro, "1");
      })
      .catch((err) => console.error("Error registrando compra:", err));
  }, [sessionId]);

  return null;
}
