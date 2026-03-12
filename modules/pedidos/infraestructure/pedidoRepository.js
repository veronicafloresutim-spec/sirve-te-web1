// Repositorio de Pedidos (Infrastructure Layer)
// Encargado de interactuar directamente con Supabase

import { supabase } from "../../../lib/supabaseClient";

// Crear pedido
export async function crearPedido(pedido) {
  const { data, error } = await supabase
    .from("Pedidos")
    .insert([pedido]);

  if (error) {
    console.error("Error al crear pedido:", error.message);
    return null;
  }
  return data[0];
}

// Obtener todos los pedidos
export async function obtenerPedidos() {
  const { data, error } = await supabase
    .from("Pedidos")
    .select("*");

  if (error) {
    console.error("Error al obtener pedidos:", error.message);
    return [];
  }
  return data;
}

// Obtener pedido por ID
export async function obtenerPedidoPorId(id) {
  const { data, error } = await supabase
    .from("Pedidos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener pedido por ID:", error.message);
    return null;
  }
  return data;
}

// Actualizar pedido
export async function actualizarPedido(id, campos) {
  const { data, error } = await supabase
    .from("Pedidos")
    .update(campos)
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar pedido:", error.message);
    return null;
  }
  return data[0];
}

// Eliminar pedido
export async function eliminarPedido(id) {
  const { error } = await supabase
    .from("Pedidos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar pedido:", error.message);
    return false;
  }
  return true;
}
