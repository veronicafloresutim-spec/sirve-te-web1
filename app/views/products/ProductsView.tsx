"use client";

import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export default function ProductsView() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // TODO: Integrar con Supabase para obtener productos reales
    const demoProducts: Product[] = [
      { id: "1", name: "Espresso", description: "Strong coffee shot", price: 2.5, category: "drink" },
      { id: "2", name: "Latte", description: "Coffee with milk", price: 3.0, category: "drink" },
      { id: "3", name: "Sandwich", description: "Ham and cheese sandwich", price: 4.5, category: "food" },
      { id: "4", name: "Cheesecake", description: "Slice of cheesecake", price: 3.5, category: "dessert" },
    ];
    setProducts(demoProducts);
  }, []);

  return (
    <div className="app-main text-center">
      <h2>Products Catalog</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>${product.price.toFixed(2)}</strong>
              </p>
              <span className="category-tag">{product.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
