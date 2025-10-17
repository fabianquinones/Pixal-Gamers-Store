import React from 'react';

export default function Contacto() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom w-100 full-bleed">
          <div className="container-fluid px-0">
            <div className="navbar-brand d-flex align-items-center no-click">
              <img src="/images/bitmap.png" alt="logo" width="130" className="me-2" />
              <span className="titulo-brand">Pixel & Gamers Store</span>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="formulario cuadro-registro">
          <h2>Contáctanos</h2>
          <form id="formContacto">
            <div className="campo">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" maxLength="50" required />
            </div>
            <div className="campo">
              <label htmlFor="correo">Correo:</label>
              <input type="email" id="correo" name="correo" maxLength="100" required />
            </div>
            <div className="campo">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea id="mensaje" name="mensaje" rows="4" maxLength="500" required />
            </div>
            <div className="campo">
              <button type="submit">Enviar</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
