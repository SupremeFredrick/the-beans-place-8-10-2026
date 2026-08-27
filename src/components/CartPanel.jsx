import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function CartPanel({ open, onClose, onRequestSignIn }) {
  const { items, changeQty, removeItem, subtotal, clear } = useCart();
  const { token } = useAuth();

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 h-full w-96 max-w-full z-50 bg-[var(--brown-900)] text-[var(--cream)] shadow-2xl"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/6">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={onClose} className="text-[var(--cream)]/80" aria-label="Close cart">✕</button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {items.length === 0 ? (
                <div className="text-sm text-[var(--cream)]/70">Your cart is empty</div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((it) => (
                    <li key={it.id} className="flex gap-3 items-center">
                      <img src={it.image} alt={it.name} className="h-20 w-20 rounded-md object-cover" />
                      <div className="flex-1">
                        <div className="font-semibold">{it.name}</div>
                        <div className="text-sm text-[var(--cream)]/80">${it.price.toFixed(2)}</div>
                        <div className="mt-2 flex items-center gap-2">
                          <button className="px-2 rounded-md bg-white/5" onClick={() => changeQty(it.id, -1)} aria-label="Decrease">-</button>
                          <div className="px-2">{it.qty}</div>
                          <button className="px-2 rounded-md bg-white/5" onClick={() => changeQty(it.id, 1)} aria-label="Increase">+</button>
                          <button className="ml-3 text-xs text-[var(--amber)]" onClick={() => removeItem(it.id)}>Remove</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-white/6 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">Total:</div>
                <div className="text-lg font-semibold">${subtotal.toFixed(2)}</div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="primary" className="w-full" onClick={() => {
                  if (!token) {
                    onRequestSignIn && onRequestSignIn();
                    return;
                  }
                  // proceed to checkout (you can wire /api/checkout)
                  fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                    body: JSON.stringify({ items }),
                  }).then(r => {
                    if (r.ok) { clear(); onClose(); alert('Checkout succeeded (demo)'); }
                    else alert('Checkout failed');
                  }).catch(() => alert('Network error'));
                }}>Proceed to Checkout</Button>

                <Button variant="ghost" className="w-full" onClick={() => onRequestSignIn && onRequestSignIn()}>
                  Sign in to save cart
                </Button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
