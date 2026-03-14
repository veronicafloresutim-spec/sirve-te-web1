"use client";

export default function FreeTableForm({
  tableId,
  onConfirm,
  onCancel,
}: {
  tableId: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrar con Supabase (actualizar estado de mesa a "available")
    alert(`Table ${tableId} has been freed.`);
    onConfirm();
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Free Table {tableId}</h3>
      <p>Are you sure you want to free this table?</p>

      <div className="form-actions">
        <button type="submit">Yes, Free Table</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
