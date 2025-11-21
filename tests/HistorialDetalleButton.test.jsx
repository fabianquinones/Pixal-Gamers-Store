import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, Route, Routes } from 'react-router-dom';
import HistorialVentas from '../src/pages/HistorialVentas.jsx';

// Mock AuthContext to avoid real storage/network
vi.mock('../src/contexts/AuthContext.jsx', () => ({
  useAuth: () => ({ user: { id: 123, email: 'user@correo.com' }, ready: true }),
  AuthProvider: ({ children }) => <>{children}</>
}));

// Mock API to provide a deterministic list
vi.mock('../src/Api.js', () => ({
  getHistorialVentas: async () => ([
    { idVenta: 42, fechaVenta: '2025-11-21T05:00:00.000Z', estado: 'PENDIENTE', detalle: [{ cantidad: 2, precioUnitario: 19990 }] },
  ]),
}));

function LocationViewer() {
  const loc = useLocation();
  return <div data-testid="location">{loc.pathname}</div>;
}

describe('HistorialVentas - Ver detalle', () => {
  beforeEach(() => vi.clearAllMocks());
  it('muestra botón y navega a /Venta/:id', async () => {
    render(
      <MemoryRouter initialEntries={["/Historial"]}>
        <Routes>
          <Route path="/Historial" element={<><HistorialVentas /><LocationViewer /></>} />
          <Route path="/Venta/:id" element={<LocationViewer />} />
        </Routes>
      </MemoryRouter>
    );

    // Espera al botón "Ver detalle"
    const btn = await screen.findByRole('button', { name: /ver detalle/i });
    expect(btn).toBeInTheDocument();

    // Click y afirmar navegación
    fireEvent.click(btn);
    const loc = await screen.findByTestId('location');
    expect(loc.textContent).toMatch(/^\/Venta\/42$/);
  });
});
