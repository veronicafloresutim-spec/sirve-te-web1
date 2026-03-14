"use client";

import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartForm({
  initialCart,
  onCheckout,
  onCancel,
}: {
  initialCart: CartItem[];
  onCheckout: (cart: CartItem[]) => void;
  onCancel: () => void;
}) {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    onCheckout(cart);
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Your Cart</h3>

      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
              <div className="cart-actions">
                <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                  +
                </button>
                <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                  -
                </button>
                <button type="button" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h4>Total: ${calculateTotal().toFixed(2)}</h4>

      <div className="form-actions">
        <button type="submit">Confirm Order</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
