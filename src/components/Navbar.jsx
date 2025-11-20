import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

function CustomNavbar() {
  const { user, isAdmin } = useAuth();
  
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navbar-links-flex">
              <Nav.Link as={Link} to="/">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/Productos">Productos</Nav.Link>
              <Nav.Link as={Link} to="/Nosotros">Nosotros</Nav.Link>
              <Nav.Link as={Link} to="/Contacto">Contacto</Nav.Link>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/Perfil">Mi Perfil</Nav.Link>
                  {isAdmin && <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>}
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/Login">Iniciar Sesión</Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/Carrito">Carrito</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
