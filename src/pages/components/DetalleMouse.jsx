import React from 'react';
import { Link } from 'react-router-dom';

export default function DetalleMouse() {
  return (
    <main>
      <section className="detalle-producto">
        <div className="detalle-contenido">
          <div className="img-detalle">
            <img src="/mauseRazerCobra.png" alt="Mouse Gamer RGB" />
          </div>
          <div className="info card-detalle">
            <h2>Mouse Gamer RGB</h2>
            <ul>
              <li>Retroiluminación RGB personalizable</li>
              <li>Sensor óptico de alta precisión (hasta 12.000 DPI)</li>
              <li>Diseño ergonómico</li>
            </ul>
            <p>Mouse gamer de última generación para máxima precisión y comodidad.</p>
            <span className="precio">$19.990</span>
            <button className="btn-carrito">Añadir al carrito</button>
          </div>
        </div>
      </section>
    </main>
  );
}
