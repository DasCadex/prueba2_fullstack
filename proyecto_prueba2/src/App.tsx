import { Routes, Route, Link } from "react-router-dom";
import React from 'react'; 
import './App.css'; 
import Principal from './pages/principal'; 
import InicioSesion from './pages/inicioSesion';
import Cuenta from './pages/cuenta'; 
import PublicarHilo from './pages/publicarHilo';
import Registro from './pages/registro';

function Navbar() {
  return (
    // <nav> se envuelve con navbar-wrapper
    <div className="navbar-wrapper"> 
      <nav className="navbar navbar-expand-lg mi-navbar">
        <div className="container-fluid">
          {/* Logo/Link Principal */}
          <Link className="nav-link" to="/principal">PixelHub</Link>

          {/* Contenido Colapsable (Enlaces) */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cuenta">Cuenta</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

function App() {
  return (
    // La clase App (o el body) debe manejar la altura completa y el layout
    <div className="App"> 
      
      {/* 1. BARRA DE NAVEGACIÓN (Navbar) */}
      <Navbar /> 

      {/* 2. CONTENIDO PRINCIPAL (Rutas) - Se muestra debajo de la Navbar */}
      <div className="main-content">
        <Routes>
          <Route path="/InicioSesion" element ={<InicioSesion />} />
          <Route path="/cuenta" element ={<Cuenta />} />
       
          <Route path="/publicarHilo" element ={<PublicarHilo />} />
          <Route path="/registro" element ={<Registro/>} />
        </Routes>
      </div>

      {/* 3. FOOTER */}
      <footer className="footer">
        © 2025 PixelHub - Todos los derechos reservados 
      </footer>
    </div>
  );
}

export default App