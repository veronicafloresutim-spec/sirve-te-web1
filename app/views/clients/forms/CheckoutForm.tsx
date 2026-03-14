"use client";

import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CheckoutForm({
  cart,
  tableId,
  onConfirm,
  onCancel,
}: {
  cart: CartItem[];
  tableId: string | null;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // TODO: Integrar con Supabase (insertar en pedidos, detallePedido y ventas)
    alert(
      `Payment confirmed for Table ${tableId} with ${paymentMethod}. Total: $${calculateTotal().toFixed(
        2
      )}`
    );
    onConfirm();
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Checkout</h3>
      {tableId && <p>Selected Table: {tableId}</p>}

      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>

      <h4>Total: ${calculateTotal().toFixed(2)}</h4>

      <label htmlFor="payment">Payment Method:</label>
      <select
        id="payment"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="transfer">Transfer</option>
      </select>

      <div className="form-actions">
        <button type="submit">Confirm Payment</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
