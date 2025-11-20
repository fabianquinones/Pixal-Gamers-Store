import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carrito from './pages/Carrito';
import Contacto from './pages/Contacto';
import Productos from './pages/Productos';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import DetalleProducto from './pages/DetalleProducto';
import Perfil from './pages/Perfil';
import HistorialVentas from './pages/HistorialVentas';
import AdminProductos from './pages/AdminProductos';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="/Contacto" element={<Contacto />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/DetalleProducto/:id" element={<DetalleProducto />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Historial" element={<HistorialVentas />} />
        <Route path="/Admin" element={<AdminProductos />} />
      </Routes>
    </Router>
  );
}

export default App;
