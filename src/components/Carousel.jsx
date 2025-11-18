import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import './Carousel.css';

function HeroCarousel() {
  return (
    <section className="carrusel-hero mb-4">
      <Carousel fade interval={12000}>
        <Carousel.Item>
          <img
            src="/img/bannerbienvenida.png"
            alt="Banner bienvenida"
            className="hero-banner"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src="/img/bannerSilkSong.webp"
            alt="Banner Silksong"
            className="hero-banner hero-banner-contain"
          />
          <Carousel.Caption>
            <Button className="banner-cta" href="#" aria-label="Ver producto Silksong" variant="success">
              YA DISPONIBLE
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default HeroCarousel;
