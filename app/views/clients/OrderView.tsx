"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Datos de ejemplo (luego se reemplazarán con Supabase)
const initialProducts = [
  { id: "p1", name: "Coffee", description: "Hot black coffee", price: 2.5, category: "drink" },
  { id: "p2", name: "Sandwich", description: "Ham and cheese sandwich", price: 5.0, category: "food" },
  { id: "p3", name: "Cake", description: "Chocolate cake slice", price: 3.0, category: "dessert" },
];

export default function OrderView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("tableId"); // mesa seleccionada

  const [products] = useState(initialProducts);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const goToCart = () => {
    // Redirige a CartView con datos de carrito y mesa
    router.push(`/views/clients/CartView?tableId=${tableId}`);
  };

  return (
    <div className="app-main">
      <h2>Customize Your Order</h2>
      {tableId && <p>Selected Table: {tableId}</p>}

      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price.toFixed(2)}</strong></p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Current Cart</h3>
        {cart.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
        <button onClick={goToCart} disabled={cart.length === 0}>
          Go to Cart
        </button>
      </div>
    </div>
  );
}
