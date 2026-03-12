"use client";

import { useEffect, useState } from "react";
import { listarUsuarios, registrarUsuario, editarUsuario, borrarUsuario } from "../../modules/usuarios/application/usuarioService";
import { listarProductos, registrarProducto, editarProducto, borrarProducto } from "../../modules/productos/application/productoService";

export default function AdminPage() {
  // Estados para usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", rol: "", email: "", password: "" });

  // Estados para productos
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", descripcion: "", precio: "", categoria: "" });

  // Cargar datos al inicio
  useEffect(() => {
    async function fetchData() {
      const usuariosData = await listarUsuarios();
      setUsuarios(usuariosData || []);
      const productosData = await listarProductos();
      setProductos(productosData || []);
    }
    fetchData();
  }, []);

  // Handlers Usuarios
  const handleAgregarUsuario = async () => {
    await registrarUsuario(nuevoUsuario);
    const usuariosData = await listarUsuarios();
    setUsuarios(usuariosData || []);
    setNuevoUsuario({ nombre: "", rol: "", email: "", password: "" });
  };

  const handleEliminarUsuario = async (id) => {
    await borrarUsuario(id);
    const usuariosData = await listarUsuarios();
    setUsuarios(usuariosData || []);
  };

  // Handlers Productos
  const handleAgregarProducto = async () => {
    await registrarProducto(nuevoProducto);
    const productosData = await listarProductos();
    setProductos(productosData || []);
    setNuevoProducto({ nombre: "", descripcion: "", precio: "", categoria: "" });
  };

  const handleEliminarProducto = async (id) => {
    await borrarProducto(id);
    const productosData = await listarProductos();
    setProductos(productosData || []);
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administrador</h1>

      {/* CRUD Usuarios */}
      <section>
        <h2>Usuarios</h2>
        <div>
          <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
          <input type="text" placeholder="Rol (admin/mesero/cliente)" value={nuevoUsuario.rol} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })} />
          <input type="email" placeholder="Email" value={nuevoUsuario.email} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })} />
          <input type="password" placeholder="Password" value={nuevoUsuario.password} onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })} />
          <button onClick={handleAgregarUsuario}>Agregar Usuario</button>
        </div>
        <ul>
          {usuarios.map((u) => (
            <li key={u.id}>
              {u.nombre} - {u.rol} - {u.email}
              <button onClick={() => handleEliminarUsuario(u.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>

      {/* CRUD Productos */}
      <section>
        <h2>Productos</h2>
        <div>
          <input type="text" placeholder="Nombre" value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
          <input type="text" placeholder="Descripción" value={nuevoProducto.descripcion} onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })} />
          <input type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} />
          <input type="text" placeholder="Categoría" value={nuevoProducto.categoria} onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })} />
          <button onClick={handleAgregarProducto}>Agregar Producto</button>
        </div>
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              {p.nombre} - ${p.precio} - {p.categoria}
              <button onClick={() => handleEliminarProducto(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
