import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import VentaDetalle from '../src/pages/VentaDetalle.jsx';

vi.mock('../src/contexts/AuthContext.jsx', () => ({
  useAuth: () => ({ user: { id: 1 }, ready: true }),
  AuthProvider: ({ children }) => <>{children}</>
}));

vi.mock('../src/Api.js', () => ({
  getVenta: async () => ({
    idVenta: 7,
    fechaVenta: '2025-11-21T05:00:00.000Z',
    estado: 'PENDIENTE',
    detalle: [
      { idProducto: 10, nombreProducto: 'Mouse Gamer', cantidad: 2, precioUnitario: 14990 },
      { idProducto: 11, nombreProducto: 'Teclado', cantidad: 1, precioUnitario: 29990 }
    ]
  })
}));

describe('VentaDetalle', () => {
  beforeEach(() => vi.clearAllMocks());
  it('renderiza líneas y totales de la venta', async () => {
    render(
      <MemoryRouter initialEntries={["/Venta/7"]}>
        <Routes>
          <Route path="/Venta/:id" element={<VentaDetalle />} />
        </Routes>
      </MemoryRouter>
    );

    // Encabezados
    expect(await screen.findByText(/Detalle de la Compra/i)).toBeInTheDocument();

    // Líneas
    expect(await screen.findByText(/Mouse Gamer/)).toBeInTheDocument();
    expect(screen.getByText(/Teclado/)).toBeInTheDocument();

    // Subtotales y total
    expect(screen.getByText('$14,990')).toBeInTheDocument();
    // Puede aparecer tanto como precio unitario como subtotal
    expect(screen.getAllByText('$29,990').length).toBeGreaterThan(0);
    // Total: 2*14990 + 29990 = 59970
    expect(screen.getByText('$59,970')).toBeInTheDocument();
  });
});
