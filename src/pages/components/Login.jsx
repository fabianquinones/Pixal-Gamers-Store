import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom w-100 full-bleed">
          <div className="container-fluid px-0">
            <img src="/Logo_Pixel.png" alt="Pixel & Gamers Store Logo" width="140" className="me-2" />
            <div className="navbar-brand d-flex align-items-center no-click">
              <span className="titulo-brand">Pixel & Gamers Store</span>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Menú">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="menuPrincipal">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link active" aria-current="page" to="/">Inicio</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Producto">Productos</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Nosotros">Nosotros</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Contacto">Contacto</Link></li>
                <li className="nav-item"><a className="nav-link carrito-link" href="#">🛒 Carrito</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section class="formulario cuadrado-login">
          <h2>Iniciar Sesión</h2>
            <form id="formLogin">
              <div class="campo">
                <label for="usuario">Usuario o Correo:</label>
                <input type="text" id="usuario" name="usuario" maxlength="100" required />
              </div>
              <div class="campo">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" maxlength="50" required />
              </div>
              <div class="acciones">
                <button type="submit" class="btn-primario">Iniciar Sesión</button>
             </div>
            </form>
              <div class="acciones">
                <p>¿No tienes cuenta? <a href="registro.html" class="enlace-registro">Crea una cuenta</a></p>
              </div>
          </section>
      </main>


    </div>
  );
}
