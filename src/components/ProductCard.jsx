import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ img, nombre, precio, detalleUrl }) {
  return (
    <div className="producto">
      <img src={img} alt={nombre} loading="lazy" />
      <h3>{nombre}</h3>
      <p>{precio}</p>
      <Link to={detalleUrl || '/Mouse'}><button>Ver más</button></Link>
      
    </div>
    
  );
}

export default ProductCard;



