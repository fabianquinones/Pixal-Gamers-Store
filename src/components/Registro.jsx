import React from 'react';

export default function Registro() {
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
          <h2>Registro de Usuario</h2>
          <form id="formRegistro">
            <div className="campo">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" id="nombre" name="nombre" maxLength="50" required />
            </div>
            <div className="campo">
              <label htmlFor="correo">Correo:</label>
              <input type="email" id="correo" name="correo" maxLength="100" required />
            </div>
            <div className="campo">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" minLength="6" required />
            </div>
            <div className="campo">
              <label htmlFor="confirmar-password">Confirmar Contraseña:</label>
              <input type="password" id="confirmar-password" name="confirmar-password" minLength="6" required />
            </div>
            <div className="campo">
              <label htmlFor="telefono">Teléfono:</label>
              <input type="tel" id="telefono" name="telefono" maxLength="15" required />
            </div>
            <div className="campo">
              <button type="submit">Registrarse</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
