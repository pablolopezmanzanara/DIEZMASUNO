"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export const CLAVE_CONSENTIMIENTO_COOKIES = "cookies_consentimiento";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CLAVE_CONSENTIMIENTO_COOKIES)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true);
      }
    } catch {
      // Si localStorage no esta disponible (modo privado, etc.), no
      // bloqueamos la web por un banner que no se puede recordar.
    }
  }, []);

  const elegir = (valor: "aceptado" | "rechazado") => {
    try {
      localStorage.setItem(CLAVE_CONSENTIMIENTO_COOKIES, valor);
    } catch {
      // Ignorado: sin storage, simplemente no se recordará la eleccion.
    }
    window.dispatchEvent(new Event("cookies-consentimiento-cambiado"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookies-banner">
      <p className="cookies-banner-texto">
        Usamos cookies propias y de analítica (Google Analytics) para
        entender cómo se usa la web. Puedes aceptarlas o rechazarlas cuando
        quieras. Más información en nuestra{" "}
        <Link href="/privacidad" className="cookies-banner-enlace">
          Política de privacidad
        </Link>
        .
      </p>
      <div className="cookies-banner-botones">
        <button
          onClick={() => elegir("rechazado")}
          className="cookies-banner-boton cookies-banner-rechazar"
        >
          Rechazar
        </button>
        <button
          onClick={() => elegir("aceptado")}
          className="cookies-banner-boton cookies-banner-aceptar"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
