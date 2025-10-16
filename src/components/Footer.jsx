import React from 'react';

function Footer() {
  return (
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
  );
}

export default Footer;
