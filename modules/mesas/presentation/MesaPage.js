"use client";

import { useEffect, useState } from "react";
import {
  listarMesas,
  registrarMesa,
  editarMesa,
  borrarMesa,
} from "../application/mesaService";

export default function MesaPage() {
  const [mesas, setMesas] = useState([]);
  const [nuevaMesa, setNuevaMesa] = useState({
    numero: "",
    capacidad: "",
    estado: "disponible",
  });

  // Cargar mesas al inicio
  useEffect(() => {
    async function fetchData() {
      const data = await listarMesas();
      setMesas(data || []);
    }
    fetchData();
  }, []);

  // Agregar mesa
  const handleAgregarMesa = async () => {
    await registrarMesa({
      ...nuevaMesa,
      numero: parseInt(nuevaMesa.numero),
      capacidad: parseInt(nuevaMesa.capacidad),
    });
    const data = await listarMesas();
    setMesas(data || []);
    setNuevaMesa({ numero: "", capacidad: "", estado: "disponible" });
  };

  // Editar mesa (ejemplo: cambiar estado)
  const handleEditarMesa = async (id, nuevoEstado) => {
    await editarMesa(id, { estado: nuevoEstado });
    const data = await listarMesas();
    setMesas(data || []);
  };

  // Eliminar mesa
  const handleEliminarMesa = async (id) => {
    await borrarMesa(id);
    const data = await listarMesas();
    setMesas(data || []);
  };

  return (
    <div className="mesas-container">
      <h1>Gestión de Mesas</h1>

      {/* Formulario para agregar mesa */}
      <div className="form-mesa">
        <input
          type="number"
          placeholder="Número de mesa"
          value={nuevaMesa.numero}
          onChange={(e) =>
            setNuevaMesa({ ...nuevaMesa, numero: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Capacidad"
          value={nuevaMesa.capacidad}
          onChange={(e) =>
            setNuevaMesa({ ...nuevaMesa, capacidad: e.target.value })
          }
        />
        <select
          value={nuevaMesa.estado}
          onChange={(e) =>
            setNuevaMesa({ ...nuevaMesa, estado: e.target.value })
          }
        >
          <option value="disponible">Disponible</option>
          <option value="ocupada">Ocupada</option>
          <option value="reservada">Reservada</option>
        </select>
        <button onClick={handleAgregarMesa}>Agregar Mesa</button>
      </div>

      {/* Lista de mesas */}
      <ul>
        {mesas.map((m) => (
          <li key={m.id}>
            Mesa {m.numero} - Capacidad: {m.capacidad} - Estado: {m.estado}
            <button onClick={() => handleEditarMesa(m.id, "ocupada")}>
              Marcar Ocupada
            </button>
            <button onClick={() => handleEliminarMesa(m.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
