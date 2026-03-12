// Repositorio de DetallePedido (Infrastructure Layer)
// Encargado de interactuar directamente con Supabase

import { supabase } from "../../../lib/supabaseClient";

// Crear detalle de pedido
export async function crearDetallePedido(detalle) {
  const { data, error } = await supabase
    .from("DetallePedido")
    .insert([detalle]);

  if (error) {
    console.error("Error al crear detalle de pedido:", error.message);
    return null;
  }
  return data[0];
}

// Obtener todos los detalles de pedido
export async function obtenerDetallesPedido() {
  const { data, error } = await supabase
    .from("DetallePedido")
    .select("*");

  if (error) {
    console.error("Error al obtener detalles de pedido:", error.message);
    return [];
  }
  return data;
}

// Obtener detalle por ID
export async function obtenerDetallePedidoPorId(id) {
  const { data, error } = await supabase
    .from("DetallePedido")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error al obtener detalle de pedido por ID:", error.message);
    return null;
  }
  return data;
}

// Obtener detalles por pedidoId
export async function obtenerDetallesPorPedido(pedidoId) {
  const { data, error } = await supabase
    .from("DetallePedido")
    .select("*")
    .eq("pedidoId", pedidoId);

  if (error) {
    console.error("Error al obtener detalles por pedidoId:", error.message);
    return [];
  }
  return data;
}

// Actualizar detalle de pedido
export async function actualizarDetallePedido(id, campos) {
  const { data, error } = await supabase
    .from("DetallePedido")
    .update(campos)
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar detalle de pedido:", error.message);
    return null;
  }
  return data[0];
}

// Eliminar detalle de pedido
export async function eliminarDetallePedido(id) {
  const { error } = await supabase
    .from("DetallePedido")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar detalle de pedido:", error.message);
    return false;
  }
  return true;
}
