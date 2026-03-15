"use client";

import { useRouter } from "next/navigation";

export default function FreeTableForm() {
  const router = useRouter();

  // Mesa simulada (puedes reemplazar con datos dinámicos o Supabase)
  const tableId: string = "Mesa 12";

  const handleConfirm = () => {
    alert(`Table ${tableId} has been freed.`);
    // Aquí podrías actualizar Supabase para marcar la mesa como "available"
    router.push("/waiters");
  };

  const handleCancel = () => {
    router.push("/waiters");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirm();
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Free Table {tableId}</h3>
      <p>Are you sure you want to free this table?</p>

      <div className="form-actions">
        <button type="submit">Yes, Free Table</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}
