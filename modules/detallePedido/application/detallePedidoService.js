// Servicio de DetallePedido (Application Layer)
// Contiene la lógica de negocio y usa el repositorio para interactuar con Supabase

import { DetallePedido } from "../domain/detallePedido";
import {
  crearDetallePedido,
  obtenerDetallesPedido,
  obtenerDetallePedidoPorId,
  obtenerDetallesPorPedido,
  actualizarDetallePedido,
  eliminarDetallePedido,
} from "../infraestructure/detallePedidoRepository";

// Registrar un nuevo detalle de pedido
export async function registrarDetallePedido(datos) {
  try {
    const detalle = new DetallePedido(datos);
    detalle.validar();
    return await crearDetallePedido({
      pedidoId: detalle.pedidoId,
      productoId: detalle.productoId,
      cantidad: detalle.cantidad,
      precioUnitario: detalle.precioUnitario,
    });
  } catch (error) {
    console.error("Error en registrarDetallePedido:", error.message);
    return null;
  }
}

// Listar todos los detalles de pedido
export async function listarDetallesPedido() {
  return await obtenerDetallesPedido();
}

// Obtener detalle por ID
export async function obtenerDetallePedido(id) {
  return await obtenerDetallePedidoPorId(id);
}

// Obtener detalles por pedidoId
export async function listarDetallesPorPedido(pedidoId) {
  return await obtenerDetallesPorPedido(pedidoId);
}

// Editar detalle de pedido existente
export async function editarDetallePedido(id, campos) {
  return await actualizarDetallePedido(id, campos);
}

// Borrar detalle de pedido
export async function borrarDetallePedido(id) {
  return await eliminarDetallePedido(id);
}
