import React, { useState } from 'react'
import CustomNavbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

export default function Registro() {
    const { register, login } = useAuth()
    const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', confirmPassword: '', telefono: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
    try {
      
      if (form.password !== form.confirmPassword) {
        setError('Las contraseñas no coinciden.')
        setLoading(false)
        return
      }

     
      const payload = { nombre: form.nombre, apellido: form.apellido, email: form.email, password: form.password, telefono: form.telefono }
      await register(payload)
      await login({ email: form.email, password: form.password })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
    }

    return (
        <div>
          <CustomNavbar />
          <main>
            <section className="formulario cuadro-registro container py-4">
              <Container>
                <Row className="justify-content-center">
                  <Col md={8} lg={6}>
                    <div className="register-inner p-3">
                      <h3 className="card-title text-center mb-3">Crear cuenta</h3>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="nombre" value={form.nombre} onChange={onChange} required />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control name="apellido" value={form.apellido} onChange={onChange} required />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control name="email" type="email" value={form.email} onChange={onChange} required />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name="password" value={form.password} onChange={onChange} minLength={6} required />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={form.confirmPassword} onChange={onChange} minLength={6} required />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="telefono" type="tel" value={form.telefono} onChange={onChange} maxLength={15} required />
                          </Form.Group>
                          <div className="d-grid gap-2">
                            <Button type="submit" disabled={loading}>{loading ? 'Creando…' : 'Crear cuenta'}</Button>
                          </div>
                        </Form>
                        <hr />
                        <p className="mb-0">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </main>
          <Footer />
        </div>
    )
}