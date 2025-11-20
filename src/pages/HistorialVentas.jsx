import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getHistorialVentas } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function HistorialVentas() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/Login');
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const data = await getHistorialVentas(user.id);
        setVentas(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message || 'Error cargando historial');
      } finally {
        setLoading(false);
      }
    })();
  }, [user, navigate]);

  return (
    <div>
      <CustomNavbar />
      <main className="formulario cuadrado-login" style={{ maxWidth: 900 }}>
        <h2>Historial de Compras</h2>
        {loading && <div>Cargando ventas...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && ventas.length === 0 && (
          <div>No tienes ventas registradas.</div>
        )}
        {!loading && !error && ventas.length > 0 && (
          <table className="table" style={{ width: '100%', marginTop: 16 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(v => {
                const fecha = v.fechaVenta ? new Date(v.fechaVenta).toLocaleString() : '-';
                const items = Array.isArray(v.detalle) ? v.detalle.reduce((acc, d) => acc + (d.cantidad || 0), 0) : 0;
                const total = Array.isArray(v.detalle)
                  ? v.detalle.reduce((acc, d) => acc + ((d.precioUnitario || 0) * (d.cantidad || 0)), 0)
                  : 0;
                return (
                  <tr key={v.idVenta || v.id}>
                    <td>{v.idVenta || v.id}</td>
                    <td>{fecha}</td>
                    <td>{v.estado}</td>
                    <td>{items}</td>
                    <td>${total.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: 20 }}>
          <button className="btn-secondary" onClick={() => navigate('/Perfil')}>Volver a Perfil</button>{' '}
          <button className="btn-primary" onClick={() => navigate('/Productos')}>Seguir Comprando</button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
