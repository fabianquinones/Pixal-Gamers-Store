import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DetalleTeclado() {
  return (
    <div>
  <CustomNavbar />
      <main>
        <section className="detalle-producto">
          <div className="detalle-contenido">
            <div className="img-detalle">
              <img src="/images/teclado-removebg-preview.png" alt="Teclado Mecánico" />
            </div>
            <div className="info card-detalle">
              <h2>Teclado Mecánico</h2>
              <ul>
                <li>Switches azules, retroiluminación RGB</li>
                <li>Chasis de aluminio</li>
                <li>Anti-ghosting y macros configurables</li>
              </ul>
              <p>Perfecto para jugadores que buscan precisión y comodidad.</p>
              <span className="precio">$39.990</span>
              <button className="btn-carrito">Añadir al carrito</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}