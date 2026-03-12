"use client";

import { useEffect, useState } from "react";
import { listarMesas, actualizarMesa } from "../../modules/mesas/application/mesaService";
import { listarPedidos, actualizarPedido } from "../../modules/pedidos/application/pedidoService";

export default function MeserosPage() {
  const [mesas, setMesas] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  // Cargar mesas y pedidos al inicio
  useEffect(() => {
    async function fetchData() {
      const mesasData = await listarMesas();
      setMesas(mesasData || []);
      const pedidosData = await listarPedidos();
      setPedidos(pedidosData || []);
    }
    fetchData();
  }, []);

  // Cambiar estado de mesa
  const handleCambiarEstadoMesa = async (id, nuevoEstado) => {
    await actualizarMesa(id, { estado: nuevoEstado });
    const mesasData = await listarMesas();
    setMesas(mesasData || []);
  };

  // Cambiar estado de pedido
  const handleCambiarEstadoPedido = async (id, nuevoEstado) => {
    await actualizarPedido(id, { estado: nuevoEstado });
    const pedidosData = await listarPedidos();
    setPedidos(pedidosData || []);
  };

  return (
    <div className="meseros-container">
      <h1>Panel de Mesero</h1>

      {/* Sección Mesas */}
      <section>
        <h2>Mesas</h2>
        <ul>
          {mesas.map((m) => (
            <li key={m.id}>
              Mesa {m.numero} - Estado: {m.estado}
              <button onClick={() => handleCambiarEstadoMesa(m.id, "libre")}>Libre</button>
              <button onClick={() => handleCambiarEstadoMesa(m.id, "ocupada")}>Ocupada</button>
              <button onClick={() => handleCambiarEstadoMesa(m.id, "atendida")}>Atendida</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Sección Pedidos */}
      <section>
        <h2>Pedidos</h2>
        <ul>
          {pedidos.map((p) => (
            <li key={p.id}>
              Pedido {p.id} - Mesa: {p.mesa_id} - Estado: {p.estado}
              <button onClick={() => handleCambiarEstadoPedido(p.id, "pendiente")}>Pendiente</button>
              <button onClick={() => handleCambiarEstadoPedido(p.id, "en preparación")}>En preparación</button>
              <button onClick={() => handleCambiarEstadoPedido(p.id, "entregado")}>Entregado</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
