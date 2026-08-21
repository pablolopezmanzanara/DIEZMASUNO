"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// El estudio de Sanity necesita todo el viewport para su propia interfaz;
// la cabecera y el pie del sitio solo estorban ahi.
const RUTAS_SIN_CHROME = [/^\/studio(\/|$)/];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ocultarChrome = RUTAS_SIN_CHROME.some((r) => r.test(pathname));

  if (ocultarChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
