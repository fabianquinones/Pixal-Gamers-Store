import React from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <Container fluid className="bg-dark text-light pt-5 pb-3">
        <Row className="align-items-center mb-4">
          <Col md={4} className="d-flex justify-content-center mb-3 mb-md-0">
            <Image src="/img/logo.png" alt="Pixel & Gamers Store" width={180} fluid rounded />
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Contacto</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-light border-0">¿Preguntas o comentarios?</ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light footer-listgroup-item">Escríbenos: <a href="mailto:contacto@pixelgamers.store" className="footer-green-link">contacto@pixelgamers.store</a></ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light footer-listgroup-item">O llámanos: <a href="tel:+56912345678" className="footer-green-link">+56 9 1234 5678</a></ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <h5>Síguenos en redes sociales</h5>
            <ListGroup horizontal className="justify-content-center">
              <ListGroup.Item className="bg-dark text-light footer-listgroup-item p-0 mx-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-green-link">Facebook</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light footer-listgroup-item p-0 mx-2">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-green-link">Instagram</a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-light footer-listgroup-item p-0 mx-2">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-green-link">Twitter</a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <small className="text-secondary">© 2025 Pixel & Gamers Store</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
