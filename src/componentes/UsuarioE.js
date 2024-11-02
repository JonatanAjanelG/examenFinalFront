import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/eliminar.css'; // Importa el archivo CSS
import Modal from './Modal'; // Importa el componente modal

const EliminarUsuario = () => {
  const [id, setId] = useState(''); // Estado para almacenar el ID del proyecto
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes de éxito o error
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para manejar el cambio en el input de ID
  const handleChange = (e) => {
    setId(e.target.value);
  };

  // Función para manejar el envío del formulario y eliminar el proyecto
  const handleEliminar = async (e) => {
    e.preventDefault();

    if (!id) {
      setMensaje('Por favor, ingrese un ID válido.');
      setShowModal(true); // Mostrar modal con el mensaje
      return;
    }

    const apiUrl = `https://examenfinalback.onrender.com/api/proyectos/${id}`; // URL de la API para eliminar el proyecto por ID

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMensaje(`Proyecto con ID ${id} eliminado correctamente.`);
        setShowModal(true); // Mostrar modal con el mensaje de éxito
        setId(''); // Limpiar el campo ID
      } else {
        setMensaje('Error al eliminar el proyecto. Verifique que el ID sea correcto.');
        setShowModal(true); // Mostrar modal con el mensaje de error
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al eliminar el proyecto.');
      setShowModal(true); // Mostrar modal con el mensaje de error
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  // Función para regresar a la página anterior
  const handleRegresar = () => {
    navigate('/'); // Redirige a la página de inicio o a la ruta que desees
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Eliminar Proyecto</h2>
      
      <form onSubmit={handleEliminar}>
        <div>
          <label htmlFor="id">ID del Proyecto:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={handleChange}
            required
            placeholder="Ingrese el ID del proyecto"
          />
        </div>

        <div className="button-container">
          <button type="submit" className="eliminar">Eliminar</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>
      </form>

      {/* Modal para mostrar el mensaje */}
      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default EliminarUsuario;
