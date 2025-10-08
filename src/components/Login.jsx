import React from 'react';

export default function Login() {
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
        <section className="formulario cuadrado-login">
          <h2>Iniciar Sesión</h2>
          <form id="formLogin">
            <div className="campo">
              <label htmlFor="usuario">Usuario o Correo:</label>
              <input type="text" id="usuario" name="usuario" maxLength="100" required />
            </div>
            <div className="campo">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" id="password" name="password" maxLength="50" required />
            </div>
            <div className="acciones">
              <button type="submit" className="btn-primario">Iniciar Sesión</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
