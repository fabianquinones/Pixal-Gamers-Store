import React, { useEffect, useState } from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Carrito() {
  const STORAGE_KEY = 'pgs_cart_v1';

  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ id: '', title: '', price: '' });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setCart(JSON.parse(raw));
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addOrIncrement = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);
  const total = cart.reduce((s, p) => s + p.price * p.quantity, 0);

  const handleAddForm = (e) => {
    e.preventDefault();
    const id = String(form.id).trim();
    const title = String(form.title).trim();
    const price = parseFloat(form.price);
    if (!id || !title || Number.isNaN(price) || price < 0) return;
    addOrIncrement({ id, title, price });
    setForm({ id: '', title: '', price: '' });
  };

  return (
    <div className="carrito-page">
      <CustomNavbar />
      <main className="formulario cuadrado-login">
        <section className="carrito-card">
          <h2 className="carrito-heading">Carrito de compras</h2>

          <div className="carrito-content">
            {cart.length === 0 ? (
              <div className="carrito-empty">Tu carrito está vacío.</div>
            ) : (
              <ul className="carrito-list">
                {cart.map((item) => (
                  <li key={item.id} className="carrito-item">
                    <div className="carrito-item-left">
                      <div className="carrito-title">{item.title}</div>
                      <div className="carrito-muted">ID: {item.id}</div>
                    </div>

                    <div className="carrito-item-right">
                      <div className="carrito-price">${item.price.toFixed(2)}</div>
                      <div className="carrito-qty">
                        <button onClick={() => changeQuantity(item.id, -1)}>-</button>
                        <span className="carrito-qty-number">{item.quantity}</span>
                        <button onClick={() => changeQuantity(item.id, +1)}>+</button>
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
              <strong>Total:</strong> ${total.toFixed(2)}
            </div>
            <div className="carrito-actions">
              <button className="btn-secondary" onClick={clearCart} disabled={cart.length === 0}>
                Vaciar carrito
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  if (cart.length === 0) return;
                  alert(`Compra simulada: ${cart.length} artículo(s). Total $${total.toFixed(2)}.`);
                  clearCart();
                }}
              >
                Pagar
              </button>
            </div>
          </div>

          <hr />

          <form className="carrito-form" onSubmit={handleAddForm}>
            <input
              placeholder="ID"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
            />
            <input
              placeholder="Título"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
            <input
              placeholder="Precio"
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            />
            <button type="submit" className="btn-primary">Añadir al carrito</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}