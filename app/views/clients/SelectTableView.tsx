"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Datos de ejemplo (luego se reemplazarán con Supabase)
const initialTables = [
  { id: "1", number: 1, status: "available" },
  { id: "2", number: 2, status: "occupied" },
  { id: "3", number: 3, status: "reserved" },
  { id: "4", number: 4, status: "available" },
];

export default function SelectTableView() {
  const router = useRouter();
  const [tables, setTables] = useState(initialTables);

  const handleSelectTable = (tableId: string, status: string) => {
    if (status !== "available") {
      alert("This table is not available.");
      return;
    }
    // Redirige a la vista de pedido con la mesa seleccionada
    router.push(`/views/clients/OrderView?tableId=${tableId}`);
  };

  const getButtonColor = (status: string) => {
    switch (status) {
      case "available":
        return "green";
      case "occupied":
        return "red";
      case "reserved":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <div className="app-main text-center">
      <h2>Select Your Table</h2>
      <div className="tables-grid">
        {tables.map((table) => (
          <button
            key={table.id}
            style={{ backgroundColor: getButtonColor(table.status) }}
            onClick={() => handleSelectTable(table.id, table.status)}
          >
            Table {table.number}
          </button>
        ))}
      </div>
    </div>
  );
}
