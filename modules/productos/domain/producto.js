// Entidad Producto (Domain Layer)
// Define la estructura y reglas básicas de un producto en el sistema Sirve-Té

export class Producto {
    constructor({ id, nombre, descripcion, precio, categoria }) {
      this.id = id;               // Identificador único (uuid en Supabase)
      this.nombre = nombre;       // Nombre del producto
      this.descripcion = descripcion; // Descripción breve
      this.precio = precio;       // Precio numérico
      this.categoria = categoria; // Categoría (ej. bebidas, postres, etc.)
    }
  
    // Validación básica de datos
    validar() {
      if (!this.nombre || this.nombre.trim() === "") {
        throw new Error("El nombre del producto es obligatorio");
      }
      if (!this.descripcion || this.descripcion.trim() === "") {
        throw new Error("La descripción es obligatoria");
      }
      if (isNaN(this.precio) || this.precio <= 0) {
        throw new Error("El precio debe ser un número mayor a 0");
      }
      if (!this.categoria || this.categoria.trim() === "") {
        throw new Error("La categoría es obligatoria");
      }
      return true;
    }
  }
  