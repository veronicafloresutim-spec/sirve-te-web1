"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id?: string;
  name: string;
  role: string;
  email: string;
  password: string;
};

export default function UserForm() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    name: "",
    role: "client",
    email: "",
    password: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u))
      );
      setEditingId(null);
    } else {
      const newUser = { ...formData, id: Date.now().toString() };
      setUsers((prev) => [...prev, newUser]);
    }
    setFormData({ name: "", role: "client", email: "", password: "" });
  };

  const handleEdit = (user: User) => {
    setFormData(user);
    setEditingId(user.id || null);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleCancel = () => {
    router.push("/admin"); // redirige al panel de administración
  };

  return (
    <div className="crud-form">
      <h3>Manage Users</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="client">Client</option>
          <option value="waiter">Waiter</option>
          <option value="admin">Admin</option>
        </select>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="form-actions">
          <button type="submit">{editingId ? "Update User" : "Add User"}</button>
          <button type="button" onClick={handleCancel}>Close</button>
        </div>
      </form>

      <h4>Existing Users</h4>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.role}) - {user.email}
              <div className="form-actions">
                <button type="button" onClick={() => handleEdit(user)}>Edit</button>
                <button type="button" onClick={() => handleDelete(user.id!)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
