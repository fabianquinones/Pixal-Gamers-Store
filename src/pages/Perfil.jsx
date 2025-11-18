import React, { useState } from "react";
import CustomNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Actualizar el objeto user con los nuevos datos
    if (user) {
      user.nombre = formData.nombre;
      user.telefono = formData.telefono;
      user.direccion = formData.direccion;
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Restaurar los valores originales del formulario
    setFormData({
      nombre: user?.nombre || "",
      email: user?.email || "",
      telefono: user?.telefono || "",
      direccion: user?.direccion || "",
    });
    setIsEditing(false);
  };

  return (
    <div>
      <CustomNavbar />
      <main>
        <section className="formulario cuadro-registro">
          <h2>Mi Perfil</h2>
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

              <div className="perfil-botones">
                <Button variant="primary" onClick={handleSave}>Guardar Cambios</Button>
                <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                <Button variant="danger" onClick={handleLogout}>Cerrar Sesión</Button>
              </div>
            </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
