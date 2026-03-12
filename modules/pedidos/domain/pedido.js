// Entidad Pedido (Domain Layer)
// Define la estructura y reglas básicas de un pedido en el sistema Sirve-Té

export class Pedido {
    constructor({ id, mesaId, usuarioId, fecha, estado, total }) {
      this.id = id;             // Identificador único (uuid en Supabase)
      this.mesaId = mesaId;     // ID de la mesa asociada
      this.usuarioId = usuarioId; // ID del mesero/usuario que gestiona el pedido
      this.fecha = fecha;       // Fecha y hora del pedido
      this.estado = estado;     // Estado: "pendiente", "en_proceso", "servido", "pagado"
      this.total = total;       // Total del pedido en dinero
    }
  
    // Validación básica de datos
    validar() {
      if (!this.mesaId) {
        throw new Error("El pedido debe estar asociado a una mesa");
      }
      if (!this.usuarioId) {
        throw new Error("El pedido debe estar asociado a un usuario/mesero");
      }
      if (!this.fecha) {
        throw new Error("La fecha del pedido es obligatoria");
      }
      if (!["pendiente", "en_proceso", "servido", "pagado"].includes(this.estado)) {
        throw new Error("El estado debe ser pendiente, en_proceso, servido o pagado");
      }
      if (isNaN(this.total) || this.total < 0) {
        throw new Error("El total debe ser un número mayor o igual a 0");
      }
      return true;
    }
  }
  