import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from 'react'; 
import './App.css'; 
import Principal from './pages/principal'; 
import InicioSesion from './pages/inicioSesion';
import Cuenta from './pages/cuenta'; 
import Registro from './pages/registro';
import Contacto from "./pages/contacto";

function Navbar() {
  return (
    <div className="navbar-wrapper"> 
      <nav className="navbar navbar-expand-lg mi-navbar">
        <div className="container-fluid">
          <Link className="nav-link" to="/principal">PixelHub</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cuenta">Cuenta</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}


function App() {
  
  const navigate = useNavigate(); 

  const handleLoginSuccess = (email: string) => {
    alert(`Gracias ${email}, has iniciado sesión!`); 
    navigate('/principal');
  };

  const handleNavigateToRegister = () => {
    navigate('/registro');
  };

  // ---Función para navegar a Inicio de Sesión ---
  const handleNavigateToLogin = () => {
    navigate('/inicioSesion'); // Navega a la nueva ruta de login
  };

  return (
    <div className="App"> 
      <Navbar /> 

      <div className="main-content">
        <Routes>
          {/* --- CAMBIO: La ruta raíz ahora muestra Registro --- */}
          <Route 
            path="/" 
            element={<Registro />} // Muestra Registro por defecto
          />
          {/* --- CAMBIO: La ruta /inicioSesion ahora muestra InicioSesion --- */}
          <Route 
            path="/inicioSesion" 
            element={
              <InicioSesion 
                onLoginSuccess={handleLoginSuccess}
                onNavigateToRegister={handleNavigateToRegister} // Mantenemos esta por si acaso
              />
            } 
          />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* --- CAMBIO: La ruta /registro ahora también lleva a Registro (o puedes quitarla si / es suficiente) --- */}
          {/* Si quieres que /registro siga funcionando, déjala así: */}
          <Route path="/registro" element={<Registro />} /> 
          {/* Si prefieres que solo / funcione para registro, puedes borrar la línea anterior */}
        </Routes>
      </div>

      <footer className="footer">
        © 2025 PixelHub - Todos los derechos reservados 
      </footer>
    </div>
  );
}

export default App;