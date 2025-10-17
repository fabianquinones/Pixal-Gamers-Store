import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CustomNavbar from "../src/components/Navbar.jsx";

describe("Componente Navbar", () => {
  it("renderiza correctamente", () => {
    render(
      <MemoryRouter>
  <CustomNavbar />
      </MemoryRouter>
    );
  const nav = screen.getByRole("navigation");
  expect(nav).toBeDefined();
  });

  it("contiene los enlaces principales con href correctos", () => {
    render(
      <MemoryRouter>
        <CustomNavbar />
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
