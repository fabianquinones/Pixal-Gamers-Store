import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  return (
    <div>
  <CustomNavbar />
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
      <Footer />
    </div>
  );
}