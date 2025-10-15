import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Nosotros() {
  return (
    <div className="nosotros">
  <CustomNavbar />
      <main className="nosotros">
        <div className="container mt-5">
          <div className="text-center mb-5">
            <img src="/images/bitmap.png" alt="logo" className="img-fluid logo-central" style={{ maxWidth: 300 }} />
            <h1 className="mt-4 mb-3">Pixel & Gamers Store</h1>
            <p className="lead text-white">Una empresa dedicada a la venta de artículos geeks, periféricos gaming y todo lo que un verdadero gamer necesita.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}