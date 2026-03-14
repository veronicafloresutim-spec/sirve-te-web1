"use client";

import { useState } from "react";
import ChargeForm from "./forms/ChargeForm";
import FreeTableForm from "./forms/FreeTableForm";

// Datos de ejemplo (luego se reemplazarán con Supabase)
const initialTables = [
  { id: "1", number: 1, status: "occupied" },
  { id: "2", number: 2, status: "available" },
  { id: "3", number: 3, status: "occupied" },
  { id: "4", number: 4, status: "reserved" },
];

export default function WaiterDashboardView() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [action, setAction] = useState<"charge" | "free" | null>(null);

  const handleCharge = (tableId: string) => {
    setSelectedTable(tableId);
    setAction("charge");
  };

  const handleFree = (tableId: string) => {
    setSelectedTable(tableId);
    setAction("free");
  };

  const confirmCharge = () => {
    alert(`Charge confirmed for Table ${selectedTable}`);
    setAction(null);
    setSelectedTable(null);
    // TODO: Integrar con Supabase (registrar venta en tabla sales)
  };

  const confirmFree = () => {
    alert(`Table ${selectedTable} is now free`);
    setTables((prev) =>
      prev.map((t) =>
        t.id === selectedTable ? { ...t, status: "available" } : t
      )
    );
    setAction(null);
    setSelectedTable(null);
    // TODO: Integrar con Supabase (actualizar estado de mesa)
  };

  return (
    <div className="app-main text-center">
      <h2>Waiter Dashboard</h2>
      <p>Select a table to charge or free.</p>

      <div className="tables-grid">
        {tables.map((table) => (
          <div key={table.id}>
            <button
              style={{
                backgroundColor:
                  table.status === "available"
                    ? "green"
                    : table.status === "occupied"
                    ? "red"
                    : "orange",
              }}
              onClick={() =>
                table.status === "occupied"
                  ? handleCharge(table.id)
                  : handleFree(table.id)
              }
            >
              Table {table.number} ({table.status})
            </button>
          </div>
        ))}
      </div>

      {/* Renderizar formularios según acción */}
      {action === "charge" && selectedTable && (
        <ChargeForm
          tableId={selectedTable}
          onConfirm={confirmCharge}
          onCancel={() => setAction(null)}
        />
      )}

      {action === "free" && selectedTable && (
        <FreeTableForm
          tableId={selectedTable}
          onConfirm={confirmFree}
          onCancel={() => setAction(null)}
        />
      )}
    </div>
  );
}
