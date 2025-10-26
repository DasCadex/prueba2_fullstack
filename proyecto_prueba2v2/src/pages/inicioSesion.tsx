// inicioSesion.tsx (Modificado)

import React, { useState } from "react";
import '../css/cuenta.css';
import logo from '../img/logo.png';
// import { useNavigate } from "react-router-dom"; // <--- YA NO SE USA

// 1. Definimos las props que el componente recibirá
interface InicioSesionProps {
  onLoginSuccess: (email: string) => void; // Función para éxito
  onNavigateToRegistro: () => void; // Función para navegar
}

// 2. Usamos las props en el componente
const InicioSesion: React.FC<InicioSesionProps> = ({ onLoginSuccess, onNavigateToRegistro }) => {
  const [correoelectronico, setCorreoelectronico] = useState('');
  const [contraseña, setContraseña] = useState('');
  // const navigate = useNavigate(); // <--- YA NO SE USA

  const [errores, setErrores] = useState({
    correoelectronico: "",
    contraseña: "",
  });

  const validarFormulario = () => {
    // ... (Tu lógica de validación sigue igual)
    const nuevosErrores = { correoelectronico: "", contraseña: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoelectronico.trim()) {
      nuevosErrores.correoelectronico = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(correoelectronico)) {
      nuevosErrores.correoelectronico = "Formato de email no válido.";
    }
    if(!contraseña.trim()){
      nuevosErrores.contraseña = "La contraseña es obligatoria.";
    }
    setErrores(nuevosErrores);
    return nuevosErrores;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario();
    
    if (!nuevosErrores.correoelectronico && !nuevosErrores.contraseña) {
      // 3. Llamamos a la prop en lugar de alert() y navigate()
      onLoginSuccess(correoelectronico); 

      setCorreoelectronico("");
      setContraseña("");
      setErrores({ correoelectronico: "", contraseña: "" });
    }
  }

  const handleNavigateToRegistro = () => {
    // 4. Llamamos a la prop en lugar de navigate()
    onNavigateToRegistro(); 
  };
    
  const botonDeshabilitado =
    !!errores.correoelectronico ||
    !!errores.contraseña ||
    !correoelectronico.trim() ||
    !contraseña.trim();

  return (
    <div className="contenedor-form-inicio">
      <img 
        src={logo} 
        alt="Logo de PixelHub" 
        className="navbar-logo" 
      />
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        {/* ... (Input de correo igual) ... */}
        <div className="mb-3">
          <label htmlFor="correo" className="form-label text-white">Correo Electrónico</label>
          <input 
            type="email"
            id="correo"
            className="form-control"
            value={correoelectronico}
            onChange={(e) => { setCorreoelectronico(e.target.value); validarFormulario(); }}
            required
          />
          {errores.correoelectronico && <div className="text-danger">{errores.correoelectronico}</div>}
        </div>
        
        {/* ... (Input de contraseña igual) ... */}
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label text-white">Contraseña</label>
          <input 
            type="password"
            id="contraseña"
            className="form-control"
            value={contraseña}
            onChange={(e) => { setContraseña(e.target.value); validarFormulario(); }}
            required
          />
          {errores.contraseña && <div className="text-danger">{errores.contraseña}</div>}
        </div>
        
        <button type="submit" className="btn btn-light w-100 " disabled={botonDeshabilitado}>
          Ingresar 
        </button>

        <div className="separator">O</div>

        {/* 5. El botón de registro ahora usa la nueva función */}
        <button type="button" className="btn btn-light w-100" onClick={handleNavigateToRegistro}>
          Registrate
        </button>
      </form>   
    </div>
  );
};

export default InicioSesion;