// Repositorio de Usuarios (Infrastructure Layer)
// Encargado de interactuar directamente con Supabase

import { supabase } from "../../../lib/supabaseClient";

export async function crearUsuario(usuario) {
  const { data, error } = await supabase
    .from("Usuarios")
    .insert([usuario]);

  if (error) {
    console.error("Error al crear usuario:", error.message);
    return null;
  }
  return data[0];
}

export async function obtenerUsuarios() {
  const { data, error } = await supabase
    .from("Usuarios")
    .select("*");

  if (error) {
    console.error("Error al obtener usuarios:", error.message);
    return [];
  }
  return data;
}

export async function obtenerUsuarioPorEmail(email) {
  const { data, error } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("Error al obtener usuario por email:", error.message);
    return null;
  }
  return data;
}

export async function actualizarUsuario(id, campos) {
  const { data, error } = await supabase
    .from("Usuarios")
    .update(campos)
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar usuario:", error.message);
    return null;
  }
  return data[0];
}

export async function eliminarUsuario(id) {
  const { error } = await supabase
    .from("Usuarios")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar usuario:", error.message);
    return false;
  }
  return true;
}
