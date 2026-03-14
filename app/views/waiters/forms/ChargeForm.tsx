"use client";

import { useState } from "react";

export default function ChargeForm({
  tableId,
  onConfirm,
  onCancel,
}: {
  tableId: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    // TODO: Integrar con Supabase (insertar en tabla sales con tableId, amount, paymentMethod)
    alert(
      `Charge confirmed for Table ${tableId}. Amount: $${amount.toFixed(
        2
      )}, Method: ${paymentMethod}`
    );
    onConfirm();
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Charge Table {tableId}</h3>

      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />

      <label htmlFor="paymentMethod">Payment Method:</label>
      <select
        id="paymentMethod"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="transfer">Transfer</option>
      </select>

      <div className="form-actions">
        <button type="submit">Confirm Charge</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
