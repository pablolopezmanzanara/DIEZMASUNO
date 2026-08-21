// Unica fuente de la URL del sitio. Si NEXT_PUBLIC_SITE_URL no esta
// configurada en el entorno (p.ej. falta en las variables de Vercel),
// cae en el dominio real en vez de reventar el build entero.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://elfutboldeantes.com";
