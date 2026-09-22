"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CLAVE_CONSENTIMIENTO_COOKIES } from "./CookieConsent";

export default function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID; // Añadir en .env.local
  const [consentido, setConsentido] = useState(false);

  useEffect(() => {
    const comprobar = () => {
      try {
        setConsentido(
          localStorage.getItem(CLAVE_CONSENTIMIENTO_COOKIES) === "aceptado",
        );
      } catch {
        setConsentido(false);
      }
    };

    comprobar();
    window.addEventListener("cookies-consentimiento-cambiado", comprobar);
    return () =>
      window.removeEventListener("cookies-consentimiento-cambiado", comprobar);
  }, []);

  if (!GA_MEASUREMENT_ID || !consentido) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
