// Repositorio de Mesas (Infrastructure Layer)
// Encargado de interactuar directamente con Supabase

import { supabase } from "../../../lib/supabaseClient";

// Crear mesa
export async function crearMesa(mesa) {
  const { data, error } = await supabase
    .from("Mesas")
    .insert([mesa]);

  if (error) {
    console.error("Error al crear mesa:", error.message);
    return null;
  }
  return data[0];
}

// Obtener todas las mesas
export async function obtenerMesas() {
  const { data, error } = await supabase
    .from("Mesas")
    .select("*");

  if (error) {
    console.error("Error al obtener mesas:", error.message);
    return [];
  }
  return data;
}

// Obtener mesa por ID
export async function obtenerMesaPorId(id) {
  const { data, error } = await supabase
    .from("Mesas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener mesa por ID:", error.message);
    return null;
  }
  return data;
}

// Actualizar mesa
export async function actualizarMesa(id, campos) {
  const { data, error } = await supabase
    .from("Mesas")
    .update(campos)
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar mesa:", error.message);
    return null;
  }
  return data[0];
}

// Eliminar mesa
export async function eliminarMesa(id) {
  const { error } = await supabase
    .from("Mesas")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar mesa:", error.message);
    return false;
  }
  return true;
}
