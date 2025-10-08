import React from 'react';

export default function Home() {
  return (
    <div className="index-page">
      <header>
        <nav className="navbar navbar-expand-lg navbar-custom w-100 full-bleed">
          <div className="container-fluid px-0">
            <img src="/images/bitmap.png" alt="Pixel & Gamers Store Logo" width="190" className="me-2" />
            <div className="navbar-brand d-flex align-items-center no-click">
              <span className="titulo-brand">Pixel & Gamers Store</span>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Menú">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="menuPrincipal">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Inicio</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Productos</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Nosotros</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
                <li className="nav-item"><a className="nav-link carrito-link" href="#">🛒 Carrito</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="carrusel-hero mb-4">
          <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="12000">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
              <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2" />
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/bannerbienvenida.png" className="d-block w-100 hero-banner" alt="Banner bienvenida" width="1920" height="520" loading="eager" decoding="async" fetchPriority="high" />
              </div>
              <div className="carousel-item">
                <img src="/images/bannerSilkSong.webp" className="d-block w-100 hero-banner hero-banner-contain" alt="Banner Silksong" width="1920" height="520" loading="lazy" decoding="async" />
                <div className="carousel-caption">
                  <a href="#" className="banner-cta" role="button" aria-label="Ver producto Silksong">YA DISPONIBLE</a>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </section>

        <section className="productos-destacados">
          <h2>Productos Destacados</h2>
          <div className="grid-productos grid-productos-3">
            <div className="producto">
              <img src="/images/juego1.png" alt="Hollow Knight Silksong Steam Key" loading="lazy" />
              <h3>Hollow Knight Silksong Steam Key</h3>
              <p>$10.500</p>
              <a href="#"><button>Ver más</button></a>
            </div>
            <div className="producto">
              <img src="/images/mouse-removebg-preview.png" alt="Mouse Gamer RGB con luces" loading="lazy" />
              <h3>Mouse Gamer RGB</h3>
              <p>$19.990</p>
              <a href="#"><button>Ver más</button></a>
            </div>
            <div className="producto">
              <img src="/images/figura_anime-removebg-preview.png" alt="Figura anime" />
              <h3>Roy Mustang & Maes Hughes Kizuna de Fullmetal Alchemist</h3>
              <p>$14.990</p>
              <a href="#"><button>Ver más</button></a>
            </div>
            <div className="producto">
              <img src="/images/monitor-removebg-preview.png" alt="Monitor 144Hz" />
              <h3>Monitor 144Hz</h3>
              <p>$149.990</p>
              <a href="#"><button>Ver más</button></a>
            </div>
            <div className="producto">
              <img src="/images/auricolare-removebg-preview.png" alt="Auriculares Pro" />
              <h3>Auriculares Pro</h3>
              <p>$29.990</p>
              <a href="#"><button>Ver más</button></a>
            </div>
            <div className="producto">
              <img src="/images/teclado-removebg-preview.png" alt="Teclado Mecánico" />
              <h3>Teclado Mecánico</h3>
              <p>$39.990</p>
              <a href="#"><button>Ver más</button></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer-3 mt-5">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-col footer-brand">
              <img src="/images/bitmap.png" alt="Pixel & Gamers Store" className="footer-logo" loading="lazy" width="180" />
            </div>
            <div className="footer-col footer-contacto">
              <h3 className="footer-title">Contacto</h3>
              <p className="footer-text">¿Preguntas o comentarios?</p>
              <p className="footer-text">Escríbenos: <a href="mailto:contacto@pixelgamers.store" className="footer-link">contacto@pixelgamers.store</a></p>
              <p className="footer-text">O llámanos: <a href="tel:+56912345678" className="footer-link">+56 9 1234 5678</a></p>
            </div>
            <div className="footer-col footer-social">
              <h3 className="footer-title">Síguenos en redes sociales</h3>
              <ul className="social-list">
                <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a></li>
                <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="copyright">© 2025 Pixel & Gamers Store</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
