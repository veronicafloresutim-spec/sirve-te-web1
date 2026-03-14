// app/layout.tsx

import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sirve-Té",
  description: "Restaurant management system with roles: client, waiter, admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="app-header">
          <div className="logo-container">
            <img src="/logo.png" alt="Sirve-Té Logo" className="logo" />
            <h1>Sirve-Té</h1>
          </div>
          <nav className="app-nav">
            <a href="/views/home/HomeView">Home</a>
            <a href="/views/clients/ClientWelcomeView">Client</a>
            <a href="/views/waiters/WaiterLoginView">Waiter</a>
            <a href="/views/admin/AdminLoginView">Admin</a>
            <a href="/views/products/ProductsView">Products</a>
            <a href="/views/sales/SalesView">Sales</a>
          </nav>
        </header>

        {/* Main content */}
        <main className="app-main">{children}</main>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Sirve-Té. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
