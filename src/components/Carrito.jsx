import React from 'react';

export default function Carrito() {
  return (
    <div className="carrito-page">
      <header style={{ background: '#121212', padding: '1.2rem 0', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/images/bitmap.png" alt="Logo" style={{ height: 48 }} />
          <h1 style={{ color: '#00ff00' }}>Pixel & Gamers Store</h1>
        </div>
      </header>
      <main style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem' }}>
        <a href="#" style={{ display: 'inline-block', marginBottom: '1.2rem', color: '#00ff00' }}>↩ Volver</a>
        <h2 style={{ color: '#00ff00', textAlign: 'center' }}>Carrito de Compras</h2>
        <div className="carrito-lista">
          <div className="carrito-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Videojuego: Super Pixel Bros</span>
            <span>$19.990</span>
          </div>
          <hr style={{ borderColor: '#00ff00' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span>$41.970</span>
          </div>
          <button style={{ width: '100%', background: '#00ff00', color: '#121212' }}>Finalizar compra</button>
        </div>
      </main>
    </div>
  );
}
