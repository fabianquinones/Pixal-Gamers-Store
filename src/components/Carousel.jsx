import React from 'react';

function Carousel() {
  return (
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
  );
}

export default Carousel;
