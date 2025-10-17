import React from 'react';
import CustomNavbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { productos } from '../BD/productos';

export default function Home() {
  return (
    <div className="index-page">
  <CustomNavbar />

      <main>
        <Carousel />

        <section className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="grid-productos grid-productos-3">
            {/* Importa los productos desde la BD y muestra los destacados por id */}
            {[
              5, // hollow knight silksong
              8, // Mouse
              3, // Figura Anime
              7, // Monitor
              1, // Auriculares
              13 // Teclado Gamer
            ].map(id => {
              const prod = productos.find(p => p.id === id);
              return prod ? <ProductCard key={prod.id} product={prod} /> : null;
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
