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
import DetalleMouse from './pages/DetalleMouse';
import DetalleTeclado from './pages/DetalleTeclado';
import DetalleSilksong from './pages/DetalleSilksong';



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
        <Route path="/Mouse" element={<DetalleMouse />} />
        <Route path="/Teclado" element={<DetalleTeclado />} />
        <Route path="/Silksong" element={<DetalleSilksong />} />

        
        
      </Routes>
    </Router>
  );
}

export default App;
