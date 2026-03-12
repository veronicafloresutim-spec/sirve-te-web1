// Servicio de Usuarios (Application Layer)
// Contiene la lógica de negocio y usa el repositorio para interactuar con Supabase

import { Usuario } from "../domain/usuario";
import {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorEmail,
  actualizarUsuario,
  eliminarUsuario,
} from "../infraestructure/usuarioRepository";

// Registrar un nuevo usuario
export async function registrarUsuario(datos) {
  try {
    const usuario = new Usuario(datos);
    usuario.validar();
    return await crearUsuario({
      nombre: usuario.nombre,
      rol: usuario.rol,
      email: usuario.email,
      password: usuario.password,
    });
  } catch (error) {
    console.error("Error en registrarUsuario:", error.message);
    return null;
  }
}

// Listar todos los usuarios
export async function listarUsuarios() {
  return await obtenerUsuarios();
}

// Editar usuario existente
export async function editarUsuario(id, campos) {
  return await actualizarUsuario(id, campos);
}

// Borrar usuario
export async function borrarUsuario(id) {
  return await eliminarUsuario(id);
}

// Login de usuario
export async function loginUsuario(email, password) {
  const usuario = await obtenerUsuarioPorEmail(email);
  if (!usuario) {
    return { error: "Usuario no encontrado" };
  }
  if (usuario.password !== password) {
    return { error: "Contraseña incorrecta" };
  }
  return { usuario };
}
