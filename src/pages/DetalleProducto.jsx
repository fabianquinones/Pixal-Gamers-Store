import React from 'react';
import './DetalleProducto.css';
import { useParams } from 'react-router-dom';
import { productos } from '../BD/productos';
import CustomNavbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DetalleProducto() {
  const { id } = useParams();
  const producto = productos.find(p => p.id === Number(id));

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
              <button className="btn-carrito">Añadir al carrito</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}