"use client";

import { useEffect, useState } from "react";
import {
  listarUsuarios,
  registrarUsuario,
  editarUsuario,
  borrarUsuario,
} from "../application/usuarioService";

export default function UsuarioPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    rol: "cliente",
    email: "",
    password: "",
  });

  // Cargar usuarios al inicio
  useEffect(() => {
    async function fetchData() {
      const data = await listarUsuarios();
      setUsuarios(data || []);
    }
    fetchData();
  }, []);

  // Agregar usuario
  const handleAgregarUsuario = async () => {
    await registrarUsuario(nuevoUsuario);
    const data = await listarUsuarios();
    setUsuarios(data || []);
    setNuevoUsuario({ nombre: "", rol: "cliente", email: "", password: "" });
  };

  // Editar usuario (ejemplo: cambiar rol)
  const handleEditarUsuario = async (id, nuevoRol) => {
    await editarUsuario(id, { rol: nuevoRol });
    const data = await listarUsuarios();
    setUsuarios(data || []);
  };

  // Eliminar usuario
  const handleEliminarUsuario = async (id) => {
    await borrarUsuario(id);
    const data = await listarUsuarios();
    setUsuarios(data || []);
  };

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>

      {/* Formulario para agregar usuario */}
      <div className="form-usuario">
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoUsuario.nombre}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
          }
        />
        <select
          value={nuevoUsuario.rol}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })
          }
        >
          <option value="cliente">Cliente</option>
          <option value="mesero">Mesero</option>
          <option value="admin">Administrador</option>
        </select>
        <input
          type="email"
          placeholder="Correo"
          value={nuevoUsuario.email}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={nuevoUsuario.password}
          onChange={(e) =>
            setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
          }
        />
        <button onClick={handleAgregarUsuario}>Agregar Usuario</button>
      </div>

      {/* Lista de usuarios */}
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nombre} - {u.rol} - {u.email}
            <button onClick={() => handleEditarUsuario(u.id, "admin")}>
              Hacer Admin
            </button>
            <button onClick={() => handleEliminarUsuario(u.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
