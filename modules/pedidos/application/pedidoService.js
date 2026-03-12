// Servicio de Pedidos (Application Layer)
// Contiene la lógica de negocio y usa el repositorio para interactuar con Supabase

import { Pedido } from "../domain/pedido";
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarPedido,
  eliminarPedido,
} from "../infraestructure/pedidoRepository";

// Registrar un nuevo pedido
export async function registrarPedido(datos) {
  try {
    const pedido = new Pedido(datos);
    pedido.validar();
    return await crearPedido({
      mesaId: pedido.mesaId,
      usuarioId: pedido.usuarioId,
      fecha: pedido.fecha,
      estado: pedido.estado,
      total: pedido.total,
    });
  } catch (error) {
    console.error("Error en registrarPedido:", error.message);
    return null;
  }
}

// Listar todos los pedidos
export async function listarPedidos() {
  return await obtenerPedidos();
}

// Obtener pedido por ID
export async function obtenerPedido(id) {
  return await obtenerPedidoPorId(id);
}

// Editar pedido existente
export async function editarPedido(id, campos) {
  return await actualizarPedido(id, campos);
}

// Borrar pedido
export async function borrarPedido(id) {
  return await eliminarPedido(id);
}
