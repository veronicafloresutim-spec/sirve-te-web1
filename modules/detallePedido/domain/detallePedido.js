// Entidad DetallePedido (Domain Layer)
// Define la estructura y reglas básicas de un detalle de pedido en el sistema Sirve-Té

export class DetallePedido {
    constructor({ id, pedidoId, productoId, cantidad, precioUnitario }) {
      this.id = id;               // Identificador único (uuid en Supabase)
      this.pedidoId = pedidoId;   // ID del pedido asociado
      this.productoId = productoId; // ID del producto asociado
      this.cantidad = cantidad;   // Cantidad de unidades del producto
      this.precioUnitario = precioUnitario; // Precio unitario del producto
    }
  
    // Validación básica de datos
    validar() {
      if (!this.pedidoId) {
        throw new Error("El detalle debe estar asociado a un pedido");
      }
      if (!this.productoId) {
        throw new Error("El detalle debe estar asociado a un producto");
      }
      if (isNaN(this.cantidad) || this.cantidad <= 0) {
        throw new Error("La cantidad debe ser un número mayor a 0");
      }
      if (isNaN(this.precioUnitario) || this.precioUnitario <= 0) {
        throw new Error("El precio unitario debe ser un número mayor a 0");
      }
      return true;
    }
  
    // Calcular subtotal del detalle
    calcularSubtotal() {
      return this.cantidad * this.precioUnitario;
    }
  }
  