import React, { useState } from 'react';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import Form from 'react-bootstrap/Form';
import { Button, Alert } from 'react-bootstrap';
import { sendContacto } from '../Api';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado(null); setError(null);
    if (!nombre || !email || !mensaje) {
      setError('Todos los campos son obligatorios');
      return;
    }
    setLoading(true);
    try {
      await sendContacto({ nombre, email, mensaje });
      setEstado('Mensaje enviado correctamente');
      setNombre(''); setEmail(''); setMensaje('');
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al enviar contacto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <main>
  <section className="formulario cuadro-registro">
          <h2>Contáctanos</h2>
          {estado && <Alert variant="success" dismissible onClose={() => setEstado(null)}>{estado}</Alert>}
          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
          <Form id="formContacto" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Tu nombre" maxLength={50} value={nombre} onChange={e => setNombre(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" maxLength={100} value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} maxLength={500} value={mensaje} onChange={e => setMensaje(e.target.value)} required />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</Button>
          </Form>
        </section>
      </main>
      <Footer />
    </div>
  );
}