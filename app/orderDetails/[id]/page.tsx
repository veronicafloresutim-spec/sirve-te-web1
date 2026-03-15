"use client";

import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const { id } = params; // aquí obtienes el valor dinámico de la URL

  return (
    <div className="order-detail">
      <h1>Order Detail</h1>
      <p>Showing order with ID: {id}</p>
    </div>
  );
}
