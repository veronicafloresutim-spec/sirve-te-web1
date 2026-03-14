"use client";

import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export default function ProductSelectionForm({
  products,
  onAddToCart,
  onCancel,
}: {
  products: Product[];
  onAddToCart: (selected: { id: string; name: string; price: number; quantity: number }) => void;
  onCancel: () => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }
    onAddToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="crud-form">
      <h3>Select a Product</h3>

      <label htmlFor="product">Product:</label>
      <select
        id="product"
        value={selectedProduct?.id || ""}
        onChange={(e) => {
          const product = products.find((p) => p.id === e.target.value) || null;
          setSelectedProduct(product);
        }}
      >
        <option value="">-- Choose a product --</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} (${product.price.toFixed(2)})
          </option>
        ))}
      </select>

      {selectedProduct && (
        <>
          <p>{selectedProduct.description}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </>
      )}

      <div className="form-actions">
        <button type="submit">Add to Cart</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
