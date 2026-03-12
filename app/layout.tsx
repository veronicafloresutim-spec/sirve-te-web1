import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirve-Té",
  description: "Aplicación web integradora para gestión de cafetería",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="app-header">
          <img src="/logo.png" alt="Sirve-Té Logo" className="logo" />
          <h1>Sirve-Té</h1>
          <nav className="app-nav">
            <a href="/productos">Productos</a>
            <a href="/mesas">Mesas</a>
            <a href="/pedidos">Pedidos</a>
            <a href="/detallePedido">Detalle Pedido</a>
            <a href="/clientes">Clientes</a>
            <a href="/meseros">Meseros</a>
            <a href="/admin">Admin</a>
            <a href="/login">Login</a>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="app-footer">
          <p>© 2026 Sirve-Té | Proyecto Integrador UTIM</p>
        </footer>
      </body>
    </html>
  );
}
