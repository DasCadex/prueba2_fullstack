import React from "react";
import '../css/cuenta.css';
import logo from '../img/logo.png';

// Declara un componente funcional llamado Nosotros, significa React Functional Component, y le dice a TypeScript que Nosotros es un componente de React.
const principal: React.FC = () => {
   const [correoelectronico, setCorreoelectronico] = React.useState('');
    const [contraseña, setContraseña] = React.useState('');
  
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Gracias ${correoelectronico}, tu mensaje ha sido enviado!`); //Todo lo que pongas dentro de ${} se evalúa y se reemplaza por su valor.
      setCorreoelectronico("");
      setContraseña("");
    
    };
    
  
    return (
       <div className="contenedor-form-inicio">
  
        
        <img 
            src={logo} 
            alt="Logo de PixelHub" 
            className="navbar-logo" 
          />
  
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label text-white">Correo Electrónico</label>
            <input 
              type="email"
              id="correo"
              className="form-control"
              value={correoelectronico}
              onChange={(e) => setCorreoelectronico(e.target.value)} // evento que captura la informacion
              required
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label text-white">Contraseña</label>
            <input 
              type="password"
              id="contraseña"
              className="form-control"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)} // evento que captura la informacion
              required
            />
          </div>
  
          <button type="submit" className="btn btn-light w-100 ">
            Ingresar 
          </button>

          <div className="separator">O</div>

          <button type="submit" className="btn btn-light w-100 ">
            Registrate
          </button>
          
        </form>  
        
      </div>
  
    );

};

export default principal;