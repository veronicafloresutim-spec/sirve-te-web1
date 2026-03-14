"use client";

import { useRouter } from "next/navigation";

export default function HomeView() {
  const router = useRouter();

  return (
    <div className="app-main text-center">
      <h1>Welcome to Sirve-Té</h1>
      <p>Select your role to continue:</p>

      <div className="role-buttons">
        {/* Client button */}
        <button onClick={() => router.push("/views/clients/ClientWelcomeView")}>
          Client
        </button>

        {/* Waiter button */}
        <button onClick={() => router.push("/views/waiters/WaiterLoginView")}>
          Waiter
        </button>

        {/* Administrator button */}
        <button onClick={() => router.push("/views/admin/AdminLoginView")}>
          Administrator
        </button>
      </div>
    </div>
  );
}
