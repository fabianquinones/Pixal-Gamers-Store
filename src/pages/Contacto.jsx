import React from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

export default function Contacto() {
  return (
    <div>
      <CustomNavbar />
      <main>
  <section className="formulario cuadro-registro">
          <h2>Contáctanos</h2>
          <Form id="formContacto">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Tu nombre" maxLength={50} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" maxLength={100} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} maxLength={500} required />
            </Form.Group>
            <Button type="submit" variant="primary">Enviar</Button>
          </Form>
        </section>
      </main>
      <Footer />
    </div>
  );
}