"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Sale = {
  id?: string;
  orderId: string;
  tableNumber: number;
  amount: number;
  paymentMethod: string;
  date: string;
};

export default function SaleForm() {
  const router = useRouter();

  const [sales, setSales] = useState<Sale[]>([]);
  const [formData, setFormData] = useState<Sale>({
    orderId: "",
    tableNumber: 1,
    amount: 0,
    paymentMethod: "cash",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "tableNumber" || name === "amount"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setSales((prev) =>
        prev.map((s) =>
          s.id === editingId ? { ...formData, id: editingId } : s
        )
      );
      setEditingId(null);
    } else {
      const newSale = { ...formData, id: Date.now().toString() };
      setSales((prev) => [...prev, newSale]);
    }
    setFormData({
      orderId: "",
      tableNumber: 1,
      amount: 0,
      paymentMethod: "cash",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleEdit = (sale: Sale) => {
    setFormData(sale);
    setEditingId(sale.id || null);
  };

  const handleDelete = (id: string) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  const handleCancel = () => {
    router.push("/admin"); // redirige al panel de administración
  };

  return (
    <div className="crud-form">
      <h3>Manage Sales</h3>
      <form onSubmit={handleSubmit}>
        <label>Order ID:</label>
        <input
          name="orderId"
          value={formData.orderId}
          onChange={handleChange}
          required
        />

        <label>Table Number:</label>
        <input
          type="number"
          name="tableNumber"
          min="1"
          value={formData.tableNumber}
          onChange={handleChange}
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          min="0"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label>Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        >
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="transfer">Transfer</option>
        </select>

        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit">{editingId ? "Update Sale" : "Add Sale"}</button>
          <button type="button" onClick={handleCancel}>Close</button>
        </div>
      </form>

      <h4>Existing Sales</h4>
      {sales.length === 0 ? (
        <p>No sales yet.</p>
      ) : (
        <ul>
          {sales.map((sale) => (
            <li key={sale.id}>
              Order {sale.orderId} - Table {sale.tableNumber} - ${sale.amount.toFixed(2)} - {sale.paymentMethod} - {sale.date}
              <div className="form-actions">
                <button type="button" onClick={() => handleEdit(sale)}>Edit</button>
                <button type="button" onClick={() => handleDelete(sale.id!)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
