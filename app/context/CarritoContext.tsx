"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Formato = {
  id: string;
  label: string;
  precio: number;
};

export type ItemCarrito = {
  id: number;
  slug: string;
  nombre: string;
  equipo: string;
  dorsal: string;
  color: string;
  formato: Formato;
  cantidad: number;
};

type CarritoContextType = {
  items: ItemCarrito[];
  añadir: (item: Omit<ItemCarrito, "cantidad">) => void;
  eliminar: (id: number, formatoId: string) => void;
  cambiarCantidad: (id: number, formatoId: string, cantidad: number) => void;
  vaciar: () => void;
  total: number;
  totalItems: number;
};

const CarritoContext = createContext<CarritoContextType | null>(null);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const añadir = (nuevoItem: Omit<ItemCarrito, "cantidad">) => {
    setItems((prev) => {
      const existe = prev.find(
        (i) => i.id === nuevoItem.id && i.formato.id === nuevoItem.formato.id,
      );
      if (existe) {
        return prev.map((i) =>
          i.id === nuevoItem.id && i.formato.id === nuevoItem.formato.id
            ? { ...i, cantidad: i.cantidad + 1 }
            : i,
        );
      }
      return [...prev, { ...nuevoItem, cantidad: 1 }];
    });
  };

  const eliminar = (id: number, formatoId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.formato.id === formatoId)),
    );
  };

  const cambiarCantidad = (id: number, formatoId: string, cantidad: number) => {
    if (cantidad < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.formato.id === formatoId ? { ...i, cantidad } : i,
      ),
    );
  };

  const vaciar = () => setItems([]);

  const total = items.reduce(
    (acc, i) => acc + i.formato.precio * i.cantidad,
    0,
  );
  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        items,
        añadir,
        eliminar,
        cambiarCantidad,
        vaciar,
        total,
        totalItems,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
}
