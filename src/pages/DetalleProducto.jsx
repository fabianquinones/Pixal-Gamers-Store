import React, { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import './DetalleProducto.css';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProducto } from '../Api';

export default function DetalleProducto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(false);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProducto(id);
        if (active) setProducto(data);
      } catch (e) {
        if (active) setError(e.message || 'Error cargando producto');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  const handleAddToCart = () => {
    if (!producto) return;
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen || '',
      cantidad: 1,
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/Carrito');
    }, 800);
  };

  if (loading) {
    return (
      <div>
        <CustomNavbar />
        <main>
          <section className="detalle-producto">
            <div className="detalle-contenido"><h2>Cargando producto...</h2></div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CustomNavbar />
        <main>
          <section className="detalle-producto">
            <div className="detalle-contenido"><h2 style={{color:'red'}}>Error: {error}</h2></div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/Carrito');
    }, 1000);
  };

  if (!producto) {
    return (
      <div>
        <CustomNavbar />
        <main>
          <section className="detalle-producto">
            <div className="detalle-contenido"><h2>Producto no encontrado</h2></div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <main>
        <section className="detalle-producto">
          <div className="detalle-contenido">
            <div className="img-detalle">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="info card-detalle">
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <span className="precio">${Number(producto.precio).toLocaleString()}</span>
              <div style={{ marginTop: 8, fontWeight: 'bold' }}>
                Stock: {producto.stock != null ? producto.stock : '—'}
              </div>
              <button
                className="btn-carrito"
                onClick={handleAddToCart}
                disabled={producto.stock != null && producto.stock <= 0}
                style={producto.stock != null && producto.stock <= 0 ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
              >
                {producto.stock != null && producto.stock <= 0 ? 'Sin stock' : 'Añadir al carrito'}
              </button>
              {showAlert && (
                <div style={{ marginTop: 10, color: 'green', fontWeight: 'bold' }}>
                  ¡Producto añadido al carrito!
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}