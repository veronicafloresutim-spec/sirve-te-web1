// Repositorio de Productos (Infrastructure Layer)
// Encargado de interactuar directamente con Supabase

import { supabase } from "../../../lib/supabaseClient";

// Crear producto
export async function crearProducto(producto) {
  const { data, error } = await supabase
    .from("productos")
    .insert([producto]);

  if (error) {
    console.error("Error al crear producto:", error.message);
    return null;
  }
  return data[0];
}

// Obtener todos los productos
export async function obtenerProductos() {
  const { data, error } = await supabase
    .from("productos")
    .select("*");

  if (error) {
    console.error("Error al obtener productos:", error.message);
    return [];
  }
  return data;
}

// Obtener producto por ID
export async function obtenerProductoPorId(id) {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener producto por ID:", error.message);
    return null;
  }
  return data;
}

// Actualizar producto
export async function actualizarProducto(id, campos) {
  const { data, error } = await supabase
    .from("productos")
    .update(campos)
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar producto:", error.message);
    return null;
  }
  return data[0];
}

// Eliminar producto
export async function eliminarProducto(id) {
  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar producto:", error.message);
    return false;
  }
  return true;
}
