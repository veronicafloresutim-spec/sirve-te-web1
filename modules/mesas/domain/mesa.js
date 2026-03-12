// Entidad Mesa (Domain Layer)
// Define la estructura y reglas básicas de una mesa en el sistema Sirve-Té

export class Mesa {
    constructor({ id, numero, capacidad, estado }) {
      this.id = id;             // Identificador único (uuid en Supabase)
      this.numero = numero;     // Número de mesa
      this.capacidad = capacidad; // Número de personas que caben en la mesa
      this.estado = estado;     // Estado: "disponible", "ocupada", "reservada"
    }
  
    // Validación básica de datos
    validar() {
      if (!this.numero || isNaN(this.numero) || this.numero <= 0) {
        throw new Error("El número de mesa debe ser un número mayor a 0");
      }
      if (!this.capacidad || isNaN(this.capacidad) || this.capacidad <= 0) {
        throw new Error("La capacidad debe ser un número mayor a 0");
      }
      if (!["disponible", "ocupada", "reservada"].includes(this.estado)) {
        throw new Error("El estado debe ser disponible, ocupada o reservada");
      }
      return true;
    }
  }
  