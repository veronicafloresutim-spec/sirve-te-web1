"use client";

import { useEffect, useState } from "react";
import {
  listarDetallesPedido,
  registrarDetallePedido,
  editarDetallePedido,
  borrarDetallePedido,
  listarDetallesPorPedido,
} from "../application/detallePedidoService";

export default function DetallePedidoPage() {
  const [detalles, setDetalles] = useState([]);
  const [nuevoDetalle, setNuevoDetalle] = useState({
    pedidoId: "",
    productoId: "",
    cantidad: 1,
    precioUnitario: 0,
  });

  // Cargar detalles al inicio
  useEffect(() => {
    async function fetchData() {
      const data = await listarDetallesPedido();
      setDetalles(data || []);
    }
    fetchData();
  }, []);

  // Agregar detalle
  const handleAgregarDetalle = async () => {
    await registrarDetallePedido({
      ...nuevoDetalle,
      cantidad: parseInt(nuevoDetalle.cantidad),
      precioUnitario: parseFloat(nuevoDetalle.precioUnitario),
    });
    const data = await listarDetallesPedido();
    setDetalles(data || []);
    setNuevoDetalle({ pedidoId: "", productoId: "", cantidad: 1, precioUnitario: 0 });
  };

  // Editar detalle (ejemplo: cambiar cantidad)
  const handleEditarDetalle = async (id, nuevaCantidad) => {
    await editarDetallePedido(id, { cantidad: nuevaCantidad });
    const data = await listarDetallesPedido();
    setDetalles(data || []);
  };

  // Eliminar detalle
  const handleEliminarDetalle = async (id) => {
    await borrarDetallePedido(id);
    const data = await listarDetallesPedido();
    setDetalles(data || []);
  };

  // Filtrar detalles por pedidoId
  const handleFiltrarPorPedido = async (pedidoId) => {
    const data = await listarDetallesPorPedido(pedidoId);
    setDetalles(data || []);
  };

  return (
    <div className="detalles-container">
      <h1>Gestión de Detalles de Pedido</h1>

      {/* Formulario para agregar detalle */}
      <div className="form-detalle">
        <input
          type="text"
          placeholder="ID de Pedido"
          value={nuevoDetalle.pedidoId}
          onChange={(e) =>
            setNuevoDetalle({ ...nuevoDetalle, pedidoId: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="ID de Producto"
          value={nuevoDetalle.productoId}
          onChange={(e) =>
            setNuevoDetalle({ ...nuevoDetalle, productoId: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={nuevoDetalle.cantidad}
          onChange={(e) =>
            setNuevoDetalle({ ...nuevoDetalle, cantidad: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio Unitario"
          value={nuevoDetalle.precioUnitario}
          onChange={(e) =>
            setNuevoDetalle({ ...nuevoDetalle, precioUnitario: e.target.value })
          }
        />
        <button onClick={handleAgregarDetalle}>Agregar Detalle</button>
      </div>

      {/* Filtro por pedido */}
      <div className="filtro-pedido">
        <input
          type="text"
          placeholder="Filtrar por Pedido ID"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFiltrarPorPedido(e.target.value);
            }
          }}
        />
      </div>

      {/* Lista de detalles */}
      <ul>
        {detalles.map((d) => (
          <li key={d.id}>
            Pedido: {d.pedidoId} - Producto: {d.productoId} - Cantidad: {d.cantidad} - Precio Unitario: ${d.precioUnitario} - Subtotal: ${d.cantidad * d.precioUnitario}
            <button onClick={() => handleEditarDetalle(d.id, d.cantidad + 1)}>
              Aumentar Cantidad
            </button>
            <button onClick={() => handleEliminarDetalle(d.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
