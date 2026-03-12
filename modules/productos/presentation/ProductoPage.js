"use client";

import { useEffect, useState } from "react";
import {
  listarProductos,
  registrarProducto,
  editarProducto,
  borrarProducto,
} from "../application/productoService";

export default function ProductoPage() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
  });

  // Cargar productos al inicio
  useEffect(() => {
    async function fetchData() {
      const data = await listarProductos();
      setProductos(data || []);
    }
    fetchData();
  }, []);

  // Agregar producto
  const handleAgregarProducto = async () => {
    await registrarProducto({
      ...nuevoProducto,
      precio: parseFloat(nuevoProducto.precio),
    });
    const data = await listarProductos();
    setProductos(data || []);
    setNuevoProducto({ nombre: "", descripcion: "", precio: "", categoria: "" });
  };

  // Editar producto (ejemplo: cambiar precio)
  const handleEditarProducto = async (id, nuevoPrecio) => {
    await editarProducto(id, { precio: nuevoPrecio });
    const data = await listarProductos();
    setProductos(data || []);
  };

  // Eliminar producto
  const handleEliminarProducto = async (id) => {
    await borrarProducto(id);
    const data = await listarProductos();
    setProductos(data || []);
  };

  return (
    <div className="productos-container">
      <h1>Gestión de Productos</h1>

      {/* Formulario para agregar producto */}
      <div className="form-producto">

      <input
  type="text"
  placeholder="URL de imagen"
  value={nuevoProducto.image_url || ""}
  onChange={(e) =>
    setNuevoProducto({ ...nuevoProducto, image_url: e.target.value })
  }
/>


        <input
          type="text"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoProducto.descripcion}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Categoría"
          value={nuevoProducto.categoria}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
          }
        />
        <button onClick={handleAgregarProducto}>Agregar Producto</button>
      </div>

      {/* Lista de productos */}
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} - {p.descripcion} - ${p.precio} - {p.categoria}
            <button onClick={() => handleEditarProducto(p.id, p.precio + 5)}>
              Aumentar Precio
            </button>
            <button onClick={() => handleEliminarProducto(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
