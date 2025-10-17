import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import CustomNavbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await login({ email, password })
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
            <section className="formulario cuadrado-login container py-4">
              <Container>
                <Row className="justify-content-center">
                  <Col md={10} lg={8}>
                    <div className="login-inner p-3">
                      <h3 className="card-title mb-3">Iniciar sesión</h3>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="email">Correo</Form.Label>
                          <Form.Control id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="correo@ejemplo.com" type="email" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="password">Contraseña</Form.Label>
                          <Form.Control id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                        </Form.Group>
                        <div className="d-grid gap-2">
                          <Button type="submit" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</Button>
                        </div>
                      </Form>
                      <hr />
                      <p className="mb-0">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
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