/* eslint-disable @typescript-eslint/no-explicit-any */
export const trackEvent = (eventName: string, params?: any) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
};

// Eventos específicos
export const trackViewItem = (producto: any) => {
  trackEvent("view_item", {
    currency: "EUR",
    value: producto.precio,
    items: [
      {
        item_id: producto._id,
        item_name: producto.nombre,
        item_category: producto.equipo,
        price: producto.precio,
      },
    ],
  });
};

export const trackAddToCart = (producto: any, cantidad: number) => {
  trackEvent("add_to_cart", {
    currency: "EUR",
    value: producto.precio * cantidad,
    items: [
      {
        item_id: producto._id,
        item_name: producto.nombre,
        item_category: producto.equipo,
        price: producto.precio,
        quantity: cantidad,
      },
    ],
  });
};

export const trackPurchase = (orderId: string, total: number, items: any[]) => {
  trackEvent("purchase", {
    transaction_id: orderId,
    value: total,
    currency: "EUR",
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.nombre,
      price: item.formato.precio,
      quantity: item.cantidad,
    })),
  });
};

export const trackBeginCheckout = (total: number, items: any[]) => {
  trackEvent("begin_checkout", {
    currency: "EUR",
    value: total,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.nombre,
      price: item.formato.precio,
      quantity: item.cantidad,
    })),
  });
};
