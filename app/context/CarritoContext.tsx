"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type ItemCarrito = {
  id: number;
  slug: string;
  nombre: string;
  equipo: string;
  dorsal: string;
  color: string;
  formato: {
    id: string;
    label: string;
    precio: number;
  };
  cantidad: number;
};

type CarritoContextType = {
  items: ItemCarrito[];
  totalItems: number;
  totalPrecio: number;
  aniadir: (item: Omit<ItemCarrito, "cantidad">, cantidad?: number) => void;
  eliminar: (id: number) => void;
  actualizar: (id: number, cantidad: number) => void;
  vaciar: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  // Inicialización lazy: solo lee localStorage la primera vez
  const [items, setItems] = useState<ItemCarrito[]>(() => {
    if (typeof window !== "undefined") {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    }
    return [];
  });

  // Solo guardar cuando cambie items
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("carrito", JSON.stringify(items));
    }
  }, [items]);

  const aniadir = (
    item: Omit<ItemCarrito, "cantidad">,
    cantidad: number = 1,
  ) => {
    setItems((prev) => {
      const existe = prev.find(
        (i) =>
          i.slug === item.slug &&
          i.formato.id === item.formato.id &&
          i.color === item.color,
      );

      if (existe) {
        return prev.map((i) =>
          i.slug === item.slug &&
          i.formato.id === item.formato.id &&
          i.color === item.color
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i,
        );
      }

      return [...prev, { ...item, cantidad }];
    });
  };

  const eliminar = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizar = (id: number, cantidad: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item,
      ),
    );
  };

  const vaciar = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = items.reduce(
    (sum, item) => sum + item.formato.precio * item.cantidad,
    0,
  );

  return (
    <CarritoContext.Provider
      value={{
        items,
        totalItems,
        totalPrecio,
        aniadir: aniadir,
        eliminar,
        actualizar,
        vaciar,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  }
  return context;
}
