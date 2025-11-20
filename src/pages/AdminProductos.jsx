import React, { useEffect, useMemo, useState } from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../Api';

export default function AdminProductos() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nombre: '', precio: '', descripcion: '', categoria: '', categorialabel: '', imagen: '', destacado: false, stock: 0 });

  useEffect(() => {
    if (!user) { navigate('/Login'); return; }
    if (!isAdmin) { navigate('/'); return; }
  }, [user, isAdmin, navigate]);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || 'Error cargando productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargar(); }, []);

  const resetForm = () => setForm({ nombre: '', precio: '', descripcion: '', categoria: '', categorialabel: '', imagen: '', destacado: false, stock: 0 });

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, precio: Number(form.precio), stock: Number(form.stock) };
      await createProducto(payload);
      resetForm();
      await cargar();
    } catch (e) {
      setError(e.response?.data?.mensaje || 'Error creando producto');
    }
  };

  const startEdit = (p) => {
    setEditId(p.id);
    setForm({ nombre: p.nombre || '', precio: p.precio || '', descripcion: p.descripcion || '', categoria: p.categoria || '', categorialabel: p.categorialabel || '', imagen: p.imagen || '', destacado: !!p.destacado, stock: p.stock ?? 0 });
  };

  const cancelEdit = () => { setEditId(null); resetForm(); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, precio: Number(form.precio), stock: Number(form.stock) };
      await updateProducto(editId, payload);
      cancelEdit();
      await cargar();
    } catch (e) {
      setError(e.response?.data?.mensaje || 'Error actualizando producto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar producto?')) return;
    try { await deleteProducto(id); await cargar(); }
    catch (e) { setError(e.response?.data?.mensaje || 'Error eliminando producto'); }
  };

  const productosTabla = useMemo(() => productos, [productos]);

  return (
    <div>
      <CustomNavbar />
      <main className="formulario cuadrado-login" style={{ maxWidth: 1100 }}>
        <h2>Administración de Productos</h2>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}

        <section className="admin-product-section">
          <h4 className="admin-section-title">{editId ? 'Editar Producto' : 'Crear Producto'}</h4>
          <form onSubmit={editId ? handleUpdate : handleCreate} className="admin-product-form">
            <input className="admin-input" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
            <input className="admin-input" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} required />
            <input className="admin-input" placeholder="Categoría" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
            <input className="admin-input" placeholder="Etiqueta categoría" value={form.categorialabel} onChange={e => setForm({ ...form, categorialabel: e.target.value })} />
            <input className="admin-input" placeholder="Imagen (URL)" value={form.imagen} onChange={e => setForm({ ...form, imagen: e.target.value })} />
            <input className="admin-input" type="number" placeholder="Stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            <label className="admin-checkbox-label">
              <input type="checkbox" className="admin-checkbox" checked={!!form.destacado} onChange={e => setForm({ ...form, destacado: e.target.checked })} />
              DESTACADO
            </label>
            <textarea className="admin-textarea" placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
            <div className="admin-form-actions">
              <button className="btn-primary" type="submit">{editId ? 'Guardar' : 'Crear'}</button>
              {editId && <button className="btn-secondary" type="button" onClick={cancelEdit}>Cancelar</button>}
            </div>
          </form>
        </section>

        <section>
          {loading ? (
            <div>Cargando productos...</div>
          ) : (
            <table className="table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Etiqueta</th><th>Stock</th><th>Destacado</th><th></th>
                </tr>
              </thead>
              <tbody>
                {productosTabla.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>${(p.precio ?? 0).toLocaleString()}</td>
                    <td>{p.categoria}</td>
                    <td>{p.categorialabel}</td>
                    <td>{p.stock ?? 0}</td>
                    <td>{p.destacado ? 'Sí' : 'No'}</td>
                    <td style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-primary" onClick={() => startEdit(p)}>Editar</button>
                      <button className="btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
