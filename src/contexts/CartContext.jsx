import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
const CART_KEY = "site_cart_v1";

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setItems((prev) => {
      const copy = prev.map((i) => ({ ...i }));
      const idx = copy.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      copy[idx].qty = Math.max(0, copy[idx].qty + delta);
      if (copy[idx].qty === 0) copy.splice(idx, 1);
      return copy;
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((c, i) => c + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, changeQty, removeItem, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}
