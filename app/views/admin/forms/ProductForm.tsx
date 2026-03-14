"use client";

import { useState } from "react";

type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export default function ProductForm({ onCancel }: { onCancel: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "drink",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...formData, id: editingId } : p
        )
      );
      setEditingId(null);
    } else {
      const newProduct = { ...formData, id: Date.now().toString() };
      setProducts((prev) => [...prev, newProduct]);
    }
    setFormData({ name: "", description: "", price: 0, category: "drink" });
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id || null);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="crud-form">
      <h3>Manage Products</h3>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="drink">Drink</option>
          <option value="food">Food</option>
          <option value="dessert">Dessert</option>
        </select>

        <div className="form-actions">
          <button type="submit">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          <button type="button" onClick={onCancel}>
            Close
          </button>
        </div>
      </form>

      <h4>Existing Products</h4>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} (${Number(product.price).toFixed(2)}) -{" "}
              {product.category}
              <div className="form-actions">
                <button type="button" onClick={() => handleEdit(product)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id!)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
