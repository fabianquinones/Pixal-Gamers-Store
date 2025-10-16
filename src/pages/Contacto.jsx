import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contacto() {
  return (
    <div>
  <CustomNavbar />
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
      <Footer />
    </div>
  );
}