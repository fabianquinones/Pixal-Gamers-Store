import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './DetalleProducto.css';
import { useParams } from 'react-router-dom';
import { productos } from '../BD/productos';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DetalleProducto() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
  const producto = productos.find(p => p.id === Number(id));

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1,
    });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/Carrito');
    }, 1000);
  };

  if (!producto) {
    return (
      <div>
        <CustomNavbar />
        <main>
          <section className="detalle-producto">
            <div className="detalle-contenido">
              <h2>Producto no encontrado</h2>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <main>
        <section className="detalle-producto">
          <div className="detalle-contenido">
            <div className="img-detalle">
              <img src={producto.imagen} alt={producto.nombre} />
            </div>
            <div className="info card-detalle">
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <span className="precio">${producto.precio.toLocaleString()}</span>
              <button className="btn-carrito" onClick={handleAddToCart}>Añadir al carrito</button>
              {showAlert && (
                <div style={{ marginTop: 10, color: 'green', fontWeight: 'bold' }}>
                  ¡Producto añadido al carrito!
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}