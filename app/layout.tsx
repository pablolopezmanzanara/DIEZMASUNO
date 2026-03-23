import type { Metadata } from "next";
import {
  Playfair_Display,
  Libre_Baskerville,
  Bebas_Neue,
} from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import ScrollToTop from "./components/ScrollToTop";
import Analytics from "./components/Analytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const baskerville = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-baskerville",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "El Fútbol de Antes | Cuadros Vintage Leyendas Fútbol Español",
  description:
    "Cuadros de edición limitada de leyendas del fútbol español. Impresiones de alta calidad con diseños únicos. Raúl, Torres, Xavi, Casillas y más. Envío gratuito.",
  keywords:
    "cuadros futbol, posters futbol español, laminas futbol vintage, decoracion futbol retro, cuadros deportivos, leyendas futbol, raul gonzalez, fernando torres, xavi hernandez",
  authors: [{ name: "El Fútbol de Antes" }],
  creator: "El Fútbol de Antes",
  publisher: "El Fútbol de Antes",
  metadataBase: new URL("https://elfutboldeantes.com"), // Cambiar por tu dominio real
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://elfutboldeantes.com",
    title: "El Fútbol de Antes | Cuadros Vintage Fútbol Español",
    description:
      "Cuadros de edición limitada de leyendas del fútbol español. Raúl, Torres, Xavi, Casillas y más.",
    siteName: "El Fútbol de Antes",
    images: [
      {
        url: "/og-image.jpg", // Crear esta imagen 1200x630px
        width: 1200,
        height: 630,
        alt: "El Fútbol de Antes - Cuadros Vintage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "El Fútbol de Antes | Cuadros Vintage Fútbol Español",
    description: "Cuadros de edición limitada de leyendas del fútbol español",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Verificación Google Search Console (cuando la tengas) */}
        {/* <meta name="google-site-verification" content="tu-codigo-aqui" /> */}
      </head>
      <body
        className={`${playfair.variable} ${baskerville.variable} ${bebas.variable}`}
      >
        <Analytics />
        <ScrollToTop />
        <CarritoProvider>
          <Header />
          {children}
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
