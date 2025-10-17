import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";

function CustomNavbar() {
  return (
  <Navbar expand="lg" className="bg-body-tertiary navbar-main">
      <Container fluid className="navbar-container">
        <div className="navbar-flex">
          <div className="navbar-brand-flex">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="navbar-logo"
            />
            <span className="navbar-title">
              Pixal&Gamers Store
            </span>
          </div>
          <div className="navbar-links-wrapper">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto navbar-links-flex">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="/productos">Productos</Nav.Link>
                <Nav.Link href="/carrito">Carrito</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/registro">Registro</Nav.Link>
                <Nav.Link href="/nosotros">Nosotros</Nav.Link>
                <Nav.Link href="/contacto">Contacto</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
