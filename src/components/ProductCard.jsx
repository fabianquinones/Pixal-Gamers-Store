import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { id, nombre, precio, descripcion, imagen } = product;
  const name = nombre;
  const image = imagen;
  const price = precio;
  const description = descripcion;
  const navegador = useNavigate();
  const redirigirProducto = () => {
    navegador(`/DetalleProducto/${id}`);
  }

  return (
    <Card className="producto h-100 d-flex flex-column" style={{ width: "18rem", margin: "1rem" }}>
      <Card.Img
        variant="top"
        src={image}
        alt={name}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <h3 className="producto-nombre">{name}</h3>
          <p>{description}</p>
          <p>
            <strong>Precio:</strong> ${price}
          </p>
        </div>
        <div className="d-flex mt-auto">
          <Button variant="primary" onClick={redirigirProducto} className="w-100">
            Ver detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;



