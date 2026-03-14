"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterUserForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [role, setRole] = useState("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Integrar con Supabase (tabla usuarios)
    // Ejemplo:
    // await supabase.from("usuarios").insert([
    //   { nombre: name, rol: role, email, password }
    // ]);

    alert(`User registered: ${name}, role: ${role}`);

    // Redirigir al login después de registrar
    router.push("/login");
  };

  const handleCancel = () => {
    // Redirigir al login si se cancela
    router.push("/login");
  };

  return (
    <form onSubmit={handleRegister} className="crud-form">
      <h3>Register New User</h3>

      <label>Name:</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label>Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="client">Client</option>
        <option value="waiter">Waiter</option>
        <option value="admin">Admin</option>
      </select>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}
