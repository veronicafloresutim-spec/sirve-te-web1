"use client";

import { useState } from "react";

export default function ClientNameForm({ onSubmit, onCancel }: { 
  onSubmit: (name: string) => void; 
  onCancel: () => void; 
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    // Enviar nombre al flujo principal (ej. guardar en tabla usuarios o asociar al pedido)
    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Enter Your Name</h3>

      <label htmlFor="clientName">Name:</label>
      <input
        id="clientName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
      />

      <div className="form-actions">
        <button type="submit">Continue</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
