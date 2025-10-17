import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carrito from "../src/pages/Carrito.jsx";

describe("Carrito", () => {
  it("muestra mensaje de carrito vacío cuando no hay productos", () => {
    render(<Carrito />);
    const emptyMsg = screen.getByText((content, element) =>
      content.replace(/\s+/g, " ").includes("Tu carrito está vacío.")
    );
    expect(emptyMsg).not.toBeNull();
  });

  it("muestra productos en el carrito cuando se agregan", () => {
    render(<Carrito />);
    fireEvent.change(screen.getByPlaceholderText(/id/i), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText(/título/i), { target: { value: "Producto Test" } });
    fireEvent.change(screen.getByPlaceholderText(/precio/i), { target: { value: "100" } });
    fireEvent.click(screen.getByRole("button", { name: /añadir al carrito/i }));
  const productoTest = screen.getByText(/producto test/i);
  expect(productoTest).toBeDefined();
  });

  it("elimina producto del carrito al hacer clic en quitar", () => {
    render(<Carrito />);
    fireEvent.change(screen.getByPlaceholderText(/id/i), { target: { value: "2" } });
    fireEvent.change(screen.getByPlaceholderText(/título/i), { target: { value: "Producto Quitar" } });
    fireEvent.change(screen.getByPlaceholderText(/precio/i), { target: { value: "50" } });
    fireEvent.click(screen.getByRole("button", { name: /añadir al carrito/i }));
  // Busca el item del producto a quitar
  const item = screen.getByText(/producto quitar/i).closest(".carrito-item");
  const quitarButton = item.querySelector("button.btn-remove");
  fireEvent.click(quitarButton);
  const productoQuitar = screen.queryByText(/producto quitar/i);
  expect(productoQuitar).toBeNull();
  });
});
