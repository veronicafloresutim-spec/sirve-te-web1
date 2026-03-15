"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Table = {
  id?: string;
  number: number;
  status: string;
};

export default function TableForm() {
  const router = useRouter();

  const [tables, setTables] = useState<Table[]>([]);
  const [formData, setFormData] = useState<Table>({
    number: 1,
    status: "available",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...formData, id: editingId } : t
        )
      );
      setEditingId(null);
    } else {
      const newTable = { ...formData, id: Date.now().toString() };
      setTables((prev) => [...prev, newTable]);
    }
    setFormData({ number: 1, status: "available" });
  };

  const handleEdit = (table: Table) => {
    setFormData(table);
    setEditingId(table.id || null);
  };

  const handleDelete = (id: string) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCancel = () => {
    router.push("/admin"); // redirige al panel de administración
  };

  return (
    <div className="crud-form">
      <h3>Manage Tables</h3>
      <form onSubmit={handleSubmit}>
        <label>Table Number:</label>
        <input
          type="number"
          name="number"
          min="1"
          value={formData.number}
          onChange={handleChange}
          required
        />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="reserved">Reserved</option>
        </select>

        <div className="form-actions">
          <button type="submit">{editingId ? "Update Table" : "Add Table"}</button>
          <button type="button" onClick={handleCancel}>Close</button>
        </div>
      </form>

      <h4>Existing Tables</h4>
      {tables.length === 0 ? (
        <p>No tables yet.</p>
      ) : (
        <ul>
          {tables.map((table) => (
            <li key={table.id}>
              Table {table.number} - {table.status}
              <div className="form-actions">
                <button type="button" onClick={() => handleEdit(table)}>Edit</button>
                <button type="button" onClick={() => handleDelete(table.id!)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
