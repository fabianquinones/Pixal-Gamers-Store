
import React, { useState } from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ProductList } from '../components/productList.jsx';

export default function Productos() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [category, setCategory] = useState('Todos');

  return (
    <div>
      <CustomNavbar />
      <main>
        <div className="filtro-productos-wrapper">
          <section className="filter-section">
            <label>
              Precio mínimo:
              <input
                type="number"
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
              />
            </label>
            <label>
              Precio máximo:
              <input
                type="number"
                value={maxPrice === Infinity ? '' : maxPrice}
                onChange={e => setMaxPrice(e.target.value === '' ? Infinity : Number(e.target.value))}
              />
            </label>
            <label>
              Categoría:
              <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value='Todos'>Todos</option>
                <option value='perifericos'>Periféricos</option>
                <option value='audio'>Audio</option>
                <option value='monitores'>Monitores</option>
                <option value='juegos'>Juegos</option>
                <option value='coleccionables'>Coleccionables</option>
                <option value='accesorios'>Accesorios</option>
              </select>
            </label>
          </section>
        </div>
        <div className="productos-lista-pagina">
          <ProductList min={minPrice} max={maxPrice} category={category} />
        </div>
      </main>
      <Footer />
    </div>
  );
}