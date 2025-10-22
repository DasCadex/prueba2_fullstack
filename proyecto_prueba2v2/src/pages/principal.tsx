
import React, { useState } from "react";
// Importamos el hook useNavigate para poder redirigir al usuario
import { useNavigate } from "react-router-dom";
import '../css/principal.css'; // Tu archivo de estilos

const hilosData = [
  {
    id: 1,
    title: 'Best FPS games of 2024',
    author: 'John Doe',
    imageUrl: 'https://media.revistagq.com/photos/63e9f744df9a2fddd35517c5/16:9/w_2560%2Cc_limit/resident-evil-4-remake.jpeg',
    likes: 42,
    comments: 12
  },
  {
    id: 2,
    title: 'Indie gems you should try',
    author: 'Sarah',
    imageUrl: 'https://media.revistagq.com/photos/63e9f744df9a2fddd35517c5/16:9/w_2560%2Cc_limit/resident-evil-4-remake.jpeg',
    likes: 35,
    comments: 9
  },
  {
    id: 3,
    title: 'Latest gaming news',
    author: 'Mike',
    imageUrl: 'https://media.revistagq.com/photos/63e9f744df9a2fddd35517c5/16:9/w_2560%2Cc_limit/resident-evil-4-remake.jpeg',
    likes: 28,
    comments: 5
  }
];

// Array con las categorías para el menú de navegación
const categories = ['Shooter', 'RPG', 'Indie', 'Noticias', 'Retro'];

// Tu componente principal
const Principal: React.FC = () => {
  // --- ESTADOS ---

  // Hook para la navegación programática (reemplaza a window.location.href)
  const navigate = useNavigate();

  // Estado para saber qué categoría está activa
  const [activeCategory, setActiveCategory] = useState('Shooter');

  // Estados para controlar los campos del formulario en el modal
  //recordar  que el modal es una pestaña emergente para añadir hilos
  const [categoria, setCategoria] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [urlImagen, setUrlImagen] = useState('');

  // --- MANEJADORES DE EVENTOS ---

  // Función para manejar el clic en las pestañas de categorías
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    // Aquí podrías agregar la lógica para filtrar los hilos por categoría
  };

  // Función que reemplaza a 'enviar()' del JS original
  // Se ejecuta al pulsar "Publicar hilo" en el modal
  const handleSubmitHilo = () => {
    // 1. Validación
    if (!categoria) {
      alert("Debes seleccionar una categoría");
      return;
    }
    if (!mensaje.trim()) {
      alert("Debes escribir un mensaje");
      return;
    }

    // 2. Redirección con los datos
    // Asumimos que tienes una ruta en App.js como:
    // <Route path="/confirmacion-publicacion" element={<Confimacionpublicacion />} />
    // (Ya no usamos .html)
    const url = `/confirmacion-publicacion?categoria=${encodeURIComponent(categoria)}&mensaje=${encodeURIComponent(mensaje)}&urlImagen=${encodeURIComponent(urlImagen)}`;
    
    navigate(url);

    // Opcional: Limpiar el formulario después de enviar
    setCategoria('');
    setMensaje('');
    setUrlImagen('');


  };

  // --- RENDERIZADO (JSX) ---
  // Usamos un Fragment (<>) para poder devolver el main-wrapper Y el modal
  // como elementos hermanos.
  return (
    <>
      {/* Contenedor principal */}
      <div className="main-wrapper">
        <main className="container mt-4">
          <h2 className="text-white mb-4">PixelHub</h2>
          
          {/* Pestañas de categorías (renderizadas dinámicamente) */}
          <ul className="nav nav-pills mb-4">
            {categories.map((cat) => (
              <li className="nav-item" key={cat}>
                <a 
                  // La clase 'active' se aplica condicionalmente
                  className={`nav-link ${activeCategory === cat ? 'active' : ''}`} 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault(); // Evita que la página recargue
                    handleCategoryClick(cat);
                  }}
                >
                  {cat}
                </a>
              </li>
            ))}
            {/* Botón para añadir hilo (abre el modal) */}
            <li className="nav-item">
              <button 
                type="button" 
                className="btn-custom" 
                data-bs-toggle="modal" 
                data-bs-target="#addHiloModal"
              >
                + Añadir hilo
              </button>
            </li>
          </ul>

          {/* Wrapper de los hilos (tarjetas renderizadas dinámicamente) */}
          <div className="hilos-wrapper">
            {hilosData.map((hilo) => (
              // Usamos el 'id' del hilo como 'key' para que React identifique cada elemento
              <div className="card custom-card mb-3" key={hilo.id}>
                <div className="card-body">
                  <h5 className="card-title">{hilo.title}</h5>
                  <p className="card-text">{hilo.author}</p>
                  {/* Los estilos en línea se pasan como un objeto JS */}
                  {/* 'alt' es importante para accesibilidad */}
                  <img 
                    className="img-top" 
                    src={hilo.imageUrl} 
                    style={{ width: '18rem' }} 
                    alt={`Imagen de ${hilo.title}`} 
                  />
                  <div className="d-flex justify-content-between text-secondary">
                    <span>👍 {hilo.likes}</span>
                    <span>💬 {hilo.comments}</span>
                    <span>🔖</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- Modal Añadir nuevo hilo --- */}
      {/* El 'id' debe coincidir con el 'data-bs-target' del botón */}
      <div 
        className="modal fade" 
        id="addHiloModal" 
        tabIndex={-1} // 'tabindex' se escribe 'tabIndex' en JSX
        aria-labelledby="addHiloModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content custom-modal">
            <div className="modal-header custom-modal-header">
              <h5 className="modal-title" id="addHiloModalLabel">Añadir nuevo hilo</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">
              {/* No usamos <form onSubmit> porque el botón es type="button" */}
              <form>
                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">Categoría</label>
                  <select 
                    className="form-select" 
                    id="categoria" 
                    required
                    value={categoria} // Enlazamos el valor al estado
                    onChange={(e) => setCategoria(e.target.value)} // Actualizamos el estado al cambiar
                  >
                    <option value="" disabled>Selecciona una categoría</option>
                    <option value="Shooter">Shooter</option>
                    <option value="RPG">RPG</option>
                    <option value="Indie">Indie</option>
                    <option value="Noticias">Noticias</option>
                    <option value="Retro">Retro</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea 
                    className="form-control" 
                    id="mensaje" 
                    rows={3} // 'rows' se convierte en prop
                    placeholder="Escribe tu mensaje..." 
                    required
                    value={mensaje} // Enlazamos el valor al estado
                    onChange={(e) => setMensaje(e.target.value)} // Actualizamos el estado
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="urlImagen" className="form-label">URL de la imagen</label>
                  <input 
                    type="url" 
                    className="form-control" 
                    id="urlImagen" 
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={urlImagen} // Enlazamos el valor al estado
                    onChange={(e) => setUrlImagen(e.target.value)} // Actualizamos el estado
                  />
                </div>
                {/* Reemplazamos 'onclick' por 'onClick' y llamamos a nuestra función de React */}
                <button 
                  type="button" 
                  onClick={handleSubmitHilo} 
                  className="btn btn-primary"
                >
                  Publicar hilo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Principal;

