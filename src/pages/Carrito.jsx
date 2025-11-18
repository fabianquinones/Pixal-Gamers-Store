import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Carrito() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handlePagar = () => {
    if (items.length === 0) return;
    alert(`Compra simulada: ${items.length} artículo(s). Total $${total.toLocaleString()}.`);
    clearCart();
  };

  const handleSeguirComprando = () => {
    navigate('/Productos');
  };

  return (
    <div className="carrito-page">
      <CustomNavbar />
      <main className="formulario cuadrado-login">
        <section className="carrito-card">
          <h2 className="carrito-heading">Carrito de compras</h2>
          <div className="carrito-content">
            {items.length === 0 ? (
              <div className="carrito-empty">Tu carrito está vacío.</div>
            ) : (
              <ul className="carrito-list">
                {items.map((item) => (
                  <li key={item.id} className="carrito-item">
                    <div className="carrito-item-left">
                      <img src={item.imagen} alt={item.nombre} style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }} />
                      <div>
                        <div className="carrito-title">{item.nombre}</div>
                        <div className="carrito-muted">ID: {item.id}</div>
                      </div>
                    </div>
                    <div className="carrito-item-right">
                      <div className="carrito-price">${item.precio.toLocaleString()}</div>
                      <div className="carrito-qty">
                        <button onClick={() => updateQuantity(item.id, Math.max(1, item.cantidad - 1))} disabled={item.cantidad <= 1}>-</button>
                        <span className="carrito-qty-number">{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                        <button className="btn-remove" onClick={() => removeItem(item.id)}>Quitar</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="carrito-summary">
            <div className="carrito-total">
              <strong>Total:</strong> ${total.toLocaleString()}
            </div>
            <div className="carrito-actions">
              <button className="btn-secondary" onClick={clearCart} disabled={items.length === 0}>
                Vaciar carrito
              </button>
              <button className="btn-primary" onClick={handlePagar} disabled={items.length === 0}>
                Pagar
              </button>
            </div>
          </div>
        </section>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn-secondary" onClick={handleSeguirComprando}>
            Seguir comprando
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}