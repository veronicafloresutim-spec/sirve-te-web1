// Entidad Usuario (Domain Layer)
// Define la estructura y reglas básicas de un usuario en el sistema Sirve-Té

export class Usuario {
    constructor({ id, nombre, rol, email, password }) {
      this.id = id;           // Identificador único (uuid en Supabase)
      this.nombre = nombre;   // Nombre del usuario
      this.rol = rol;         // Rol: "admin", "mesero", "cliente"
      this.email = email;     // Correo electrónico
      this.password = password; // Contraseña (texto plano en este proyecto académico)
    }
  
    // Validación básica de datos
    validar() {
      if (!this.nombre || this.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
      }
      if (!["admin", "mesero", "cliente"].includes(this.rol)) {
        throw new Error("El rol debe ser admin, mesero o cliente");
      }
      if (!this.email || !this.email.includes("@")) {
        throw new Error("El email no es válido");
      }
      if (!this.password || this.password.length < 4) {
        throw new Error("La contraseña debe tener al menos 4 caracteres");
      }
      return true;
    }
  }
  