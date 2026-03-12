"use client";

import { useState } from "react";
import { registrarUsuario, loginUsuario } from "../../modules/usuarios/application/usuarioService";

export default function LoginPage() {
  const [showRegister, setShowRegister] = useState(false);

  // Campos del formulario
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("cliente"); // por defecto cliente
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Iniciar sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    const resultado = await loginUsuario(email, password);
    if (resultado.error) {
      alert(resultado.error);
    } else {
      alert("Login exitoso");
      const rol = resultado.usuario.rol;
      if (rol === "admin") window.location.href = "/admin";
      else if (rol === "mesero") window.location.href = "/meseros";
      else window.location.href = "/clientes";
    }
  };

  // Registrar usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const nuevoUsuario = { nombre, rol, email, password };
    const data = await registrarUsuario(nuevoUsuario);

    if (data) {
      alert("Usuario registrado correctamente");
      setShowRegister(false);
      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRol("cliente");
    }
  };

  return (
    <div className="login-container">
      <img src="/logo.png" alt="Sirve-Té Logo" className="logo" />
      <h1>Bienvenido a Sirve-Té</h1>

      {!showRegister ? (
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-login">Iniciar sesión</button>
          <button
            type="button"
            className="btn-register"
            onClick={() => setShowRegister(true)}
          >
            Registrar usuario
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="mesero">Mesero</option>
            <option value="admin">Administrador</option>
          </select>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-register">Crear cuenta</button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setShowRegister(false)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}
