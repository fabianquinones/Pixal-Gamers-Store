import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Registro() {
  return (
    <div>
  <CustomNavbar />
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
      <Footer />
    </div>
  );
}