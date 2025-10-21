import React, { useState } from "react"; //permite manejar valores dinámicos, como los campos del formulario
import '../css/cuenta.css';
import logo from '../img/logo.png';
import { useNavigate } from "react-router-dom";//permite la navegación entre páginas

// Declara un componente funcional llamado Nosotros, significa React Functional Component, y le dice a TypeScript que Nosotros es un componente de React.
const inicioSesion: React.FC = () => {
  const [correoelectronico, setCorreoelectronico] = useState('');
  const [contraseña, setContraseña] = useState('');

  const navigate = useNavigate();//hook para la navegación entre páginas

  // Estados para manejar los mensajes de error
  const [errores, setErrores] = useState({
    correoelectronico: "",
    contraseña: "",
  });

  const validarFormulario = () => {
    const nuevosErrores = { correoelectronico: "", contraseña: "" };
    // Validar correo electrónico
    // Validación del email con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoelectronico.trim()) {
      nuevosErrores.correoelectronico = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(correoelectronico)) {
      nuevosErrores.correoelectronico = "Formato de email no válido.";
    }
    // Validar contraseña
    if(!contraseña.trim()){
      nuevosErrores.contraseña = "La contraseña es obligatoria.";
    }

    setErrores(nuevosErrores);
    return nuevosErrores;
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //llamar a la función de validación y usar el resultado inmediatamente
    const nuevosErrores = validarFormulario();
    //enviaremos los datos si no hay errores
     if (!nuevosErrores.correoelectronico && !nuevosErrores.contraseña) {
      alert(`Gracias ${correoelectronico}, has iniciado sesión!`);
      navigate('/principal');
      setCorreoelectronico("");
      setContraseña("");
      setErrores({ correoelectronico: "", contraseña: "" }); // Limpia los mensajes de error
    }
  }
  const handleNavigateToRegistro = () => {
    // Te lleva directamente a la página de registro
    navigate('/registro'); // Usaremos la ruta '/registro'
  };
   
  //variable que evalua si hay errores o campos vacios para deshabilitar el boton
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
        <div className="mb-3">
          <label htmlFor="correo" className="form-label text-white">Correo Electrónico</label>
          <input 
            type="email"
            id="correo"
            className="form-control"
            value={correoelectronico}
            onChange={(e) => { setCorreoelectronico(e.target.value); validarFormulario(); }}  // evento que captura la informacion
            required
          />
          {errores.correoelectronico && <div className="text-danger">{errores.correoelectronico}</div>}
        </div>
  
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label text-white">Contraseña</label>
          <input 
            type="password"
            id="contraseña"
            className="form-control"
            value={contraseña}
            onChange={(e) => { setContraseña(e.target.value); validarFormulario(); }} // evento que captura la informacion
            required
          />
          {errores.contraseña && <div className="text-danger">{errores.contraseña}</div>}
        </div>
  
        <button type="submit" className="btn btn-light w-100 " disabled={botonDeshabilitado}>
          Ingresar 
        </button>

        <div className="separator">O</div>

        {/* Aquí usamos la nueva función que nos lleva al registro */}
        <button type="button" className="btn btn-light w-100" onClick={handleNavigateToRegistro}>
          Registrate
        </button>
        
      </form>  
      
    </div>
  
  );

};

export default inicioSesion;