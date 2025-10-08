import React from 'react';

export default function DetalleSilksong() {
  return (
    <main>
      <section className="detalle-producto">
        <div className="detalle-contenido">
          <div className="img-detalle">
            <img src="/images/juego1.png" alt="Hollow Knight Silksong" />
          </div>
          <div className="info card-detalle">
            <h2>Hollow Knight: Silksong Steam Key</h2>
            <ul>
              <li>Explora como Hornet en un reino artesanal</li>
              <li>Enemigos ágiles y desafiantes</li>
              <li>Progresión de habilidades y secretos</li>
            </ul>
            <p>Un metroidvania lleno de acción y exploración.</p>
            <span className="precio">$10.500</span>
            <button className="btn-carrito">Añadir al carrito</button>
          </div>
        </div>
      </section>
    </main>
  );
}
