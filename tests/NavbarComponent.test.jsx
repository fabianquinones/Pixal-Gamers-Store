import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router-dom";
import CustomNavbar from "../src/components/Navbar.jsx";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";

describe("Componente Navbar", () => {
  it("renderiza correctamente", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CustomNavbar />
        </AuthProvider>
      </MemoryRouter>
    );
  const nav = screen.getByRole("navigation");
  expect(nav).toBeInTheDocument();
  });

  it("contiene los enlaces principales con href correctos", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CustomNavbar />
        </AuthProvider>
      </MemoryRouter>
    );
  expect(screen.getByRole("link", { name: /inicio/i }).getAttribute("href")).toBe("/");
  expect(screen.getByRole("link", { name: /productos/i }).getAttribute("href")).toBe("/productos");
  expect(screen.getByRole("link", { name: /carrito/i }).getAttribute("href")).toBe("/carrito");
  expect(screen.getByRole("link", { name: /login/i }).getAttribute("href")).toBe("/login");
  expect(screen.getByRole("link", { name: /registro/i }).getAttribute("href")).toBe("/registro");
  expect(screen.getByRole("link", { name: /nosotros/i }).getAttribute("href")).toBe("/nosotros");
  expect(screen.getByRole("link", { name: /contacto/i }).getAttribute("href")).toBe("/contacto");
  });
});
