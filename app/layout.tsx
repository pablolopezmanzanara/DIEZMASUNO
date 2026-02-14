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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "900"],
  style: ["normal", "italic"],
});

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-baskerville",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "El Fútbol de Antes · 10+1",
  description: "Cuadros de edición limitada del fútbol español clásico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${baskerville.variable} ${bebas.variable}`}
      >
        <CarritoProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
