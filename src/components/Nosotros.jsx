import React from 'react';

export default function Nosotros() {
  return (
    <div className="nosotros">
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom w-100 full-bleed">
          <div className="container-fluid px-0">
            <div className="navbar-brand d-flex align-items-center no-click">
              <img src="/images/bitmap.png" alt="logo" width="130" className="me-2" />
              <span className="titulo-brand">Pixel & Gamers Store</span>
            </div>
          </div>
        </nav>
      </header>
      <main className="nosotros">
        <div className="container mt-5">
          <div className="text-center mb-5">
            <img src="/Pixal-Gamers-Store-main/Images/bitmap.png" alt="logo" className="img-fluid logo-central" style={{ maxWidth: 300 }} />
            <h1 className="mt-4 mb-3">Pixel & Gamers Store</h1>
            <p className="lead text-white">Una empresa dedicada a la venta de artículos geeks, periféricos gaming y todo lo que un verdadero gamer necesita.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
