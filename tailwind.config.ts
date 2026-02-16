import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: "var(--color-verde)",
        "verde-mid": "var(--color-verde-mid)",
        "verde-osc": "var(--color-verde-osc)",
        dorado: "var(--color-dorado)",
        "dorado-osc": "var(--color-dorado-osc)",
        crema: "var(--color-crema)",
        "crema-osc": "var(--color-crema-osc)",
        tinta: "var(--color-tinta)",
        gris: "var(--color-gris)",
        rojo: "var(--color-rojo)",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        bebas: ["var(--font-bebas)"],
        libre: ["var(--font-libre)"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
