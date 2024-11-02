import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/buscar.css'; // Importa el archivo CSS
import Modal from './Modal'; // Importa el componente Modal

const BuscarUsuario = () => {
  const [id, setId] = useState(''); // Estado para almacenar el ID del proyecto
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del proyecto específico
  const [proyectos, setProyectos] = useState([]); // Estado para almacenar los proyectos
  const [mensaje, setMensaje] = useState(''); // Estado para mostrar mensajes de éxito o error
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para manejar el cambio en el input de ID
  const handleChange = (e) => {
    setId(e.target.value);
  };

  // Función para obtener los datos del proyecto específico
  const handleBuscarUsuario = async (e) => {
    e.preventDefault();

    if (!id) {
      setMensaje('Por favor, ingrese un ID válido.');
      setShowModal(true); // Mostrar el modal con el mensaje
      return;
    }

    const apiUrl = `https://examenfinalback.onrender.com/api/proyectos/${id}`; // URL de la API para obtener el proyecto por ID

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setUsuario(data.proyecto); // Accedemos a la propiedad "proyecto" dentro de la respuesta
        setMensaje('');
        setShowModal(false); // Cerrar el modal si se encuentra el proyecto
      } else {
        setMensaje('Proyecto no encontrado. Verifique el ID.');
        setUsuario(null); // Limpiar los datos si no se encuentra el proyecto
        setShowModal(true); // Mostrar el modal con el mensaje
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al buscar el proyecto.');
      setUsuario(null); // Limpiar los datos en caso de error
      setShowModal(true); // Mostrar el modal con el mensaje de error
    }
  };

  // Función para obtener todos los proyectos
  const handleVerProyectos = async () => {
    const apiUrl = 'https://examenfinalback.onrender.com/api/proyectos';

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setProyectos(data.proyectos); // Almacenar la lista de proyectos
        setMensaje('');
        setShowModal(false); // Cerrar el modal si se encuentran proyectos
      } else {
        setMensaje('No se encontraron proyectos.');
        setProyectos([]); // Limpiar los datos si no se encuentran proyectos
        setShowModal(true); // Mostrar el modal con el mensaje
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Ocurrió un error al buscar los proyectos.');
      setProyectos([]); // Limpiar los datos en caso de error
      setShowModal(true); // Mostrar el modal con el mensaje de error
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
      <h2 className="form-title">Buscar Proyecto</h2>
      
      <form onSubmit={handleBuscarUsuario}>
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
          <button type="submit" className="buscar">Buscar Proyecto</button>
          <button type="button" onClick={handleVerProyectos} className="ver-proyecto">Ver Todos los Proyectos</button>
          <button type="button" onClick={handleRegresar} className="regresar">Regresar</button>
        </div>
      </form>

      {/* Mostrar la tabla de datos si el proyecto específico es encontrado */}
      {usuario && (
        <div>
          <h3>Datos del Proyecto</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Completada</th>
                <th>Fecha Creación</th>
                <th>Prioridad</th>
                <th>Asignado a</th>
                <th>Categorías</th>
                <th>Costo Proyecto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{usuario.id}</td>
                <td>{usuario.titulo}</td>
                <td>{usuario.descricpcion}</td>
                <td>{usuario.completada ? 'Sí' : 'No'}</td>
                <td>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
                <td>{usuario.prioridad}</td>
                <td>{usuario.asignado_a}</td>
                <td>{usuario.categorias}</td>
                <td>{usuario.costo_proyecto}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Mostrar la tabla de todos los proyectos si existen proyectos */}
      {proyectos.length > 0 && (
        <div>
          <h3>Lista de Proyectos</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descripción</th>
                <th>Completada</th>
                <th>Fecha Creación</th>
                <th>Prioridad</th>
                <th>Asignado a</th>
                <th>Categorías</th>
                <th>Costo Proyecto</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>{proyecto.id}</td>
                  <td>{proyecto.titulo}</td>
                  <td>{proyecto.descricpcion}</td>
                  <td>{proyecto.completada ? 'Sí' : 'No'}</td>
                  <td>{new Date(proyecto.fecha_creacion).toLocaleDateString()}</td>
                  <td>{proyecto.prioridad}</td>
                  <td>{proyecto.asignado_a}</td>
                  <td>{proyecto.categorias}</td>
                  <td>{proyecto.costo_proyecto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para mostrar el mensaje */}
      {showModal && <Modal mensaje={mensaje} closeModal={closeModal} />}
    </div>
  );
};

export default BuscarUsuario;
