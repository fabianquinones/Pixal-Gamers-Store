import React from 'react';

export default function Productos() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom w-100 full-bleed">
          <div className="container-fluid px-0">
            <div className="navbar-brand d-flex align-items-center no-click">
              <img src="/Pixal-Gamers-Store-main/Images/bitmap.png" alt="logo" width="130" className="me-2" />
              <span className="titulo-brand">Pixel & Gamers Store</span>
            </div>
          </div>
        </nav>
      </header>
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
            {/* product cards (static) */}
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
            {/* ...other static products omitted for brevity (kept simple as requested) */}
          </div>
        </section>
      </main>
    </div>
  );
}
