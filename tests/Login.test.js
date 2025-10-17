import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/pages/Login.jsx";
import { AuthProvider } from "../src/contexts/AuthContext.jsx";

describe("Componente Login", () => {
  it("renderiza correctamente el formulario de login", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
  expect(screen.getByLabelText(/correo/i)).toBeDefined();
  expect(screen.getByLabelText(/contraseña/i)).toBeDefined();
  expect(screen.getByRole("button", { name: /ingresar/i })).toBeDefined();
  });

  it("muestra mensaje de error si el login falla", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "noexiste@correo.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "incorrecta" } });
    fireEvent.click(screen.getByRole("button", { name: /ingresar/i }));
  const errorMsg = await screen.findByText(/usuario o contraseña inválidos/i);
  expect(errorMsg).toBeDefined();
  });

  it("actualiza el estado al escribir en el input de correo", () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>
    );
    const correoInput = screen.getByLabelText(/correo/i);
    fireEvent.change(correoInput, { target: { value: "nuevoUsuario@correo.com" } });
    expect(correoInput.value).toBe("nuevoUsuario@correo.com");
  });
});
