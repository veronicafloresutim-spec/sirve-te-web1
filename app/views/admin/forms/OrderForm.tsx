"use client";

import { useState } from "react";

type Order = {
  id?: string;
  clientName: string;
  tableNumber: number;
  status: string;
  total: number;
};

export default function OrderForm({ onCancel }: { onCancel: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState<Order>({
    clientName: "",
    tableNumber: 1,
    status: "pending",
    total: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "tableNumber" || name === "total"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingId ? { ...formData, id: editingId } : o
        )
      );
      setEditingId(null);
    } else {
      const newOrder = { ...formData, id: Date.now().toString() };
      setOrders((prev) => [...prev, newOrder]);
    }
    setFormData({ clientName: "", tableNumber: 1, status: "pending", total: 0 });
  };

  const handleEdit = (order: Order) => {
    setFormData(order);
    setEditingId(order.id || null);
  };

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="crud-form">
      <h3>Manage Orders</h3>
      <form onSubmit={handleSubmit}>
        <label>Client Name:</label>
        <input
          name="clientName"
          value={formData.clientName}
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

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label>Total:</label>
        <input
          type="number"
          name="total"
          min="0"
          step="0.01"
          value={formData.total}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Order" : "Add Order"}
          </button>
          <button type="button" onClick={onCancel}>
            Close
          </button>
        </div>
      </form>

      <h4>Existing Orders</h4>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.clientName} - Table {order.tableNumber} - {order.status} - $
              {Number(order.total).toFixed(2)}
              <div className="form-actions">
                <button type="button" onClick={() => handleEdit(order)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(order.id!)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
