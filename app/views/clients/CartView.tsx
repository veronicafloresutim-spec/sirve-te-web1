"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Datos de ejemplo (luego se reemplazarán con Supabase)
const initialCart = [
  { id: "p1", name: "Coffee", price: 2.5, quantity: 2 },
  { id: "p2", name: "Sandwich", price: 5.0, quantity: 1 },
];

export default function CartView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableId"); // mesa seleccionada

  const [cart, setCart] = useState(initialCart);

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

  const handleCheckout = () => {
    // TODO: Integrar con Supabase (tabla pedidos + detallePedido + ventas)
    alert(`Payment successful for Table ${tableId}!`);
    router.push("/views/home/HomeView");
  };

  const handleCancel = () => {
    // Cancelar pedido y volver a bienvenida
    alert("Order cancelled.");
    router.push("/views/clients/ClientWelcomeView");
  };

  return (
    <div className="app-main">
      <h2>Your Cart</h2>
      {tableId && <p>Selected Table: {tableId}</p>}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
                {(item.price * item.quantity).toFixed(2)}
                <div className="cart-actions">
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>
          <div className="form-actions">
            <button onClick={handleCheckout}>Pay Now</button>
            <button onClick={handleCancel}>Cancel Order</button>
          </div>
        </div>
      )}
    </div>
  );
}
