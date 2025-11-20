import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from 'vitest';
import { ProductList } from "../src/components/productList";

describe("ProductList", () => {
  it("renderiza la lista de productos", () => {
    render(<ProductList min={0} max={1000} category="Todos" />);
  const productosTitle = screen.getByText(/Productos/i);
  expect(productosTitle).toBeInTheDocument();
  });
});
