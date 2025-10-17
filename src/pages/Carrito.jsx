import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Carrito() {
  return (
    <div>
  <CustomNavbar />
      <main>
        <section className="carrito">
          <h2>Carrito de compras</h2>
          {/* Aquí iría la lógica y los productos del carrito */}
          <p>Tu carrito está vacío.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}