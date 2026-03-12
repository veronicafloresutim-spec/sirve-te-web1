"use client";

import { useEffect, useState } from "react";
import {
  listarPedidos,
  registrarPedido,
  editarPedido,
  borrarPedido,
} from "../application/pedidoService";

export default function PedidoPage() {
  const [pedidos, setPedidos] = useState([]);
  const [nuevoPedido, setNuevoPedido] = useState({
    mesaId: "",
    usuarioId: "",
    fecha: new Date().toISOString(),
    estado: "pendiente",
    total: 0,
  });

  // Cargar pedidos al inicio
  useEffect(() => {
    async function fetchData() {
      const data = await listarPedidos();
      setPedidos(data || []);
    }
    fetchData();
  }, []);

  // Agregar pedido
  const handleAgregarPedido = async () => {
    await registrarPedido({
      ...nuevoPedido,
      total: parseFloat(nuevoPedido.total),
    });
    const data = await listarPedidos();
    setPedidos(data || []);
    setNuevoPedido({
      mesaId: "",
      usuarioId: "",
      fecha: new Date().toISOString(),
      estado: "pendiente",
      total: 0,
    });
  };

  // Editar pedido (ejemplo: cambiar estado)
  const handleEditarPedido = async (id, nuevoEstado) => {
    await editarPedido(id, { estado: nuevoEstado });
    const data = await listarPedidos();
    setPedidos(data || []);
  };

  // Eliminar pedido
  const handleEliminarPedido = async (id) => {
    await borrarPedido(id);
    const data = await listarPedidos();
    setPedidos(data || []);
  };

  return (
    <div className="pedidos-container">
      <h1>Gestión de Pedidos</h1>

      {/* Formulario para agregar pedido */}
      <div className="form-pedido">
        <input
          type="text"
          placeholder="ID de Mesa"
          value={nuevoPedido.mesaId}
          onChange={(e) =>
            setNuevoPedido({ ...nuevoPedido, mesaId: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="ID de Usuario"
          value={nuevoPedido.usuarioId}
          onChange={(e) =>
            setNuevoPedido({ ...nuevoPedido, usuarioId: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Total"
          value={nuevoPedido.total}
          onChange={(e) =>
            setNuevoPedido({ ...nuevoPedido, total: e.target.value })
          }
        />
        <select
          value={nuevoPedido.estado}
          onChange={(e) =>
            setNuevoPedido({ ...nuevoPedido, estado: e.target.value })
          }
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="servido">Servido</option>
          <option value="pagado">Pagado</option>
        </select>
        <button onClick={handleAgregarPedido}>Agregar Pedido</button>
      </div>

      {/* Lista de pedidos */}
      <ul>
        {pedidos.map((p) => (
          <li key={p.id}>
            Pedido #{p.id} - Mesa: {p.mesaId} - Usuario: {p.usuarioId} - Estado:{" "}
            {p.estado} - Total: ${p.total}
            <button onClick={() => handleEditarPedido(p.id, "en_proceso")}>
              Marcar En Proceso
            </button>
            <button onClick={() => handleEliminarPedido(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
