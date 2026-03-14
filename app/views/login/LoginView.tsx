"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterUserForm from "./forms/RegisterUserForm";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("waiter"); // default role
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with Supabase auth or custom validation
    if (role === "waiter") {
      router.push("/views/waiters/WaiterDashboardView");
    } else if (role === "admin") {
      router.push("/views/admin/AdminDashboardView");
    } else {
      alert("Invalid role selected.");
    }
  };

  return (
    <div className="app-main text-center">
      <h2>Login</h2>

      {!showRegister ? (
        <>
          <form onSubmit={handleLogin} className="login-form">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <label htmlFor="role">Role:</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="waiter">Waiter</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button type="submit">Login</button>
          </form>

          <p>
            Don’t have an account?{" "}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      ) : (
        <RegisterUserForm onCancel={() => setShowRegister(false)} />
      )}
    </div>
  );
}
