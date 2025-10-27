import React, { useState } from "react";
import '../css/principal.css'; // Tu archivo de estilos
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa Bootstrap JS para modales

const hilosData = [
 { // <- Espacio corregido
   id: 1,
   title: 'Best FPS games of 2024',
   author: 'John Doe',
   imageUrl: 'https://media.revistagq.com/photos/63e9f744df9a2fddd35517c5/16:9/w_2560%2Cc_limit/resident-evil-4-remake.jpeg',
   likes: 42,
   comments: 12,
   category: 'Shooter' // Añadido
 },
 { // <- Espacio corregido
   id: 2,
   title: 'Indie gems you should try',
   author: 'Sarah',
   imageUrl: 'https://media.revistagq.com/photos/63e9f744df9a2fddd35517c5/16:9/w_2560%2Cc_limit/resident-evil-4-remake.jpeg',
   likes: 35,
   comments: 9,
   category: 'Indie' // Añadido
 },
 { // <- Espacio corregido
   id: 3,
   title: 'Latest gaming news',
   author: 'Mike',
   imageUrl: 'https://media.revistagq.com/photos/63e9f744df9a2fddd35517c5/16:9/w_2560%2Cc_limit/resident-evil-4-remake.jpeg',
   likes: 28,
   comments: 5,
   category: 'Noticias' // Añadido
 }
];

// Array con las categorías para el menú de navegación
const categories = ['Shooter', 'RPG', 'Indie', 'Noticias', 'Retro'];

// Tu componente principal
const Principal: React.FC = () => {
 // --- ESTADOS ---
 const [hilos, setHilos] = useState(hilosData);

 // Estado para saber qué categoría está activa
 const [activeCategory, setActiveCategory] = useState('Shooter');

 // Estados para controlar los campos del formulario en el modal
 const [categoria, setCategoria] = useState('');
 const [mensaje, setMensaje] = useState('');
 const [urlImagen, setUrlImagen] = useState('');

 // --- MANEJADORES de EVENTOS ---

 // Función para manejar el clic en las pestañas de categorías
 const handleCategoryClick = (category: string) => {
   setActiveCategory(category);
   // La lógica de filtrado ahora ocurre en el renderizado
 };

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

   // 2. Crear el nuevo objeto de hilo
   const newHilo = {
     id: Date.now(), // ID único basado en el tiempo
     title: mensaje, // Usamos el 'mensaje' como 'title'
     author: 'Usuario', // Autor por defecto
     // Usamos la imagen del usuario o una genérica si está vacía
     imageUrl: urlImagen || 'https://placehold.co/600x400/333/fff?text=Nuevo+Hilo',
     likes: 0,
     comments: 0,
     category: categoria // La categoría del formulario
   };

   // 3. Actualizar el estado de 'hilos'
   // Añadimos el nuevo hilo al principio de la lista
   setHilos([newHilo, ...hilos]);

   // 4. (Opcional) Cambiamos a la categoría del nuevo hilo para verlo
   setActiveCategory(categoria);

   // 5. Limpiar el formulario
   setCategoria('');
   setMensaje('');
   setUrlImagen('');

   // 6. Cerrar el modal manualmente
   // Asumimos que Bootstrap 5 está cargado globalmente (en tu index.html)
   // @ts-ignore
   const modalElement = document.getElementById('addHiloModal');
   if (modalElement && typeof bootstrap !== 'undefined') {
     // @ts-ignore
     const modalInstance = bootstrap.Modal.getInstance(modalElement);
     if (modalInstance) {
       modalInstance.hide();
     }
   }
 };

 // --- RENDERIZADO (JSX) ---
 const filteredHilos = hilos.filter(hilo => hilo.category === activeCategory);

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
                 className={`nav-link ${activeCategory === cat ? 'active' : ''}`} 
                 href="#"
                 onClick={(e) => {
                   e.preventDefault(); 
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
           {/* --- CAMBIO --- */}
           {/* Iteramos sobre 'filteredHilos' (el estado filtrado) en lugar de 'hilosData' */}
           {filteredHilos.map((hilo) => (
             <div className="card custom-card mb-3" key={hilo.id}>
               <div className="card-body">
                 <h5 className="card-title">{hilo.title}</h5>
                 <p className="card-text">{hilo.author}</p>
                 <img 
                   className="img-top" 
                   src={hilo.imageUrl} 
                   style={{ width: '18rem' }} 
                   alt={`Imagen de ${hilo.title}`} 
                   // Añadimos un fallback por si la imagen falla
                   onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/333/fff?text=Imagen+No+Encontrada')}
                 />
                 <div className="d-flex justify-content-between text-secondary">
                   <span>👍 {hilo.likes}</span>
                   <span>💬 {hilo.comments}</span>
                   <span>🔖</span>
                 </div>
               </div>
             </div>
           ))}
           
           {/* Mensaje si no hay hilos en la categoría seleccionada */}
           {filteredHilos.length === 0 && (
             <div className="text-white text-center p-5">
               <h4>No hay hilos en esta categoría.</h4>
               <p>¡Sé el primero en publicar!</p>
             </div>
           )}
         </div>
       </main>
     </div>

     {/* --- Modal Añadir nuevo hilo --- */}
     {/* (El JSX del modal no necesita cambios, 
         ya que los 'value' y 'onChange' ya estaban 
         conectados a los estados de React) */}
     <div 
       className="modal fade" 
       id="addHiloModal" 
       tabIndex={-1}
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
             <form>
               <div className="mb-3">
                 <label htmlFor="categoria" className="form-label">Categoría</label>
                 <select 
                   className="form-select" 
                   id="categoria" 
                   required
                   value={categoria} // Enlazado al estado
                   onChange={(e) => setCategoria(e.target.value)} // Actualiza el estado
                 >
                   <option value="" disabled>Selecciona una categoría</option>
                   {/* Hacemos esto dinámico por si acaso */}
                   {categories.map(cat => (
                     <option key={cat} value={cat}>{cat}</option>
                   ))}
                 </select>
               </div>
               <div className="mb-3">
                 <label htmlFor="mensaje" className="form-label">Mensaje (será el título)</label>
                 <textarea 
                   className="form-control" 
                   id="mensaje" 
                   rows={3} 
                   placeholder="Escribe tu mensaje..." 
                   required
                   value={mensaje} // Enlazado al estado
                   onChange={(e) => setMensaje(e.target.value)} // Actualiza el estado
                 ></textarea>
               </div>
               <div className="mb-3">
                 <label htmlFor="urlImagen" className="form-label">URL de la imagen (Opcional)</label>
                 <input 
                   type="url" 
                   className="form-control" 
                   id="urlImagen" 
                   placeholder="https://ejemplo.com/imagen.jpg"
                   value={urlImagen} // Enlazado al estado
                   onChange={(e) => setUrlImagen(e.target.value)} // Actualiza el estado
                 />
               </div>
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