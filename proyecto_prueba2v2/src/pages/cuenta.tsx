
import React, { useState } from "react"; //permite manejar valores dinámicos, como los campos del formulario
import '../css/cuenta.css';
//declaracion de las bariables que usaremos en esta pestaña 



// Declara un componente funcional llamado Nosotros, significa React Functional Component, y le dice a TypeScript que Nosotros es un componente de React.
const cuenta: React.FC = () => {
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

      <h1 className="text-inicio fw-bold display-5 mb-3"> PixelHub</h1>

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

        <button type="submit" className="btn btn-light w-100">
          Enviar
        </button>
        
      </form>




      
      
    </div>

  );
};

export default cuenta;