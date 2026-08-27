import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CartButton({ onClick }) {
  const { count } = useCart();
  return (
    <button
      id="cart-button"
      onClick={onClick}
      className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/5 text-[var(--cream)]"
      aria-haspopup="dialog"
      aria-label="Open cart"
    >
      <span aria-hidden>🛒</span>
      <span className="text-sm">Cart</span>
      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-[var(--amber)] text-[var(--brown-900)] px-2 py-0.5 text-xs font-semibold">
        {count}
      </span>
    </button>
  );
}
