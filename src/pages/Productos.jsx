import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Productos() {
  return (
    <div>
  <CustomNavbar />
      <main>
        <section className="filtros-productos">
          <form id="formFiltros">
            <select name="categoria" id="categoria">
              <option value="">Todas las categorías</option>
              <option value="perifericos">Periféricos</option>
              <option value="audio">Audio</option>
              <option value="monitores">Monitores</option>
              <option value="juegos">Juegos</option>
            </select>
            <input type="text" id="buscador" name="buscador" placeholder="Buscar producto..." />
            <button type="submit">Buscar</button>
          </form>
        </section>
        <section className="lista-productos">
          <h2>Todos los Productos</h2>
          <div className="grid-productos">
            <div className="producto">
              <div className="img-contenedor">
                <a href="#">
                  <img src="/images/mouse-removebg-preview.png" alt="Mouse Gamer RGB" />
                  <div className="descripcion-hover">Mouse gamer con luces RGB y alta precisión.</div>
                </a>
              </div>
              <h3>Mouse Gamer RGB</h3>
              <p>$19.990</p>
              <button>Añadir al carrito</button>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}