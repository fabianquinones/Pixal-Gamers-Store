import React from 'react';
import CustomNavbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="index-page">
  <CustomNavbar />

      <main>
        <Carousel />

        <section className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="grid-productos grid-productos-3">
            <ProductCard img="/images/juego1.png" nombre="Hollow Knight Silksong Steam Key" precio="$10.500" />
            <ProductCard img="/images/mouse-removebg-preview.png" nombre="Mouse Gamer RGB" precio="$19.990" />
            <ProductCard img="/images/figura_anime-removebg-preview.png" nombre="Roy Mustang & Maes Hughes Kizuna de Fullmetal Alchemist" precio="$14.990" />
            <ProductCard img="/images/monitor-removebg-preview.png" nombre="Monitor 144Hz" precio="$149.990" />
            <ProductCard img="/images/auricolare-removebg-preview.png" nombre="Auriculares Pro" precio="$29.990" />
            <ProductCard img="/images/teclado-removebg-preview.png" nombre="Teclado Mecánico" precio="$39.990" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
