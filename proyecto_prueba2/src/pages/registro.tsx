import React, { useState } from "react";
import '../css/registro.css';
import logo from '../img/logo.png';
import { useNavigate } from "react-router-dom";//permite la navegación entre páginas


// Declara un componente funcional llamado Nosotros, significa React Functional Component, y le dice a TypeScript que Nosotros es un componente de React.
const registro: React.FC = () => {
  // Crea un estado para cada campo del formulario para guardar lo que el usuario escribe.
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correoelectronico, setCorreoelectronico] = useState('');
  const [contraseña, setContraseña] = useState('');

  // Hook que nos permite navegar entre las páginas (rutas) de la aplicación.
  const navigate = useNavigate();

  // Crea un estado para guardar los mensajes de error de cada campo del formulario.
  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correoelectronico: "",
    contraseña: "",
  });

  // Función que se encarga de validar todos los campos del formulario.
  const validarFormulario = () => {
    // cremamos la varibles donde estaran los errores 
    const nuevosErrores = { nombre: "", telefono: "", correoelectronico: "", contraseña: "" };
    
    // Validar nombre: no debe estar vacío.
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    // Validar teléfono: no debe estar vacío y debe contener solo números.
    const telefonoRegex = /^[0-9]+$/;
    if (!telefono.trim()) {
      nuevosErrores.telefono = "El número de teléfono es obligatorio.";
    } else if (!telefonoRegex.test(telefono)) {
      nuevosErrores.telefono = "El teléfono solo debe contener números.";
    }

    // 3. Validar correo electrónico: usa una expresión regular para verificar el formato.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoelectronico.trim()) {
      nuevosErrores.correoelectronico = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(correoelectronico)) {
      nuevosErrores.correoelectronico = "Formato de email no válido.";
    }
    
    // Validar contraseña no debe estar vacía.
    if (!contraseña.trim()) {
      nuevosErrores.contraseña = "La contraseña es obligatoria.";
    }

    // Actualiza el estado de 'errores' con los nuevos errores encontrados.
    setErrores(nuevosErrores);
    
    // Devuelve el objeto de errores para que la función que la llamó sepa si hubo fallos.
    return nuevosErrores;
  }

  // Función que se ejecuta cuando el usuario envía el formulario .
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // con eston hacemos que no se recargue la página al enviar el formulario.
    // Llama a la función de validación y guarda el resultado.
    const resultadoErrores = validarFormulario();
    
    // Revisa que todos los campos estén correctos si no peta 
    if (!resultadoErrores.nombre && !resultadoErrores.telefono && !resultadoErrores.correoelectronico && !resultadoErrores.contraseña) {
      alert(`¡Gracias por registrarte, ${nombre}! Serás redirigido para iniciar sesión.`);
      
      // al completar redirecionara al inicio de secion 
      navigate('/inicioSesion'); 
    }
  }

  // Función para el segundo botón, que lleva al usuario a la página de inicio de sesión.
  const handleNavigateToLogin = () => {
    navigate('/inicioSesion'); // este sera a donde nos llevara  cuando ya tengamos cuenta 
  };
    
  // Variable booleana que se pone en 'true' si hay algún error o si algún campo está vacío.
  // Se usa para deshabilitar el botón de envío.
  const botonDeshabilitado =
    !!errores.nombre ||
    !!errores.telefono ||
    !!errores.correoelectronico ||
    !!errores.contraseña ||
    !nombre.trim() ||
    !telefono.trim() ||
    !correoelectronico.trim() ||
    !contraseña.trim();


  return (
    <div className="contenedor-form-registro">
      <img 
        src={logo} 
        alt="Logo de PixelHub" 
        className="navbar-logo" 
      />
      
      {/* El atributo 'onSubmit' del formulario se vincula a nuestra función 'handleSubmit'. */}
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        
        {/* Campo para el Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label text-white">Nombre Completo</label>
          <input 
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            // Cada vez que el usuario escribe, actualizamos el estado y volvemos a validar.
            onChange={(e) => { setNombre(e.target.value); validarFormulario(); }}
          />
          {/* Si hay un error para este campo, se muestra aquí. */}
          {errores.nombre && <div className="text-danger">{errores.nombre}</div>}
        </div>

        {/* Campo para el Teléfono */}
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label text-white">Número de Teléfono</label>
          <input 
            type="tel" // 'tel' es un tipo de input específico para teléfonos.
            id="telefono"
            className="form-control"
            value={telefono}
            onChange={(e) => { setTelefono(e.target.value); validarFormulario(); }}
          />
          {errores.telefono && <div className="text-danger">{errores.telefono}</div>}
        </div>

        {/* Campo para el Correo Electrónico */}
        <div className="mb-3">
          <label htmlFor="correo" className="form-label text-white">Correo Electrónico</label>
          <input 
            type="email"
            id="correo"
            className="form-control"
            value={correoelectronico}
            onChange={(e) => { setCorreoelectronico(e.target.value); validarFormulario(); }}
          />
          {errores.correoelectronico && <div className="text-danger">{errores.correoelectronico}</div>}
        </div>
        
        {/* Campo para la Contraseña */}
        <div className="mb-3">
          <label htmlFor="contraseña" className="form-label text-white">Contraseña</label>
          <input 
            type="password"
            id="contraseña"
            className="form-control"
            value={contraseña}
            onChange={(e) => { setContraseña(e.target.value); validarFormulario(); }}
          />
          {errores.contraseña && <div className="text-danger">{errores.contraseña}</div>}
        </div>
        
        {/* Botón principal para registrarse. Se deshabilita si 'botonDeshabilitado' es true. */}
        <button type="submit" className="btn btn-light w-100" disabled={botonDeshabilitado}>
          Registrarse 
        </button>
        
        <div className="separator">O</div>

        {/* Botón secundario para ir a iniciar sesión. Usa 'onClick' para llamar a la función de navegación. */}
        <button type="button" className="btn btn-light w-100" onClick={handleNavigateToLogin}>
          Si ya tienes cuenta, inicia sesión
        </button>
        
      </form>   
    </div>

  );
};

export default registro;