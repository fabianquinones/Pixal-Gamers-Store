import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from "react-router-dom";
import Carrito from "../src/pages/Carrito.jsx";
import { CartProvider } from "../src/contexts/CartContext.jsx";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";

// Helper para renderizar con providers
const renderWithProviders = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          {component}
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe("Carrito", () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  it("muestra mensaje de carrito vacío cuando no hay productos", () => {
    renderWithProviders(<Carrito />);
    const emptyMsg = screen.getByText((content, element) =>
      content.replace(/\s+/g, " ").includes("Tu carrito está vacío.")
    );
    expect(emptyMsg).toBeTruthy();
  });

  it("muestra productos en el carrito cuando hay items guardados", () => {
    // Simular productos en localStorage
    const mockCart = [
      {
        id: "1",
        nombre: "Producto Test",
        precio: 100,
        cantidad: 1,
        imagen: "/img/test.jpg"
      }
    ];
    localStorage.setItem('pgs_cart_v1', JSON.stringify(mockCart));

    renderWithProviders(<Carrito />);
    
    const productoTest = screen.getByText(/Producto Test/i);
    expect(productoTest).toBeInTheDocument();
    
    // Verificar que el precio aparece en la página
    const precios = screen.getAllByText(/\$100/);
    expect(precios.length).toBeGreaterThan(0);
    
    // Verificar el ID del producto
    expect(screen.getByText(/ID:\s*1/)).toBeInTheDocument();
  });

  it("elimina producto del carrito al hacer clic en quitar", () => {
    // Simular productos en localStorage
    const mockCart = [
      {
        id: "2",
        nombre: "Producto Quitar",
        precio: 50,
        cantidad: 1,
        imagen: "/img/test.jpg"
      }
    ];
    localStorage.setItem('pgs_cart_v1', JSON.stringify(mockCart));

    renderWithProviders(<Carrito />);
    
    // Verificar que el producto está presente
    expect(screen.getByText(/Producto Quitar/i)).toBeInTheDocument();
    
    // Buscar y hacer clic en el botón Quitar
    const quitarButton = screen.getByRole("button", { name: /quitar/i });
    fireEvent.click(quitarButton);
    
    // Verificar que el producto fue eliminado
    const productoQuitar = screen.queryByText(/Producto Quitar/i);
    expect(productoQuitar).not.toBeInTheDocument();
    
    // Verificar que aparece el mensaje de carrito vacío
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("actualiza la cantidad de un producto", () => {
    const mockCart = [
      {
        id: "3",
        nombre: "Producto Cantidad",
        precio: 200,
        cantidad: 1,
        imagen: "/img/test.jpg"
      }
    ];
    localStorage.setItem('pgs_cart_v1', JSON.stringify(mockCart));

    renderWithProviders(<Carrito />);
    
    // Buscar el botón de incrementar
    const buttons = screen.getAllByRole("button");
    const incrementButton = buttons.find(btn => btn.textContent === '+');
    
    fireEvent.click(incrementButton);
    
    // Verificar que la cantidad se actualizó
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("vacía el carrito al hacer clic en vaciar carrito", () => {
    const mockCart = [
      {
        id: "4",
        nombre: "Producto 1",
        precio: 100,
        cantidad: 1,
        imagen: "/img/test.jpg"
      },
      {
        id: "5",
        nombre: "Producto 2",
        precio: 200,
        cantidad: 1,
        imagen: "/img/test.jpg"
      }
    ];
    localStorage.setItem('pgs_cart_v1', JSON.stringify(mockCart));

    renderWithProviders(<Carrito />);
    
    // Verificar que los productos están presentes
    expect(screen.getByText(/Producto 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Producto 2/i)).toBeInTheDocument();
    
    // Hacer clic en vaciar carrito
    const vaciarButton = screen.getByRole("button", { name: /vaciar carrito/i });
    fireEvent.click(vaciarButton);
    
    // Verificar que el carrito está vacío
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });
});
