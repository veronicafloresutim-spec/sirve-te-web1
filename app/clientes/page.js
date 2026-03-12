"use client";

import { useEffect, useState } from "react";
import { listarMesas, actualizarMesa } from "../../modules/mesas/application/mesaService";
import { listarProductos } from "../../modules/productos/application/productoService";

export default function ClientesPage() {
  const [mesas, setMesas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  // Cargar mesas y productos al inicio
  useEffect(() => {
    async function fetchData() {
      const mesasData = await listarMesas();
      setMesas(mesasData || []);
      const productosData = await listarProductos();
      setProductos(productosData || []);
    }
    fetchData();
  }, []);

  // Seleccionar mesa
  const handleSeleccionMesa = async (mesa) => {
    setMesaSeleccionada(mesa);
    // Cambiar estado de la mesa a "ocupada"
    await actualizarMesa(mesa.id, { estado: "ocupada" });
    alert(`Has seleccionado la mesa ${mesa.numero}`);
  };

  return (
    <div className="clientes-container">
      <h1>Bienvenido Cliente</h1>

      {!mesaSeleccionada ? (
        <section>
          <h2>Selecciona una mesa</h2>
          <ul>
            {mesas.map((m) => (
              <li key={m.id}>
                Mesa {m.numero} - Estado: {m.estado}
                {m.estado === "libre" && (
                  <button onClick={() => handleSeleccionMesa(m)}>Ocupar</button>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Catálogo de Productos</h2>
          <ul>
            {productos.map((p) => (
              <li key={p.id}>
                <strong>{p.nombre}</strong> - ${p.precio} <br />
                {p.descripcion}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
