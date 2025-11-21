import React, { useEffect, useMemo, useState } from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getVenta } from '../Api';

export default function VentaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, ready } = useAuth();
  const [venta, setVenta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ready) return;
    if (!user) { navigate('/Login'); return; }
    (async () => {
      try {
        setLoading(true);
        const v = await getVenta(id);
        setVenta(v);
      } catch (e) {
        setError(e.message || 'Error al cargar la venta');
      } finally {
        setLoading(false);
      }
    })();
  }, [ready, user, id, navigate]);

  const resumen = useMemo(() => {
    if (!venta || !Array.isArray(venta.detalle)) return { items: 0, total: 0 };
    const items = venta.detalle.reduce((acc, d) => acc + (d.cantidad || 0), 0);
    const total = venta.detalle.reduce((acc, d) => acc + ((d.precioUnitario || 0) * (d.cantidad || 0)), 0);
    return { items, total };
  }, [venta]);

  const formatCurrency = (num) => {
    const n = Number(num) || 0;
    return n.toLocaleString('en-US');
  };

  return (
    <div>
      <CustomNavbar />
      <main className="formulario cuadrado-login" style={{ maxWidth: 900 }}>
        <h2>Detalle de la Compra</h2>
        {loading && <div>Cargando detalle...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && venta && (
          <>
            <div style={{ marginBottom: 12 }}>
              <strong>ID:</strong> {venta.idVenta || venta.id} &nbsp; | &nbsp;
              <strong>Fecha:</strong> {venta.fechaVenta ? new Date(venta.fechaVenta).toLocaleString() : '-'} &nbsp; | &nbsp;
              <strong>Estado:</strong> {venta.estado || 'PENDIENTE'}
            </div>
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(venta.detalle || []).map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.nombreProducto || d.idProducto}</td>
                    <td>{d.cantidad}</td>
                    <td>${formatCurrency(d.precioUnitario || 0)}</td>
                    <td>${formatCurrency(((d.precioUnitario || 0) * (d.cantidad || 0)) || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <strong>Items:</strong> {resumen.items} &nbsp; &nbsp; 
              <strong>Total:</strong> <span>{`$${formatCurrency(resumen.total)}`}</span>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button className="btn-secondary" onClick={() => navigate('/Historial')}>Volver al Historial</button>
              <button className="btn-primary" onClick={() => navigate('/Productos')}>Seguir Comprando</button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
