// Servicio de Productos (Application Layer)
// Contiene la lógica de negocio y usa el repositorio para interactuar con Supabase

import { Producto } from "../domain/producto";
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from "../infrastructure/productoRepository";

// Registrar un nuevo producto
export async function registrarProducto(datos) {
  try {
    const producto = new Producto(datos);
    producto.validar();
    return await crearProducto({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      image_url: datos.image_url || "https://mi-bucket.supabase.co/storage/v1/object/public/productos/default.png"
    });
  } catch (error) {
    console.error("Error en registrarProducto:", error.message);
    return null;
  }
}

// Listar todos los productos
export async function listarProductos() {
  return await obtenerProductos();
}

// Obtener producto por ID
export async function obtenerProducto(id) {
  return await obtenerProductoPorId(id);
}

// Editar producto existente
export async function editarProducto(id, campos) {
  return await actualizarProducto(id, campos);
}

// Borrar producto
export async function borrarProducto(id) {
  return await eliminarProducto(id);
}
