import React, { useState, useEffect } from "react";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default function Perfil() {
  const { user, logout, updateProfile, deleteAccount } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setMensaje(null);
    setError(null);
    
    try {
      await updateProfile({
        nombreUsuario: formData.nombre,
        apellidoUsuario: formData.apellido,
        telefono: formData.telefono,
        direccion: formData.direccion
      });
      setMensaje("Perfil actualizado exitosamente");
    } catch (err) {
      setError(err.message || "Error al actualizar perfil");
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
      });
    }
    setMensaje(null);
    setError(null);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmado = window.confirm("¿Seguro que deseas eliminar tu cuenta? Esta acción es irreversible.");
    if (!confirmado) return;
    setError(null);
    setMensaje(null);
    setLoadingDelete(true);
    try {
      await deleteAccount();
      setMensaje("Cuenta eliminada. Redirigiendo...");
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Error al eliminar cuenta');
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div>
      <CustomNavbar />
      <main>
        <section className="formulario cuadro-registro">
          <h2>Mi Perfil</h2>
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="perfil-contenido">
              <div className="perfil-form">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Tu apellido"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder="Tu email"
                  />
                  <small>El email no se puede modificar</small>
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Tu teléfono"
                  />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Tu dirección"
                  />
                </div>
              </div>

              <div className="perfil-botones" style={{display:'flex', flexWrap:'wrap', gap:'0.75rem', marginTop:'1rem'}}>
                <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
                <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                <Button className="btn-historial" onClick={() => navigate('/Historial')}>Historial</Button>
                <Button variant="outline-danger" disabled={loadingDelete} onClick={handleDeleteAccount}>
                  {loadingDelete ? 'Eliminando...' : 'Eliminar Cuenta'}
                </Button>
                <Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
              </div>
            </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
