// Servicio de Mesas (Application Layer)
// Contiene la lógica de negocio y usa el repositorio para interactuar con Supabase

import { Mesa } from "../domain/mesa";
import {
  crearMesa,
  obtenerMesas,
  obtenerMesaPorId,
  actualizarMesa,
  eliminarMesa,
} from "../infraestructure/mesaRepository";
import {
  crearMesa,
  obtenerMesas,
  obtenerMesaPorId,
  actualizarMesa as actualizarMesaRepo,
  eliminarMesa,
} from "../infrastructure/mesaRepository";

// Registrar una nueva mesa
export async function registrarMesa(datos) {
  try {
    const mesa = new Mesa(datos);
    mesa.validar();
    return await crearMesa({
      numero: mesa.numero,
      capacidad: mesa.capacidad,
      estado: mesa.estado,
    });
  } catch (error) {
    console.error("Error en registrarMesa:", error.message);
    return null;
  }
}

// Listar todas las mesas
export async function listarMesas() {
  return await obtenerMesas();
}

// Obtener mesa por ID
export async function obtenerMesa(id) {
  return await obtenerMesaPorId(id);
}

// Editar mesa existente
export async function editarMesa(id, campos) {
  return await actualizarMesa(id, campos);
}

// Borrar mesa
export async function borrarMesa(id) {
  return await eliminarMesa(id);
}


// Listar mesas
export async function listarMesas() {
  return await obtenerMesas();
}

// Actualizar mesa
export async function actualizarMesa(id, campos) {
  return await actualizarMesaRepo(id, campos);
}
